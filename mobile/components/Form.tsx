import { View, Text, TextInput, FlatList } from 'react-native'
import React, { ReactNode } from 'react'
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


Form.defaultProps = {
    header: null,
    data: {},
    children: null
};

Form.propTypes = {
    header: PropTypes.string,
    data: PropTypes.array,
    children: PropTypes.node
}

export default function Form({ header=null, data={}, children=null}: { header: string | null, data: any, children: ReactNode }) {
  return (
    <View style={styles.inputContainer}>
        <View>
            {header ? <Text style={styles.header}>{header}</Text> : null}
        </View>
        <View>
            <FlatList 
                style={{flexGrow: 1}}
                data={data}
                scrollEnabled={false}
                renderItem={({item}) => 
                    <TextInput
                    // variant="outlined"
                    placeholder={item.name}
                    value={item.state}
                    onChangeText={item.setState}
                    style={styles.textInput}
                    />
                }
            />
        </View>
        <View style={{paddingVertical: 8, width: '100%'}}>
            {children}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      width: '100%',
      marginBottom: 16,
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
      marginVertical: 8,
      borderWidth: 0.25,
      borderRadius: 15,
      borderColor: '#bdbdbd',
      backgroundColor: '#e8e8e8'
    },  
  });