import { View, Text, ScrollView, Touchable, TouchableOpacity, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Trial, User } from '../../../utils/types'
import Header from '../../../components/Header'
import { Chip, Searchbar } from 'react-native-paper'
import styles from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { getUserFromId } from '../../../utils/apiCalls'


export default function StudyScreen(
  {trial, onUserPress=({user}: {user: User | null}) => null}:
  {trial: Trial | null, onUserPress?: ({user}: {user: User | null}) => void  }
  ) {

  const navigation = useNavigation();

  const [studyOwner, setStudyOwner] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getOwner();
    setRefreshing(false);
  }, []);

  const getOwner = async () => {
    if (trial) {
      setStudyOwner(await getUserFromId(trial.researchers[0]));
      console.log(studyOwner)
    }
  }

  useEffect(() => {
    getOwner();
  }, [trial])

  const toPrev = () => {
    navigation.goBack();
  }

  return (
    <View style={[styles.container, {paddingBottom: 0}]}>
        <Header 
        title='' 
        leftComponentType='touchable-text' leftText='Back' onLeftPress={toPrev}
        />
        
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{flex: 1, width: '100%'}}>
          <View style={{height: 300, width: '100%', backgroundColor: 'gray', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Text>pic here?</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>{trial?.name}</Text>
          <TouchableOpacity style={{width: '100%'}} onPress={() => onUserPress({user: studyOwner})}>
            <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 16}}>
              {studyOwner?.firstName + " " + studyOwner?.lastName}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Description: </Text>
            {trial?.description}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 4}}>
            <Text style={{fontWeight: 'bold'}}>Requirement(s): </Text>
            {trial?.eligibleConditions.map(
              (item: string, index: number) => 
              <View key={index}>
                <Chip style={{alignSelf: 'center', height: 30, marginHorizontal: 4, borderRadius: 15}}>{item}</Chip>
              </View>
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

        <View style={{backgroundColor: 'transparent', position: 'absolute', bottom: 0, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
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