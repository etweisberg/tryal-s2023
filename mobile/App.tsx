import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Navigation from './navigation/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistor, store } from './stores'
import { PersistGate } from 'redux-persist/integration/react';
import { io } from 'socket.io-client';
import { serverUrl } from './utils/apiCalls';

const socket = io(serverUrl, {})

socket.on('connect', () => {
  console.log('Connected to server.');
});

socket.on('chat message', (message) => {
  console.log('Received message:', message);
});

export default function App() {
  

  return (
    <Provider store = {store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>

        <SafeAreaProvider>
          {/* <View style={styles.container}> */}
            <Navigation />
          {/* </View> */}
        </SafeAreaProvider>

      </PersistGate>

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
