import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Buttons from './Buttons'
import firebase from 'firebase'
import { Provider } from 'react-redux'
import FirebaseProvider from './Firebase'

export function App() {

return (
  <FirebaseProvider>
  <View style={styles.container}>
    <Buttons />
  </View>
  </FirebaseProvider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

export default App;