import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
// import CheckBox from 'react-native-check-box'
import { CheckBox } from 'react-native-elements';
import { View, Text } from 'react-native';
// import { TextInput, Stack, Button } from "@react-native-material/core";
import { TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { User, loginUser } from '../../../stores/userReducer';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/types';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import * as Progress from 'react-native-progress';


type RegisterScreenProps = StackScreenProps<MainStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [password, setPassword] = useState('');

  const [index, setIndex] = useState(0);
  const [checkboxSelected, setCheckboxSelection] = useState(false);

  const pages = [
    {
      header: 'First, we need you to enter your email.',
      data: [
        {id: 0, name: 'Email', state: email, setState: setEmail},
      ]
    },
    {
      header: 'Now, create a username and password.',
      data: [
        {id: 0, name: 'Username', state: username, setState: setUsername},
        {id: 1, name: 'Password', state: password, setState: setPassword},
      ]
    },
    {
      header: 'To match you with appropriate studies, we need to know a little bit more about you.',
      data: [
        {id: 0, name: 'First Name', state: firstName, setState: setFirstName},
        {id: 1, name: 'Last Name', state: lastName, setState: setLastName},
      ]
    },
    {
      header: 'Just a couple more questions!',
      data: [
        {id: 0, name: 'Sex', state: sex, setState: setSex},
        {id: 1, name: 'Gender', state: gender, setState: setGender},
      ]
    },
    {
      header: 'Last ones!',
      data: [
        {id: 0, name: 'Race', state: race, setState: setRace},
        {id: 1, name: 'Ethnicity', state: ethnicity, setState: setEthnicity},
      ]
    },
  ]
  
  const toLogin = () => {
    navigation.navigate('Login')
  }
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleRegister = async () => {
    
  }

  const toNext = () => {
    if (index !== pages.length - 1) {
      setIndex(index + 1);
    } else {
      handleRegister();
    }
  }

  const toPrev = () => {
    if (index !== 0) {
      setIndex(index - 1);
    } else {
      toLogin();
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={dismissKeyboard}>
        <Header 
          title='Sign Up' 
          leftComponentType='touchable-icon'
          leftText='chevron-back-outline'
          onLeftPress={toPrev}
          rightComponentType='touchable-text' 
          rightText='Log In'
          onRightPress={toLogin}
          children={
            <Progress.Bar progress={(index + 1)/(pages.length + 1)} style={{flex: 1}} height={6} width={null} color='#195064' unfilledColor='green' borderWidth={0} />
          }
        />
        <Form 
          header={pages[index].header}
          data={pages[index].data}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            onPress={() => {setCheckboxSelection(!checkboxSelected)}}
            checked={checkboxSelected}
            checkedColor='#195064'
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            Component={Text}
            size={20}
            title='I would like to receive your newsletter and other promotional information.'
            containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent', width: '100%', padding: 0, margin: 0}}
            textStyle={{fontWeight: 'normal', fontSize: 14}}
          />
        </View>
        
        <TouchableHighlight onPress={toNext} containerStyle={styles.button}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: 'white' }}>{index !== pages.length - 1 ? 'Next' : 'Submit'}</Text>
          </View>
        </TouchableHighlight>
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
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#195064',
    marginVertical: 16,
  },
  textButton: {
    paddingVertical: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },

});