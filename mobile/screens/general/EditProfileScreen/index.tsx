import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';
import Header from '../../../components/Header';
import styles from '../../../styles';
import BarList, { BarListItem } from '../../../components/BarList';
import { useSelector } from 'react-redux';
import { getCurrentUser, loginUser } from '../../../stores/userReducer';

export default function EditProfileScreen({ navigation }: { navigation: any }) {
  // get user from redux
  const user = useSelector(getCurrentUser);

  const [email, setEmail] = React.useState<string>(user?.email || '');
  const [firstName, setFirstName] = React.useState<string>(user?.firstName || '');
  const [lastName, setLastName] = React.useState<string>(user?.lastName || '');
  const [age, setAge] = React.useState<string>(user?.age?.toString() || '');
  const [medConditions, setMedConditions] = React.useState<string>(user?.medConditions.toString() || '');
  
  const toSettings = () => {
    navigation.navigate('Settings')
  }

  // function to handle edit profile
  const handleEditProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/update-profile/' + user?._id.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          age: age,
          medConditions: medConditions,
        }),
      });
      const result = await response.json();
      if (response.status === 200) {
        // update user in redux
        const user = {
          _id: result._id,
          prefix: result.prefix,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          password: result.password,
          verified: result.verified,
          verificationToken: result.verificationToken,
          resetPasswordToken: result.resetPasswordToken,
          resetPasswordTokenExpiryDate: result.resetPasswordTokenExpiryDate,
          trials: result.trials,
          trialsOwned: result.trialsOwned,
          clickedOnTrials: result.clickedOnTrials,
          requestedTrials: result.requestedTrials,
          savedTrials: result.savedTrials,
          age: result.age,
          medConditions: result.medConditions,
          homeAddress: result.homeAddress,
          seekingCompensation: result.seekingCompensation,
          researcher: result.researcher,
          institution: result.institution,
          admin: result.admin,
        }
        dispatch(loginUser(user))      
      } else {
        console.log(response);
      }
    } catch (error: any) {
      console.log(error)
      return null;
    }
  }

  const data : BarListItem[] = [
    {title: 'Email', state: email,  setState: setEmail},
    {title: 'First Name', state: firstName,  setState: setFirstName},
    {title: 'Last Name', state: lastName,  setState: setLastName},
    {title: 'Age', state: age, setState: setAge},
    {title: 'Interests', state: medConditions, setState: setMedConditions},
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
        
        <TouchableOpacity onPress={handleEditProfile} style={styles.textButton}>
          <Text style={{ color: '#195064' }}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  </View>
    
  )
}

function dispatch(arg0: { payload: import("../../../utils/types").User | null; type: "user/loginUser"; }) {
  throw new Error('Function not implemented.');
}
