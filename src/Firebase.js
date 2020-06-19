import React, { createContext } from 'react'
import app from 'firebase/app'

const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
		apiKey: "AIzaSyAijLq9YB1PzBD6uUFrNKHbYe7-IW1HTcQ",
		authDomain: "vibee-9e787.firebaseapp.com",
		databaseURL: "https://vibee-9e787.firebaseio.com",
		projectId: "vibee-9e787",
		storageBucket: "vibee-9e787.appspot.com",
		messagingSenderId: "277559745770",
		appId: "1:277559745770:web:c0be19e0b1dfe1808b8b93",
		measurementId: "G-JP7BX2SLC7"
    })
  }
  return (
    <FirebaseContext.Provider value={ app }>
      { children }
    </FirebaseContext.Provider>
  )
}