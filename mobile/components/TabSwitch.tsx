import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function TabSwitch(
    {textLeft='', textRight='', onPressLeft=() => {}, onPressRight=() => {}}: 
    {textLeft?: string, textRight?: string, onPressLeft?: () => void, onPressRight?: () => void}) {
    
    const [selected, setSelected] = React.useState<string>('left');

    const leftPressed = () => {
        setSelected('left');
        onPressLeft();
    }

    const rightPressed = () => {
        setSelected('right');
        onPressRight();
    }

  return (
    <View style={styles.container}>

      <Pressable 
      style={[styles.tabContainer, {backgroundColor: selected==='left'? 'white':'transparent'}]}
      onPress={leftPressed}>
        <Text>{textLeft}</Text>
      </Pressable>

      <Pressable 
      style={[styles.tabContainer, {backgroundColor: selected==='right'? 'white':'transparent'}]}
      onPress={rightPressed}>
        <Text>{textRight}</Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#e8e8e8',
        borderRadius: 25,
        height: 50,
        padding: 4,
    }, 
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    }
});