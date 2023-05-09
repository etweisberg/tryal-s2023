import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { User, loginUser } from '../../../stores/userReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import * as yup from 'yup';

interface MyObject {
  [key: string]: Array<any>;
}

const errMsgs : MyObject = {
  'Email': ['Email required', 'Valid email required'],
  "Password": ['Password required', 'Password must be at least 8 characters'],
}

const loginSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Valid email required"),
  password: yup.string().required("Password required"),
});

export default function LoginScreen({ navigation }: { navigation: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Header 
          title='Log In' 
          rightComponentType='touchable-text' 
          rightText='Sign Up'
          onRightPress={toRegister}
        />
        <Form
          data={[
            {
              id: 1,
              name: 'Email',
              state: email,
              setState: setEmail,
              errors: errMsgs['Email'].filter(element => error.includes(element)),
              red: errMsgs['Email'].some((item) => error.includes(item)),
            },
            {
              id: 2,
              name: 'Password',
              state: password,
              setState: setPassword,
              errors: errMsgs['Password'].filter(element => error.includes(element)),
              red: errMsgs['Password'].some((item) => error.includes(item)),
            }]}
            bottomChildren={
              <TouchableOpacity onPress={toRegister} style={styles.textButton}>
                <Text style={{ color: '#195064' }}>Forgot your password?</Text>
              </TouchableOpacity>
            }
        />
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={{ color: 'white' }}>Log In</Text>
        </Pressable>

        <View style={styles.textButton}>
          <Text style={{ fontWeight: 'bold', color: '#195064'}}>OR</Text>
        </View>

        <TouchableOpacity onPress={toParticipantTabs} style={styles.textButton}>
          <Text style={{ color: '#195064' }}>Continue as Guest</Text>
        </TouchableOpacity>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    // backgroundColor: 'white',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#195064',
    marginVertical: 8,
  },
  textButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },

});