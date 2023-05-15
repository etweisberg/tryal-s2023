import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';
import Header from '../../../components/Header';
import styles from '../../../styles';


type PushNotifsScreenProps = StackScreenProps<ProfileStackParamList, 'PushNotifs'>;

export default function PushNotifsScreen({ navigation }: PushNotifsScreenProps) {
  
  const toSettings = () => {
    navigation.navigate('Settings')
    //try: navigation.navigate({key: 'Settings'})
  }

  return (
    <View style={{width: '100%', flex: 1}}>
      <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
        <Header
          title='Settings'
          leftComponentType='touchable-text' leftText='Back' onLeftPress={navigation.goBack}
          textColor='white'
          backgroundColor='#195064'/> 
      </View>
      
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Push Notifications</Text>
        </ScrollView>
      </View>
  </View>

  )
}