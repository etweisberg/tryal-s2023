import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/Header';
import TabSwitch from '../../../components/TabSwitch';
import MessageScreen from '../MessageScreen';
import NotificationScreen from '../NotificationScreen';

export default function InboxScreen() {
    const [currentScreen, setCurrentScreen] = React.useState<string>('messages');

    return (
        <View style={styles.container}>
          <Header title='Inbox'/>
          <TabSwitch 
          textLeft='Messages' 
          textRight='Notifications' 
          onPressLeft={() => setCurrentScreen('messages')} 
          onPressRight={() => setCurrentScreen('notifications')}
          />
          {currentScreen === 'messages' ? <MessageScreen /> : <NotificationScreen />}
        </View>
      )
    }
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    },

});