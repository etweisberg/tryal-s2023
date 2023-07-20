import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { View, Text } from 'react-native';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import * as Progress from 'react-native-progress';
import { Snackbar } from 'react-native-paper';
import { MyObject } from '../../../components/types';
import { authErrors } from '../../../utils/errors';
import { registerSchemas } from '../../../utils/validation';
import styles from '../../../styles'
import { pages } from './data';
import { serverUrl } from '../../../utils/apiCalls';

export default function ResearcherAuthScreen({ navigation }: {navigation: any}) {
  // state for form inputs
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [institution, setInstitution] = useState('');
  const [scannedID, setScannedID] = useState(null);
  const [picture, setPicture] = useState(null);

  const DATA: MyObject = {
    'Email': [email, setEmail],
    'First Name': [firstName, setFirstName],
    'Last Name': [lastName, setLastName],
    'Scanned ID': [scannedID, setScannedID],
    'Picture': [picture, setPicture],
  }

  // state for error message
  const [error, setError] = useState(['']);

  // state for page index
  const [index, setIndex] = useState(0);

  // Snackbar state and functions
  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const onDismissSnackBar = () => setVisible(false);
  function MySnackbar() {
    return (
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: onDismissSnackBar,
          color: 'white'
        }}>
        {snackbarMsg}
      </Snackbar>
    );
  }


  // navigation functions
  const toLogin = () => {
    navigation.navigate('Login')
  }
  
  // function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // function to handle researcher auth
  const handleResearcherAuth = async () => {
    try {
      const route = serverUrl + '/api/researcher/researcher-request';
      console.log(route);
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, email, institution }),
        });
      const result = await response.json();

      if (response.status === 201) {
        setIndex(index + 1);
        // TODO: send email to admin
        // TODO: send email to researcher
        // TODO: update researcher status to pending
        // Update researcher info to include institution
      } else if (response.status === 400) {
        console.log('response status 400');
        console.log(response);
        setSnackbarMsg(result.message);
        setVisible(true);
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  // function to go to next page, validate inputs, and handle register
  const toNext = async () => {
    if (index < pages.length) {
      const pageInputs = pages[index].inputs.reduce((acc, val) => ({ ...acc, [val]: DATA[val][0] }), {});
      await registerSchemas[index].validate(pageInputs, { abortEarly: false });
    }
    if (index < pages.length - 1) {
      setIndex(index + 1);
      setError(['']);
    } else if (index === pages.length - 1) {
      handleResearcherAuth();
    } else {
      toLogin();
    }
  }

  // function to go to previous page
  const toPrev = () => {
    setError(['']);
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
          title='Verify' 
          leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={toPrev}
          children={
            <Progress.Bar 
              progress={(index + 1)/(pages.length + 1)} 
              height={6} 
              width={null} 
              color='#195064' 
              unfilledColor='#e8e8e8' 
              borderWidth={0} />
          }
        />

        { 
          index < pages.length ? 
            <Form
              header={pages[index].header}
              data={pages[index].inputs.map((item: string) => {
                // console.log(item);
                return ({
                  name: item, 
                  state: DATA[item][0], 
                  setState: DATA[item][1], 
                  errors: authErrors[item].filter(element => error.includes(element)),
                  red: authErrors[item].some((item) => error.includes(item))
                })
              })}
              topChildren={<MySnackbar/>}
            /> : 
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Success!</Text>  
              <Text>Thank you for submitting your ID and photo! Your information will be reviewed and you will be notified when your account has been approved.</Text>
            </View>
        }

        <Pressable onPress={toNext} style={styles.button}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text style={{ color: 'white' }}>
              {
                index < pages.length - 1 ? 'Next' : 
                index === pages.length - 1 ? 'Submit' :
                'To Login'
              }
            </Text>
          </View>
        </Pressable>
        
      </Pressable>
    </KeyboardAvoidingView>
  );
}