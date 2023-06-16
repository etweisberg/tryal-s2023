import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../stores/userReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import { loginSchema } from '../../../utils/validation';
import { MyObject } from '../../../components/types';
import { authErrors } from '../../../utils/errors';
import GetFont from '../../../components/fonts/AppText';
import styles from '../../../styles'
import { User } from '../../../utils/types';

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

  const toRegister = () => {
    navigation.navigate('Register')
    setError(['']);
  }

  const toParticipantTabs = () => {
    navigation.navigate('ParticipantTabs')
    setError(['']);
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });

      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const result = await response.json();
      // console.log(result);
      if (response.status === 200) {
        if (result !== null) {
          const user : User = {
            _id: result._id,
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
            age: result.age,
            medConditions: result.medConditions,
            homeAddress: result.homeAddress,
            seekingCompensation: result.seekingCompensation,
            researcher: result.researcher,
            institution: result.institution,
            admin: result.admin,
            prefix: result.prefix,
            clickedOnTrials: result.clickedOnTrials,
            savedTrials: result.savedTrials,
          };
          dispatch(loginUser(user));
        }
      } else if (response.status === 401) {
        setError(['Invalid username or password']);
      } else if (response.status === 500) {
        setError(['Server error']);
      }
    } catch (errors: any) {
      console.error(errors);
      setError(errors.errors);
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
                <TouchableOpacity onPress={toRegister} style={styles.textButton}>
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
