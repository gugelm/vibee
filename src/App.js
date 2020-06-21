import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Buttons from './Buttons'
import firebase from 'firebase'
import FirebaseProvider from './Firebase'
import { store } from './redux/store'
import { Provider } from 'react-redux'

export function App() {

return (
  <FirebaseProvider>
  <Provider store={store}>
  <View style={styles.container}>
    <Buttons />
  </View>
  </Provider>
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