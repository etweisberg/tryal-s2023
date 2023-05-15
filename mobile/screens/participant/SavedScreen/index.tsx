import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Header';
import { DataItem, DataItemObj, TrialListObj } from '../../../components/types';
import { createStackNavigator } from '@react-navigation/stack';
import StudyList from '../../../components/StudyList';
import GroupCard from '../../../components/GroupCard';
import styles from '../../../styles';
import { testTrials } from '../../../utils/testObjs';
import AppNavigator from '../../../components/AppNavigator';
import { Trial, User } from '../../../utils/types';

const Stack = createStackNavigator();
const screenName = 'Saved'

const TEST_DATA: TrialListObj[] = [
  { name: 'Group 1', studies: testTrials },
  { name: 'Group 2', studies: testTrials },
  { name: 'Group 3', studies: testTrials },
  { name: 'Group 4', studies: testTrials },
  { name: 'Group 5', studies: testTrials },
]

export default function SavedScreen({ navigation }: { navigation: any}) {
  const [data, setData] = useState(TEST_DATA);
  const [dataIndex, setDataIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);
  
  const toMain = () => {
    navigation.navigate('Primary');
  }

  const toGroup = () => {
    navigation.navigate('Group');
  }

  const handleGroupCardPress = (index: number) => {
    setDataIndex(index);
    toGroup();
  }

  const handleNewGroup = async () => {

  }

  const onUserPress : ({user}: {user: User}) => void = ({user}: {user: User}) => {
    setUser(user);
    navigation.navigate('ProfileInfoScreen' + screenName);
  }

  function PrimaryPage() {
    return (
      <View style={styles.participantContainer}>
        <Header title='Saved'/>

        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <View style={styles.cardsContainer}>
            {
                data.map((item: TrialListObj, index: number)=> 
                <GroupCard 
                  key={index} 
                  name={item.name} 
                  icon={null}
                  onPress={() => handleGroupCardPress(index)}
                />)
            }
            <GroupCard 
              name='New' 
              icon='add-outline'
              onPress={handleNewGroup}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  function GroupPage(data: TrialListObj) {
    const onStudyCardPress = ({trial}: {trial: Trial}) => {
      setStudy(trial);
      navigation.navigate('StudyInfoScreen' + screenName);
    }

    return (
      <View style={styles.participantContainer}>
        <Header 
            title={data.name}
            leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={toMain}
          />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>

          
          <StudyList data={data.studies} onCardPress={onStudyCardPress}/>
        </ScrollView>
      </View>
    )
  }

  function MainStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Primary" component={PrimaryPage} />
        <Stack.Screen name="Group" >
          {() => GroupPage(data[dataIndex])}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  return (
    <AppNavigator 
      name={screenName} 
      components={[MainStack]} 
      profileFocusable 
      studyFocusable 
      user={user} 
      trial={study}
      onUserPress={onUserPress}
      />
  )
}