import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, SafeAreaView, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { User, loginUser } from '../../../stores/userReducer';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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
        age: result.data.age,
        medConditions: result.data.medConditions,
        homeAddress: result.data.homeAddress,
        seekingCompensation: result.data.seekingCompensation,
      }
      dispatch(loginUser(user));
    } catch (error) {
      console.error(error);
      // TODO: handle the error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      <Button title="Login" onPress={handleLogin} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
});