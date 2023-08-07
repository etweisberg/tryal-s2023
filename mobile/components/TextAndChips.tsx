import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';

export default function TextAndChips(
    {data=null, name='Name'}: 
    {data: string[] | null, name: string}) {

    return (
        <View style={styles.container}>

            <Text style={{fontSize: 16, paddingVertical: 8}}>
                <Text style={{fontWeight: 'bold'}}>{name}</Text>
                {data?.map(
                (item: string, index: number) => 
                    <Chip key={index} style={{marginHorizontal: 4, borderRadius: 10}}>
                        <Text>{item}</Text>
                    </Chip>
                )}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
});