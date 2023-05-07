import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
// import { TextInput, Stack, Button } from "@react-native-material/core";
import { TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { User, loginUser } from '../../../stores/userReducer';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import Form from '../../../components/Form';

export default function LoginScreen({ navigation }: { navigation: any}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const toRegister = () => {
    navigation.navigate('Register')
  }

  const toParticipantTabs = () => {
    navigation.navigate('ParticipantTabs')
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });
      const result = await response.json();
      const user : User = {
        _id: result.data._id,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        password: result.data.password,
        verified: result.data.verified,
        verificationToken: result.data.verificationToken,
        resetPasswordToken: result.data.resetPasswordToken,
        resetPasswordTokenExpiryDate: result.data.resetPasswordTokenExpiryDate,
        trials: result.data.trials,
        trialsOwned: result.data.trialsOwned,
        age: result.data.age,
        medConditions: result.data.medConditions,
        homeAddress: result.data.homeAddress,
        seekingCompensation: result.data.seekingCompensation,
        researcher: result.data.researcher,
        institution: result.data.institution,
        admin: result.data.admin,
      }
      dispatch(loginUser(user));
    } catch (error) {
      console.error(error);
      // TODO: handle the error
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
          // header='Enter your username and password.'
          data={[
            {
              id: 1,
              name: 'Email',
              state: username,
              setState: setUsername,
            },
            {
              id: 2,
              name: 'Password',
              state: password,
              setState: setPassword,
            }]}
            children={
              <TouchableOpacity onPress={toRegister} style={styles.textButton}>
                <Text style={{ color: '#195064' }}>Forgot your password?</Text>
              </TouchableOpacity>
            }
        />
        {/* <TouchableOpacity onPress={toRegister} style={styles.textButton}>
          <Text style={{ color: '#195064' }}>Forgot your password?</Text>
        </TouchableOpacity> */}
        <TouchableHighlight onPress={handleLogin} containerStyle={styles.button}>
          <Text style={{ color: 'white' }}>Log In</Text>
        </TouchableHighlight>

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
    margin: 24,
    // backgroundColor: 'black',
  },
  headerContainer: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'green',
    marginVertical: 16
  },  
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    // flex: 3,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    // marginVertical: 32,
    // backgroundColor: 'green'
  },
  textInput: {
    width: '100%',
    height: 48,
    padding: 16,
    marginVertical: 8,
    borderWidth: 0.25,
    borderRadius: 15,
    borderColor: '#bdbdbd',
    backgroundColor: '#e8e8e8'
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