import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { User } from '../../../utils/types'
import styles from '../../../styles'
import Header from '../../../components/Header'
import { Avatar, Chip } from 'react-native-paper'
import TabSwitch from '../../../components/TabSwitch'

export default function ProfileScreen(
  {navigation, user, editable=false}: 
  {navigation?: any, user: User | null, editable?: boolean}
  ) {

  const [currentTab, setCurrentTab] = useState<'About' | 'History'>('About')

  const toSettings = () => {
    navigation.navigate('Settings')
  }

  const getInitials = (user: User) => {
    return user.firstName[0] + user.lastName[0]
  }
  
  return (
    <View style={{width: '100%', flex: 1}}>
      {
        user ?
        <View style= {{width: '100%', flex: 1}}>
          {
            editable ?
            <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
              <Header
                title='My Profile'
                rightComponentType='touchable-icon' rightText='cog-outline' onRightPress={toSettings}
                textColor='white'
                backgroundColor='#195064'/> 
            </View> :
            <View style={{width: '100%', paddingTop: 24}}>
              <Header
                title='Profile'
                textColor='white'
                backgroundColor='#195064'/>
            </View>
          }
          
          <ScrollView style={{flex: 1, width: '100%'}}>
            <View style={{width: '100%', height: 200}}>
              <View style = {{flex: 3, backgroundColor: '#195064'}}/>
              <View style = {{flex: 1, backgroundColor: 'transparent'}}/>
              <View style = {{position: 'absolute', top: 0, justifyContent: 'center', height: '100%', width: '100%'}}>
                
                <View style={{alignSelf: 'center', justifyContent: 'center', height: 150, aspectRatio: 1, borderRadius: 75, backgroundColor: 'white'}}>
                  {/* ONCE PROFILE PIC IS IMPLEMENTED: */}
                  {/* {
                    user.profilePicture?
                    <Avatar.Image size={100} source={{uri: user.profilePicture}} style={{alignSelf: 'center'}}/>:
                    <Avatar.Text size={100} label={getInitials(user)} color='white' style={{backgroundColor: '#195064', alignSelf: 'center'}}/>
                  } */}
                  <Avatar.Text size={144} label={getInitials(user)} color='white' style={{backgroundColor: '#195064', alignSelf: 'center'}}/>
                </View>
              </View>
            </View> 

            <View style={{flex: 1, width: '100%', paddingHorizontal: 16}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 4}}>{user.prefix} {user.firstName} {user.lastName}</Text>
              <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 4, paddingBottom: 16}}>{user.institution}</Text>

              <TabSwitch 
              textLeft='About' textRight='History' 
              onPressLeft={()=>setCurrentTab('About')} onPressRight={()=>setCurrentTab('History')}
              />
              {
                currentTab === 'About' ?
                <View>
                  <Text style={{fontSize: 16, paddingVertical: 8}}>
                    <Text style={{fontWeight: 'bold'}}>Medical Condition(s): </Text>
                    {user?.medConditions.map(
                      (item: string, index: number) => 
                        <Chip key={index} style={{marginHorizontal: 4, borderRadius: 10}}>{item}</Chip>
                    )}
                  </Text>
                </View> :
                <View>
                  <Text style={{fontSize: 16, paddingVertical: 8}}>
                    <Text style={{fontWeight: 'bold'}}>Studies Participated In: </Text>
                    {/* add studies here */}
                  </Text>
                </View>
              }

              
            </View>

          </ScrollView>
        </View> :
        <Text>User does not exist.</Text>
      }
    </View>
  )
}