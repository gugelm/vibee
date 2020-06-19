import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'
import HappyAnimation, { animateHappy } from './HappyAnimation'
import { Audio } from 'expo-av'

let animatedValue = new Animated.Value(0)    

export let animateHappyPress = () => {
    animatedValue.setValue(0)
    Animated.timing(
        animatedValue,
        {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear
        }
    )
    .start(() => animatedValue.setValue(0))
}

export function HappyButton() {
   
let playSound = async () => {
const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require('./assets/aqua4.mp3'));
    soundObject.setPositionAsync(0);
    soundObject.setIsLoopingAsync(false);
    await soundObject.playAsync();
}

const pressButton = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18]
})

const [happy, editHappy] = useStateWithCallback(0, happy => {
    {firebase.database().ref(`vibee/room/happy/${user}`).update({ happy })}
    console.log('happy callback!')
    animateHappy()
    })

const [ happyTotal, happyTotalEdit ] = React.useState(0)

useEffect(() => {
    console.log('play sound!')    
    firebase.database().ref(`/vibee/room/happy`)
        .on("value", function(snapshot) {
        let room = snapshot.val()
        let happyUser = 0
        Object.keys(room).forEach(key => {
        happyUser += room[key].happy
        })
        happyTotalEdit(happyTotal + happyUser)
        }, 
        function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })
    },[])


return (
<TouchableOpacity
    onPress={() => {
        editHappy(happy + 1)
        animateHappyPress()
        playSound()
        }}
    style={{padding:20}}
    activeOpacity={1}
    >
    <Animated.Image 
        source={require('./assets/emoji/btn_haha.png')}
        style={{
            width:74, 
            height: 77, 
            padding: 20,
            transform: [
                {translateY: (pressButton)},
                ],
        }}
    />
    <Text style={{alignSelf: 'center', fontSize: 16}}>{happyTotal}</Text>
</TouchableOpacity>
)
}

export default HappyButton
