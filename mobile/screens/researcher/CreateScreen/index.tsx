import { View, Text, SafeAreaView, Keyboard, KeyboardAvoidingView, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { MyObject } from '../../../components/types';
import { pages } from './data';
import Form from '../../../components/Form';
import styles from '../../../styles';
import { trialErrors } from '../../../utils/errors';
import Header from '../../../components/Header';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [compensation, setCompensation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const DATA: MyObject = {
    'Title': [title, setTitle],
    'Description': [description, setDescription],
    'Date': [date, setDate],
    'Location': [location, setLocation],
    'Compensation': [compensation, setCompensation],
    'Additional Notes': [additionalInfo, setAdditionalInfo],
  }

  const [error, setError] = useState([''])
  const [index, setIndex] = useState(0);

  // function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const createTrial = () => {
    // needs to be implemented
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={dismissKeyboard}>
        <Header title='New Trial' />

        { 
          index < pages.length ? 
            <Form
              data={pages[index].inputs.map((item: string) => {
                // console.log(item);
                return ({
                  name: item, 
                  state: DATA[item][0], 
                  setState: DATA[item][1], 
                  errors: trialErrors[item].filter(element => error.includes(element)),
                  red: trialErrors[item].some((item) => error.includes(item))
                })
              })}
            /> : 
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Success!</Text>  
              <Text>Trial successfully created!</Text>
            </View>
        }
        
        <Pressable onPress={createTrial} style={styles.button}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: 'white' }}>
              Create Trial!
            </Text>
          </View>
        </Pressable>
        
      </Pressable>
    </KeyboardAvoidingView>
  )
}