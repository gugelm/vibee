import React, { useEffect, useState, Component } from 'react';
import { View, Text } from 'react-native'
import firebase from 'firebase'

const [lastActive, lastActiveUpdate] = useStateWithCallback(Date.now(), lastActive => {
	{firebase.database().ref(`vibee/room/${user}`).update({ lastActive })}
    console.log('lastactive callback!')
      })


      const [ activeUsers, updateActiveUsers ] = React.useState(0)
      let totalUsers = 0



      useEffect(() => {
  //heartbeat to count active users
  setInterval(function(){ 
  	lastActiveUpdate(lastActive+(Date.now()-lastActive))
  	editHappy(happy)
  	editSad(sad)
  	editAngry(angry)
  }, 1500000)

  // calculate total votes
  firebase.database().ref(`/vibee/room`)
  .on("value", function(snapshot) {
  let room = snapshot.val()
  happyUser = 0
  sadUser = 0
  angryUser = 0
  totalUsers = 0
  
  // each key is causing it to rerender... 
  // i think we want to avoid using state user for happyTotalEdit. update to state causes this to re-render...
  Object.keys(room).forEach(key => {
	happyUser += room[key].happy
	sadUser += room[key].sad
	angryUser += room[key].angry
	if (room[key].lastActive > (Date.now() - 30000) ) {
		totalUsers += 1
	} else {
		totalUsers += 0
	}
  updateActiveUsers(activeUsers + totalUsers)
  happyTotalEdit(happyTotal + happyUser)
  sadTotalEdit(sadTotal + sadUser)
  angryTotalEdit(angryTotal + angryUser)
  })
  }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  })
},[])

      return (
	<View>
	<Text 
		style={{ flex: 1, fontSize: 38, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'flex-end'}}>
		{activeUsers} Vibers
	</Text>
	</View>
	)
