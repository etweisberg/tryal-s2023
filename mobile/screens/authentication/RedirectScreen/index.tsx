import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../../styles'

export default function RedirectScreen({ navigation }: { navigation: any}) {

  const toAuth = () => {  
    navigation.navigate('Auth')
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
