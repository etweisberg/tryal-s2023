import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileInfoScreen from '../screens/common/ProfileInfoScreen';
import StudyScreen from '../screens/common/StudyScreen';
import { Trial } from '../utils/types';

const Stack = createStackNavigator();

const screenNames = ['Main', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary', 'Septenary', 'Octonary', 'Nonary', 'Denary']

export default function AppNavigator(
    {name, components, profileFocusable=false, studyFocusable=false, userID, trial}: 
    {
        name: string
        components: (React.ReactNode | (()=>React.ReactNode))[], 
        profileFocusable?: boolean, 
        studyFocusable?: boolean, 
        userID?: string, 
        trial?: Trial | null
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
                {userID ? () => ProfileInfoScreen({userID}) : () => null}
            </Stack.Screen> 
            : null
        }
        {studyFocusable ?
            <Stack.Screen name={"StudyInfoScreen" + name}>
                {trial ? () => StudyScreen({trial}) : () => null}
            </Stack.Screen>
            : null
        }
    </Stack.Navigator>
  )
}