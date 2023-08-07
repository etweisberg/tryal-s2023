import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Trial, User } from '../../../utils/types'
import Header from '../../../components/Header'
import { Avatar, Chip } from 'react-native-paper'
import TabSwitch from '../../../components/TabSwitch'
import { useNavigation } from '@react-navigation/native'
import { getTrialFromId } from '../../../utils/apiCalls'
import StudyList from '../../../components/StudyList'
import TextAndChips from '../../../components/TextAndChips'
import { getView } from '../../../stores/userReducer'
import { useSelector } from 'react-redux'

export default function ProfileScreen(
  {navigation=useNavigation(), user, editable=false}: 
  {navigation?: any, user: User | null, editable?: boolean}
  ) {

  const [currentTab, setCurrentTab] = useState<'About' | 'History'>('About')
  const [userStudies, setUserStudies] = useState<Trial[]>([])

  const view = useSelector(getView)

  // Function to set user studies from user object
  const setUserStudiesFromUser = async () => {
    const newUserStudies: Trial[] = [];
    // iterate through user.trials if participant, user.trialsOwned if researcher
    for (const trial_id in (view == 'participant' ? user?.trials : user?.trialsOwned)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
          newUserStudies.push(trial_obj);
      }
    }

    // Order upcoming studies by end date
    newUserStudies.sort((a, b) => {
      const aDate = new Date(a.date[1]);
      const bDate = new Date(b.date[1]);
      return aDate.getTime() - bDate.getTime();
    });

    setUserStudies(newUserStudies);
  }

  // set user studies on load
  useEffect(() => {
    setUserStudiesFromUser();
  }, [])

  const toSettings = () => {
    navigation.navigate('Settings')
  }

  const toPrev = () => {
    navigation.goBack();
  }
  
  const getInitials = (user: User) => {
    return user.firstName[0] + user.lastName[0]
  }

  const onStudyPress = () => {
    // no action as of right now
  }
  
  return (
    <View style={{width: '100%', flex: 1}}>
      {
        // if user is not null, show profile
        user ? 
        <View style= {{width: '100%', flex: 1}}>
          {
            editable ? // if editable, show cog icon on right (this means it was accessed from profile tab)
            <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
              <Header
                title='My Profile'
                rightComponentType='touchable-icon' rightText='cog-outline' onRightPress={toSettings}
                textColor='white'
                backgroundColor='#195064'/> 
            </View> : // if not editable, show back arrow on left (this means it was accessed from another page)
            <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
              <Header
                title='Researcher Profile'
                leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={toPrev}
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
                  {/* {
                    user.profilePicture?
                    <Avatar.Image size={100} source={{uri: user.profilePicture}} style={{alignSelf: 'center'}}/>:
                    <Avatar.Text size={100} label={getInitials(user)} color='white' style={{backgroundColor: '#195064', alignSelf: 'center'}}/>
                  } */}
                  <Avatar.Text size={144} label={getInitials(user)} color='white' style={{backgroundColor: '#195064', alignSelf: 'center'}}/>
                </View>
              </View>
            </View> 

            {/* Profile Details */}
            <View style={{flex: 1, width: '100%', paddingHorizontal: 16}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 4}}>
                {user.prefix} {user.firstName} {user.lastName}
              </Text>

              <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 4, paddingBottom: 16}}>{user.institution}</Text>

              <TabSwitch 
              textLeft='About' textRight={view == 'participant' ? 'History' : 'Active Studies'}
              onPressLeft={()=>setCurrentTab('About')} 
              onPressRight={()=>setCurrentTab('History')} // note that this is 'History' for both researcher and participant (its for the state var, not name of tab)
              />
              {
                // if currentTab is About, show user's medical conditions, researcher's research areas
                currentTab === 'About' ?
                  // <View/>
                  <TextAndChips 
                    name={view == 'participant' ? 'Medical Conditions: ' : 'Research Areas: '} 
                    data={view == 'participant' ? user.medConditions : user.trialsOwned}/> 

                    : // else, show studies participated in / researcher's studies
                  <View>
                    <Text style={{fontSize: 16, paddingVertical: 8}}>
                      <Text style={{fontWeight: 'bold'}}>
                        {view == 'participant' ? 'Studies Participated In: ' : 'Studies: '}
                      </Text>
                      {/* Show first 3 studies only */}
                      <StudyList data={userStudies.slice(0,3)} onCardPress={onStudyPress}/>
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