import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';
import Header from '../../../components/Header';
import styles from '../../../styles';
import BarList, { BarListItem } from '../../../components/BarList';

export default function EditProfileScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [sex, setSex] = React.useState<string>('');
  const [birthday, setBirthday] = React.useState<string>('');
  const [interests, setInterests] = React.useState<string>('');
  
  const toSettings = () => {
    navigation.navigate('Settings')
  }

  const data : BarListItem[] = [
    {title: 'Email', state: email,  setState: setEmail},
    {title: 'First Name', state: firstName,  setState: setFirstName},
    {title: 'Last Name', state: lastName,  setState: setLastName},
    {title: 'Sex', state: sex, setState: setSex},
    {title: 'Birthday', state: birthday, setState: setBirthday},
    {title: 'Interests', state: interests, setState: setInterests},
  ]

  return (
    <View style={{width: '100%', flex: 1}}>
    <View style={{width: '100%', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#195064'}}>
      <Header
        title='Edit Profile'
        leftComponentType='touchable-text' leftText='Back' onLeftPress={navigation.goBack}
        textColor='white'
        backgroundColor='#195064'/> 
    </View>
    
    <View style={styles.container}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <BarList data={data} type='inputs'/>
      </ScrollView>
    </View>
  </View>
    
  )
}