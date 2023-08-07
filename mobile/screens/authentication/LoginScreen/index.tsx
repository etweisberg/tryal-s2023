import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../../../stores/userReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import { MyObject } from '../../../components/types';
import { authErrors } from '../../../utils/errors';
import GetFont from '../../../components/fonts/AppText';
import styles from '../../../styles'
import { userLoginCall, userLogoutCall } from '../../../utils/apiCalls';
import { User } from '../../../utils/types'

const pages = [
  {
    inputs: ['Email', 'Password'],
  },
]

export default function LoginScreen({ navigation }: { navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const DATA: MyObject = {
    'Email': [email, setEmail],
    'Password': [password, setPassword],
  };

  // state for error message
  const [error, setError] = useState(['']);

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

  const toRegister = () => {
    navigation.navigate('Register')
    setError(['']);
  }

  const toParticipantTabs = () => {
    navigation.navigate('ParticipantTabs', { screen: 'Explore' })
    setError(['']);
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    const user = await userLoginCall(email, password);
    // if user is type User (as tested by whether or not it has property 
    // "verificationToken"), navigate to participant tabs
    if (user !== null && user !== undefined) {
      dispatch(loginUser(user));
      navigation.navigate('ParticipantTabs', { screen: 'Explore' })
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={dismissKeyboard}>
        <Header title='Log In' rightComponentType='touchable-text' rightText='Sign Up' onRightPress={toRegister} />
        <Form
              data={pages[0].inputs.map((item: string) => {
                return ({
                  name: item, 
                  state: DATA[item][0], 
                  setState: DATA[item][1], 
                  errors: authErrors[item].filter(element => error.includes(element)),
                  red: authErrors[item].some((item) => error.includes(item))
                })
              })}
              bottomChildren={
                <TouchableOpacity onPress={signOut} style={styles.textButton}>
                  <Text style={{ color: '#195064' }}>Forgot your password?</Text>
                </TouchableOpacity>
              }
            /> 
        <View style={{width: '100%', paddingVertical: 16}}>
          <Pressable onPress={handleLogin} style={styles.button}>
            {/* <AppText>Log In</AppText> */}
            <Text style={{ color: 'white' }}>Log In</Text>
          </Pressable>

          <View style={styles.textButton}>
            <Text style={{ fontWeight: 'bold', color: '#195064'}}>OR</Text>
          </View>

          <TouchableOpacity onPress={toParticipantTabs} style={styles.textButton}>
            <Text style={{ color: '#195064' }}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

      </Pressable>
    </KeyboardAvoidingView>
  );
}
