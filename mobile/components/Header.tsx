import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';

Header.defaultProps = {
    title: '',
    rightComponentType: 'view',
    rightText: '',
    leftComponentType: 'view',
    leftText: '',
    onRightPress: () => {},
    onLeftPress: () => {},
    children: null
};

Header.propTypes = {
    title: PropTypes.string,
    rightComponentType: PropTypes.string,
    rightText: PropTypes.string,
    leftComponentType: PropTypes.string,
    leftText: PropTypes.string,
    onRightPress: PropTypes.func,
    onLeftPress: PropTypes.func,
    children: PropTypes.node
}

export default function Header(
    {title = '',
    rightComponentType = 'view',
    rightText = '',
    leftComponentType = 'view',
    leftText = '',
    onRightPress = () => {},
    onLeftPress = () => {},
    children = null}:
    {title: string, 
    rightComponentType: string, 
    rightText: string, 
    leftComponentType: string, 
    leftText: string, 
    onRightPress: (event: GestureResponderEvent) => void,
    onLeftPress: (event: GestureResponderEvent) => void,
    children: ReactNode}) {

  return (
    <View style={{width: '100%'}}>
        <View style={styles.headerContainer}>
            {leftComponentType === 'touchable-text' 
                ? 
                <TouchableOpacity style={styles.sideContainer} onPress={onLeftPress}>
                    <Text style={{color: '#195064', width: '100%', textAlign: 'right'}}>{leftText}</Text>
                </TouchableOpacity> 
                : leftComponentType === 'touchable-icon'
                ?
                <TouchableOpacity style={styles.sideContainer} onPress={onLeftPress}>
                    <Icon name={leftText} size={25} color="#195064" />
                </TouchableOpacity>
                :
                <View style={styles.sideContainer} />
            }
            <View style={styles.midContainer}>
                <Text style={styles.title}>{title}</Text>
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
                    <Icon name={rightText} size={30} color="#195064" />
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
    //   flex: 1,
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 24,
      marginBottom: 8,
    //   backgroundColor: 'black'
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