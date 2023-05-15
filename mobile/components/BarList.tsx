import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Divider } from 'react-native-paper'

export type BarListItem = {
    title: string,
    onPress?: () => void,
    state?: string,
    setState?: (text: string) => void,
    error?: boolean,
}

export default function BarList({data, type='buttons'}: {data: BarListItem[], type?: string}) {
  return (
    <View>
      {data.map((item, index) => {
        return (
        <TouchableOpacity 
        key={index} 
        style={{marginVertical: 5, width: '100%', height: 40}} 
        onPress={item.onPress}
        disabled={type !== 'buttons'}
        >
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
                <View style={{flex: 1}}/>
                <View 
                style={[
                    type==='inputs' ? {flex: 3} : 'buttons' ? {flex: 8} : {flex: 10}, 
                    {flexDirection: 'row', justifyContent: 'flex-start'}
                ]}>
                    <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                </View>
                {
                    type === 'buttons' ?  
                        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Icon name='chevron-forward-outline' size={20} />
                        </View> :
                    type === 'inputs' ?
                        <View style={{flex: 7, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <TextInput
                            autoCorrect={false}
                            autoComplete='off'
                            autoCapitalize='none'
                            spellCheck={false}
                            placeholder={item.title}
                            value={item.state}
                            onChangeText={item.setState}
                            
                            style={[styles.textInput, {borderColor: item.error ? 'red' : '#bdbdbd'}]}
                            secureTextEntry={item.title === 'Password' || item.title === 'Confirm Password' ? true : false}
                            />
                        </View> :
                    null
                }
            </View>

            <View style={{width: '100%', height: 1}}>
            <Divider />
            </View>
        </TouchableOpacity>
        )
    })
    }
 
    </View>
  )
}


const styles = StyleSheet.create({
    textInput: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor: 'transparent',
      color: 'gray'
    },  
  });