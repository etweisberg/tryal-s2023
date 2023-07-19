import { View, Text, SafeAreaView, Keyboard, KeyboardAvoidingView, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { MyObject } from '../../../components/types';
import { pages } from './data';
import Form from '../../../components/Form';
import styles from '../../../styles';
import { trialErrors } from '../../../utils/errors';
import Header from '../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { serverUrl } from '../../../utils/apiCalls';

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [compensation, setCompensation] = useState('');
  const [eligibleConditions, setEligibleConditions] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const DATA: MyObject = {
    'Title': [title, setTitle],
    'Description': [description, setDescription],
    'Date': [date, setDate],
    'Location': [location, setLocation],
    'Eligible Conditions': [eligibleConditions, setEligibleConditions],
    'Compensation': [compensation, setCompensation],
    'Additional Notes': [additionalInfo, setAdditionalInfo],
  }

  const [error, setError] = useState([''])
  const [index, setIndex] = useState(0);

  // function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCreateTrial = async () => {
    try {
      const route = serverUrl + '/api/trial/create';
      console.log(route);
      const name = title;
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          date,
          location,
          eligibleConditions
        })
      });
      const result = await response.json();

      if (response.status === 201) {
        setIndex(index + 1);
      } else {
        alert(result.message);
        console.log(response);
      }
    } catch (error: any) {
      alert(error.message);
      console.log(error)
    }
  }

  const resetIndex = () => {
    setIndex(0);
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
                scrollable={true}
              /> : 
              <View style={styles.inputContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Success!</Text>  
                <Text>Trial successfully created!</Text>
              </View>
          }
        <Pressable onPress={index < pages.length ? handleCreateTrial: resetIndex} style={styles.button}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: 'white' }}>
              {index < pages.length ? "Create Trial!" : "New Trial"}
            </Text>
          </View>
        </Pressable>
        
      </Pressable>
    </KeyboardAvoidingView>
  )
}