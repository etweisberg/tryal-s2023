import { View, Text, TextInput, FlatList } from 'react-native'
import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

Form.defaultProps = {
    header: null,
    data: {},
    topChildren: null,
    bottomChildren: null
};

Form.propTypes = {
    header: PropTypes.string,
    data: PropTypes.array,
    topChildren: PropTypes.node,
    bottomChildren: PropTypes.node
}

export default function Form(
  { header=null, data={}, topChildren=null, bottomChildren=null}: 
  { header: string | null, data: any, topChildren: ReactNode, bottomChildren: ReactNode }) {
  return (
    <View style={styles.inputContainer}>
        {topChildren}
        <View>
            {header ? <Text style={styles.header}>{header}</Text> : null}
        </View>
        <View style={{paddingVertical: 8}}>
          <FlatList 
              style={{flexGrow: 1}}
              data={data}
              scrollEnabled={false}
              renderItem={({item}) => {
                return (<View>
                  <TextInput
                  autoCorrect={false}
                  autoComplete='off'
                  autoCapitalize='none'
                  spellCheck={false}
                  placeholder={item.name}
                  value={item.state !== 0 ? item.state : ''}
                  onChangeText={item.setState}
                  style={[
                    styles.textInput, 
                    {borderColor: item.red ? 'red' : '#bdbdbd'},
                    {height: item.name==='Description' || item.name==='Additional Info' ? 200 : 48}
                  ]}
                  secureTextEntry={item.name === 'Password' || item.name === 'Confirm Password' ? true : false}
                  />
                  <View style={{width: '100%', height: 15}}>
                    {item.errors ? <Text style={{color: 'red', textAlign: 'left', fontSize: 12}}>{item.errors.join(', ')}</Text> : null}
                  </View>
                </View>)
              }
              }
            />
        </View>
        {bottomChildren ? 
          <View style={{paddingVertical: 8, width: '100%'}}>
            {bottomChildren}
          </View> : null}
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      width: '100%',
      // marginBottom: 16,
      justifyContent: 'center',
    //   backgroundColor: 'green'
    },
    header:{
      fontSize: 14,
      margin: 16,
      textAlign: 'center',
    },
    textInput: {
      width: '100%',
      height: 48,
      padding: 16,
      marginVertical: 4,
      borderWidth: 0.25,
      borderRadius: 15,
      // borderColor: '#bdbdbd',
      backgroundColor: '#e8e8e8'
    },  
  });