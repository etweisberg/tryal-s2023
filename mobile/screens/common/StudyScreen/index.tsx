import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Trial } from '../../../utils/types'
import Header from '../../../components/Header'
import { Chip, Searchbar } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import styles from '../../../styles'
import { testTrials } from '../../../utils/testObjs'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'


export default function StudyScreen({trial}: {trial: Trial | null}) {
  const navigation = useNavigation();
  const toPrev = () => {
    navigation.goBack();
  }

  return (
    <View style={[styles.container, {paddingBottom: 0}]}>
        <Header 
        title='' 
        leftComponentType='touchable-text' leftText='Back' onLeftPress={toPrev}
        />
        
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <View style={{height: 300, width: '100%', backgroundColor: 'gray', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text>pic here?</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>{trial?.name}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 16}}>{trial?.researchers}</Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Description: </Text>
            {trial?.description}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Requirements: </Text>
            {trial?.eligibleConditions.map(
              (item: string, index: number) => 
                <Chip key={index} style={{marginHorizontal: 4, borderRadius: 10}}>{item}</Chip>
            )}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Compensation: </Text>
            {/* add compensation here */}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Location: </Text>
            {trial?.location}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Duration: </Text>
            {/* add duration here */}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Research Field(s): </Text>
            {/* add tags here */}
          </Text>

          {/* to fill the space of the buttons below */}
          <View style={[styles.button, {backgroundColor: 'transparent'}]}/>

        </ScrollView>

        <View style={{paddingHorizontal: 24, backgroundColor: 'transparent', position: 'absolute', bottom: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <TouchableOpacity style={[styles.button, {width: '65%'}]}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Sign Up!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Icon name='chatbubble-outline' color='#fff' size={20}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Icon name='bookmark-outline' color='#fff' size={20}/>
          </TouchableOpacity>
        </View>
        
      </View>
  )
}