import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileInfoScreen from '../screens/common/ProfileScreen';
import StudyScreen from '../screens/common/StudyScreen';
import { Trial, User } from '../utils/types';

const Stack = createStackNavigator();

const screenNames = ['Main', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary', 'Septenary', 'Octonary', 'Nonary', 'Denary']

export default function AppNavigator(
    {name, components, profileFocusable=false, studyFocusable=false, user, trial, onUserPress, setUser, setTrial}: 
    {
        name: string
        components: (React.ReactNode | (()=>React.ReactNode))[], 
        profileFocusable?: boolean, 
        studyFocusable?: boolean, 
        user?: User | null,
        onUserPress?: ({user}: {user: User | null}) => void,
        setUser?: React.Dispatch<React.SetStateAction<User | null>>,
        trial?: Trial | null,
        setTrial?: React.Dispatch<React.SetStateAction<User | null>>,
    }) {

  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        }}>
        {components.map((component, index) => {
            return (
                <Stack.Screen key={index} name={screenNames[index]}>
                    {typeof component === 'function' ? component : () => component}
                </Stack.Screen>
            )
        })
        }
        {profileFocusable ? 
            <Stack.Screen name={"ProfileInfoScreen" + name}>
                {user ? () => ProfileInfoScreen({user}) : () => null}
            </Stack.Screen> 
            : null
        }
        {studyFocusable ?
            <Stack.Screen name={"StudyInfoScreen" + name}>
                {trial ? () => StudyScreen({trial, onUserPress}) : () => null}
            </Stack.Screen>
            : null
        }
    </Stack.Navigator>
  )
}