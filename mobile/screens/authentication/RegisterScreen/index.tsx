import React, { useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
// import CheckBox from 'react-native-check-box'
import { CheckBox } from 'react-native-elements';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/types';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
import * as Progress from 'react-native-progress';
import * as yup from 'yup';
import { Snackbar } from 'react-native-paper';

const pages = [
  {
    header: 'First, we need your email.',
    inputs: ['Email'],
  },
  {
    header: 'Now, create a username and password.',
    inputs: ['Username', 'Password', 'Confirm Password'],
  },
  {
    header: 'Next, we need your name.',
    inputs: ['First Name', 'Last Name'],
  },
  {
    header: 'To match you with appropriate studies, we need to know a little bit more about you.',
    inputs: ['Sex', 'Age'],
  },
  {
    header: 'Last ones! (Optional)',
    inputs: ['Race', 'Ethnicity'],
  },
]

interface MyObject {
  [key: string]: Array<any>;
}

const errMsgs : MyObject = {
  'Email': ['Email required', 'Valid email required'],
  'Username': ['Username required'],
  'Password': ['Password required', 'Password must be at least 8 characters'],
  'Confirm Password': ['Confirm password required', 'Passwords must match'],
  'First Name': ['First name required'],
  'Last Name': ['Last name required'],
  'Sex': [],
  'Gender': [],
  'Age': [],
  'Race': [],
  'Ethnicity': [],
}

const registerSchemas = [
  yup.object().shape({
    'Email': yup.string().email("Valid email required").required("Email required")
  }),
  yup.object().shape({
    'Username': yup.string().required('Username required'),
    'Password': yup.string().required('Password required').min(8, 'Password must be at least 8 characters'),
    'Confirm Password': yup.string().required('Confirm password required').oneOf([yup.ref('Password'), ''], 'Passwords must match'),
  }),
  yup.object().shape({
    'First Name': yup.string().required('First name required'),
    'Last Name': yup.string().required('Last name required'),
  }),
  yup.object().shape({
    'Sex': yup.string().required('Sex required'),
    'Age': yup.number().required('Age required'),
  }),
  yup.object().shape({
    'Race': yup.string(),
    'Ethnicity': yup.string(),
  }),
]

type RegisterScreenProps = StackScreenProps<MainStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  // state for form inputs
  const [username, setUsername] = useState('c');
  const [email, setEmail] = useState('a@a');
  const [firstName, setFirstName] = useState('c');
  const [lastName, setLastName] = useState('w');
  const [sex, setSex] = useState('m');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(19);
  const [race, setRace] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [password, setPassword] = useState('password');
  const [passwordConfirm, setPasswordConfirm] = useState('password');

  // state for error message
  const [error, setError] = useState(['']);

  // state for page index
  const [index, setIndex] = useState(0);
  const [checkboxSelected, setCheckboxSelection] = useState(false);

  // state for snackbar
  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const onDismissSnackBar = () => setVisible(false);

  const DATA: MyObject = {
    'Email': [email, setEmail],
    'Username': [username, setUsername],
    'Password': [password, setPassword],
    'Confirm Password': [passwordConfirm, setPasswordConfirm],
    'First Name': [firstName, setFirstName],
    'Last Name': [lastName, setLastName],
    'Sex': [sex, setSex],
    'Age': [age, setAge],
    'Gender': [gender, setGender],
    'Race': [race, setRace],
    'Ethnicity': [ethnicity, setEthnicity]
  }
  
  const toLogin = () => {
    navigation.navigate('Login')
  }
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleRegister = async () => {
    try {
      const homeAddress = '1234 Main St';
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, age, homeAddress, password }),
      });
      
      if (response.status === 201) {
        setIndex(index + 1);
      } else if (response.status === 400) {
        console.log('response status 400');
        console.log(response);
        const result = await response.json();
        console.log(result.message)
        setSnackbarMsg(result.message);
        setVisible(true);
      } else {
        console.log(response);
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  const toNext = async () => {
    try {
      if (index < pages.length) {
        const pageInputs = pages[index].inputs.reduce((acc, val) => ({ ...acc, [val]: DATA[val][0] }), {});
        await registerSchemas[index].validate(pageInputs, { abortEarly: false });
      }
      
      if (index < pages.length - 1) {
        setIndex(index + 1);
        setError(['']);
      } else if (index === pages.length - 1) {
        handleRegister();
      } else {
        toLogin();
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.errors);
      setError(error.errors);
    }
    
  }

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
          title='Sign Up' 
          leftComponentType='touchable-icon'
          leftText='chevron-back-outline'
          onLeftPress={toPrev}
          rightComponentType='touchable-text' 
          rightText='Log In'
          onRightPress={toLogin}
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
                return {
                  name: item, 
                  state: DATA[item][0], 
                  setState: DATA[item][1], 
                  errors: errMsgs[item].filter(element => error.includes(element)),
                  red: errMsgs[item].some((item) => error.includes(item))
                }
              })}
              topChildren={
                <Snackbar
                wrapperStyle={{top: 0}}
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
              }
            /> : 
            <View style={styles.inputContainer}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>Success!</Text>  
              <Text>Thank you for signing up!</Text>
            </View>
        }

        { 
          index === pages.length - 1 ? 
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
        </View> : null
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    // backgroundColor: 'transparent',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    // marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  //   backgroundColor: 'green'
  },
  snackbar: {
    backgroundColor: 'white', // change the background color to white
    color: 'red', // change the text color to black
    borderRadius: 5, // add some border radius to the Snackbar
    elevation: 3, // add some elevation to give a shadow effect
    height: 70,
    padding: 0,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#195064',
    marginBottom: 24,
  },
  textButton: {
    paddingVertical: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkbox: {
    alignSelf: 'center',
  },

});