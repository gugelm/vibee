import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'
import AngryAnimation, { animateAngry } from './AngryAnimation'
import { Audio } from 'expo-av'

let animatedValue = new Animated.Value(0)    

export let animateAngryPress = () => {
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

export function AngryButton() {

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

const [angry, editAngry] = useStateWithCallback(0, angry => {
    {firebase.database().ref(`vibee/room/angry/${user}`).update({ angry })}
    console.log('angry callback!')
    animateAngry()
    })

const [ angryTotal, angryTotalEdit ] = React.useState(0)

useEffect(() => {
        firebase.database().ref(`/vibee/room/angry`)
        .on("value", function(snapshot) {
        let room = snapshot.val()
        let angryUser = 0
        Object.keys(room).forEach(key => {
            angryUser += room[key].angry
        })
        angryTotalEdit(angryTotal + angryUser)
        }, 
        function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        })
    },[])

return (
<TouchableOpacity
    onPress={() => {
        editAngry(angry + 1)
        animateAngryPress()
        playSound()
        }}
    style={{padding:20}}
    activeOpacity={1}
    >
    <Animated.Image 
        source={require('./assets/emoji/btn_angry.png')}
        style={{
            width:74, 
            height: 77, 
            padding: 20,
            transform: [
                {translateY: (pressButton)},
                ],
        }}
    />
    <Text style={{alignSelf: 'center', fontSize: 16}}>{angryTotal}</Text>
</TouchableOpacity>
)
}

export default AngryButton