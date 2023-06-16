import { StyleSheet } from "react-native";
import * as Font from 'expo-font'

export default async function loadStyles() {
  // style sheet
  const styles_mod = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        width: '100%',
        // backgroundColor: 'black',
      },
      participantContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        marginTop: 24,
        paddingHorizontal: 16,
      },
      msgContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        marginTop: 24,
        backgroundColor: 'black',
      },
      cardsContainer: {
        flex: 1, 
        paddingHorizontal: 8, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between'
      },
      button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 24,
        backgroundColor: '#195064',
        marginVertical: 8,
      },
      textButton: {
        paddingVertical: 8,
        alignItems: 'center',
      },
      circleButton: {
        height: 48, 
        aspectRatio: 1, 
        borderRadius: 24,
        backgroundColor: '#d9d9d9', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 8,
        elevation: 6,
      },
      inputContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },
      searchbar: {
        height: 50, 
        width: '100%', 
        backgroundColor: '#e8e8e8', 
        marginVertical: 4,
      },
      snackbar: {
        backgroundColor: 'white', // change the background color to white
        color: 'red', // change the text color to black
        borderRadius: 5, // add some border radius to the Snackbar
        elevation: 3, // add some elevation to give a shadow effect
        height: 70,
        padding: 0,
      },
      checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      checkbox: {
        alignSelf: 'center',
      },
      test: {
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingVertical: 16,
        fontFamily: 'Inconsolata-Regular',
      }
  })

  // loads the font s
  await Font.loadAsync({
    'Inconsolata-Regular': require('./assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold': require('./assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-Legular': require('./assets/fonts/Inconsolata-Light.ttf'),
  });

  return styles_mod
}