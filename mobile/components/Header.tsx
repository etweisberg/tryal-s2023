import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import { styles, font_styles } from '../styles_temp';

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
                <TouchableOpacity style={styles.headerSideContainer} onPress={onLeftPress}>
                    <Text style={{color: textColor, width: '100%', textAlign: 'left'}}>{leftText}</Text>
                </TouchableOpacity> 
                : leftComponentType === 'touchable-icon'
                ?
                <TouchableOpacity style={styles.headerSideContainer} onPress={onLeftPress}>
                    <Icon name={leftText} size={25} color={textColor? textColor : "#195064"} />
                </TouchableOpacity>
                :
                <View style={styles.headerSideContainer} />
            }
            <View style={styles.headerMidContainer}>
                <Text style={textColor? [font_styles.page_header, {color: textColor}] : font_styles.page_header}>{title}</Text>
            </View>

            <View style={styles.headerSideContainer} >
            {rightComponentType === 'touchable-text' 
                ? 
                <TouchableOpacity style={styles.headerSideContainer} onPress={onRightPress}>
                    <Text style={{color: '#195064', width: '100%', textAlign: 'right'}}>{rightText}</Text>
                </TouchableOpacity> 
                : rightComponentType === 'touchable-icon'
                ?
                <TouchableOpacity style={styles.headerSideContainer} onPress={onRightPress}>
                    {/* icon here */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Icon name={rightText} size={35} color={textColor? textColor : "#195064"}/>

                    </View>
                </TouchableOpacity>
                :
                <View style={styles.headerSideContainer} />
            }
            </View>
        </View>
        {children}
    </View>
  )
}