import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Navigation from './navigation/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { persistor, store } from './stores'
import { PersistGate } from 'redux-persist/integration/react';

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
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
