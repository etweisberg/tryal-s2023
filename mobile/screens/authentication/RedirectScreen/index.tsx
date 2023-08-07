import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../../styles'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../stores/userReducer';
import { userLogoutCall } from '../../../utils/apiCalls';

export default function RedirectScreen({ navigation }: { navigation: any}) {
  const dispatch = useDispatch();

  const signOut = async () => {
    dispatch(logoutUser());
    const response = await userLogoutCall();
    if (response !== null) {
      navigation.navigate('Auth');
    } else {
      alert('Something went wrong. Please try again.')
      console.log(response);
      return;
    }
  }

  const toAuth = async () => {  
    dispatch(logoutUser());
    signOut();
    navigation.navigate('Auth');
  }

  return (
    <View style={styles.container}>
      <Text>You must be logged in to view this page.</Text>
      <TouchableOpacity onPress={toAuth} style={styles.textButton}>
        <Text style={{ color: '#195064' }}>Log In/Sign Up</Text>
      </TouchableOpacity>
    </View> 
  );
}
