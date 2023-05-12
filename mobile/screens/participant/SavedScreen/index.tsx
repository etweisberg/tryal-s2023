import { View, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Header';
import { DataItem, DataItemObj } from '../../../components/types';
import { createStackNavigator } from '@react-navigation/stack';
import StudyList from '../../../components/StudyList';
import GroupCard from '../../../components/GroupCard';

const Stack = createStackNavigator();

const DATA2: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card' },
];

const TEST_DATA: DataItemObj[] = [
  { name: 'Group 1', studies: DATA2 },
  { name: 'Group 2', studies: DATA2 },
  { name: 'Group 3', studies: DATA2 },
  { name: 'Group 4', studies: DATA2 },
  { name: 'Group 5', studies: DATA2 },
]

export default function SavedScreen({ navigation }: { navigation: any}) {
  const [data, setData] = useState(TEST_DATA);
  const [dataIndex, setDataIndex] = useState(0);

  const toMain = () => {
    navigation.navigate('Main');
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

  function MainPage() {
    return (
      <View style={styles.participantContainer}>
        <Header title='Saved'/>

        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <View style={styles.cardsContainer}>
            {
                data.map((item: DataItemObj, index: number)=> 
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

  function GroupPage(data: DataItemObj) {
    return (
      <View style={styles.participantContainer}>
        <Header 
            title={data.name}
            leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={toMain}
          />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>

          
          <StudyList data={data.studies} />
        </ScrollView>
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainPage} />
      <Stack.Screen name="Group" >
        {() => GroupPage(data[dataIndex])}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const styles = require("../../../styles")
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//     paddingHorizontal: 16
//     // backgroundColor: 'black',
//   },
//   cardsContainer: {
//     flex: 1, 
//     paddingHorizontal: 8, 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     justifyContent: 'space-between'
//   },
// });