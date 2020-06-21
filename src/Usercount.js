import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'

export function Usercount() {

const [lastActive, lastActiveUpdate] = useStateWithCallback(Date.now(), lastActive => {
  {firebase.database().ref(`vibee/room/lastActive/${user}`).update({ lastActive })}
  console.log('lastactive callback!')
  })

const [ activeUsers, updateActiveUsers ] = React.useState(0)
  let totalUsers = 0

useEffect(() => {
  //heartbeat to count active users. usually set to 5000 ms.
  setInterval(function(){ 
  lastActiveUpdate(lastActive+(Date.now()-lastActive))
  }, 15000)

  // calculate active users (active in last 30 s)
  firebase.database().ref(`/vibee/room/lastActive`)
  .on("value", function(snapshot) {
    let room = snapshot.val()
    let totalUsers = 0
    Object.keys(room).forEach(key => {
      if (room[key].lastActive > (Date.now() - 30000) ) {
        totalUsers += 1
      } else {
        totalUsers += 0
      }
    })
    updateActiveUsers(activeUsers + totalUsers)
  }, 
  function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  })
  },[])

return (
  <View
  style={{
    backgroundColor: 'rgb(231, 231, 231)',
    padding: 20, 
    zIndex: 1,
    borderRadius: 90,
    width:180,
    height:180,
    alignItems:'center',
    alignSelf:'center',
  }}>
<Text
  style={{ 
    flex: 1,
    fontSize: 60, 
    fontWeight: 'bold', 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10,
    }}>
  {activeUsers}
</Text>
<Text
  style={{ 
    flex: 1,
    fontSize: 24, 
    fontWeight: '200', 
    alignSelf: 'center', 
    alignItems: 'center', 
    justifyContent: 'center',
    }}>
  Vibers
</Text>
</View>
)
}

export default Usercount