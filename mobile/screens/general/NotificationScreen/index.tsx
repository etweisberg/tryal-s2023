import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      {/* <Header title='Messages'/> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Recent</Text>
        {/* <StudyList data={DATA} horizontal /> */}

        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Older</Text>
        {/* <StudyList data={DATA} />         */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    // marginTop: 24,
    // paddingHorizontal: 16,
    // backgroundColor: 'black',
  },

});