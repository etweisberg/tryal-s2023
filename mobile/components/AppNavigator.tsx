import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileInfoScreen from '../screens/common/ProfileInfoScreen';
import StudyScreen from '../screens/common/StudyScreen';

const Stack = createStackNavigator();

const screenNames = ['Main', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary', 'Septenary', 'Octonary', 'Nonary', 'Denary']

export default function AppNavigator(
    {components, profileFocusable=false, studyFocusable=false, userID, studyID}: 
    {components: (React.ReactNode | (()=>React.ReactNode))[], profileFocusable?: boolean, studyFocusable?: boolean, userID?: string, studyID?: string}) {
    
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
            <Stack.Screen name="ProfileInfoScreen">
                {userID ? () => ProfileInfoScreen({userID}) : () => null}
            </Stack.Screen> 
            : null
        }
        {studyFocusable ?
            <Stack.Screen name="StudyInfoScreen">
                {studyID ? () => StudyScreen({studyID}) : () => null}
            </Stack.Screen>
            : null
        }
    </Stack.Navigator>
  )
}