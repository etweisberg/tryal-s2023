import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'
import Icon from "react-native-vector-icons/Ionicons";

export default function Header(
    {
        title = '',
        rightComponentType = 'view',
        rightText = '',
        leftComponentType = 'view',
        leftText = '',
        onRightPress = () => {},
        onLeftPress = () => {},
        children = null,
        textColor,
        backgroundColor 
    }:
    {
        title?: string, 
        rightComponentType?: string, 
        rightText?: string, 
        leftComponentType?: string, 
        leftText?: string, 
        onRightPress?: (event: GestureResponderEvent) => void,
        onLeftPress?: (event: GestureResponderEvent) => void,
        children?: ReactNode,
        textColor?: string,
        backgroundColor?: string
    }) {

  return (
    <View style={{width: '100%'}}>
        <View style={backgroundColor? [styles.headerContainer, {backgroundColor: backgroundColor}]: styles.headerContainer}>
            {leftComponentType === 'touchable-text' 
                ? 
                <TouchableOpacity style={styles.sideContainer} onPress={onLeftPress}>
                    <Text style={{color: textColor, width: '100%', textAlign: 'left'}}>{leftText}</Text>
                </TouchableOpacity> 
                : leftComponentType === 'touchable-icon'
                ?
                <TouchableOpacity style={styles.sideContainer} onPress={onLeftPress}>
                    <Icon name={leftText} size={25} color={textColor? textColor : "#195064"} />
                </TouchableOpacity>
                :
                <View style={styles.sideContainer} />
            }
            <View style={styles.midContainer}>
                <Text style={textColor? [styles.title, {color: textColor}] : styles.title}>{title}</Text>
            </View>

            <View style={styles.sideContainer} >
            {rightComponentType === 'touchable-text' 
                ? 
                <TouchableOpacity style={styles.sideContainer} onPress={onRightPress}>
                    <Text style={{color: '#195064', width: '100%', textAlign: 'right'}}>{rightText}</Text>
                </TouchableOpacity> 
                : rightComponentType === 'touchable-icon'
                ?
                <TouchableOpacity style={styles.sideContainer} onPress={onRightPress}>
                    {/* icon here */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Icon name={rightText} size={35} color={textColor? textColor : "#195064"}/>

                    </View>
                </TouchableOpacity>
                :
                <View style={styles.sideContainer} />
            }
            </View>
        </View>
        {children}
    </View>
  )
}



const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingTop: 24,
      paddingBottom: 8,
      marginBottom: 8,
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
    },
    sideContainer: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        justifyContent: 'center'
    },
    midContainer: {
        flex: 2, 
        width: '100%', 
        height: '100%', 
        justifyContent: 'center'
    }  
  });