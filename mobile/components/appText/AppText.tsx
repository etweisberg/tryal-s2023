import React from 'react'
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native'

interface AppTextProps extends TextProps {
    children: string
    textType?: 'regular' | 'bold' | 'light'
    style?: TextStyle | TextStyle[] 
}

export default function AppText({children, textType, style,}: AppTextProps) {
    let textStyle: {}
  switch (textType) {
    case 'regular':
      textStyle = styles.regular
      break
    case 'bold':
      textStyle = styles.bold
      break
    case 'light':
      textStyle = styles.light
      break
    default:
      textStyle = styles.regular
      break
  }

  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style

  return (
    <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
    regular: {
        fontFamily: 'Inconsolata-Regular'
      },
      bold: {
        fontFamily: 'Inconsolata-Bold'
      },
      light: {
        fontFamily: 'Inconsolata-light'
      }
})