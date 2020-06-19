import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'
import SadAnimation, { animateSad } from './SadAnimation'
import { Audio } from 'expo-av'

let animatedValue = new Animated.Value(0)    

export let animateSadPress = () => {
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

export function SadButton() {

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

const [sad, editSad] = useStateWithCallback(0, sad => {
    {firebase.database().ref(`vibee/room/sad/${user}`).update({ sad })}
    console.log('sad callback!')
    animateSad()
    })

const [ sadTotal, sadTotalEdit ] = React.useState(0)

useEffect(() => {
        firebase.database().ref(`/vibee/room/sad`)
        .on("value", function(snapshot) {
        let room = snapshot.val()
        let sadUser = 0
        Object.keys(room).forEach(key => {
        sadUser += room[key].sad
        })
        sadTotalEdit(sadTotal + sadUser)
        }, 
        function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })
    },[])

return (
<TouchableOpacity
    onPress={() => {
        editSad(sad + 1)
        animateSadPress()
        playSound()
        }}
    style={{padding:20}}
    activeOpacity={1}
    >
    <Animated.Image 
        source={require('./assets/emoji/btn_sad.png')}
        style={{
            width:74, 
            height: 77, 
            padding: 20,
            transform: [
                {translateY: (pressButton)},
                ],
        }}
    />
    <Text style={{alignSelf: 'center', fontSize: 16}}>{sadTotal}</Text>
</TouchableOpacity>
)
}

export default SadButton