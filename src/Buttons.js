import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'
import HappyAnimation from './HappyAnimation'
import SadAnimation, { animateSad } from './SadAnimation'
import AngryAnimation, { animateAngry } from './AngryAnimation'
import HappyButton from './HappyButton'
import SadButton from './SadButton'
import AngryButton from './AngryButton'
import Usercount from './Usercount'
import { useDispatch } from 'react-redux'


global.user = Math.floor(Math.random() * 999999)
let animatedValue = new Animated.Value(0)    

// create an array
// every time happybutton is clicked, add to the array
// when the animation finishes for that element, destroy it in the array

export function animateHappy() {
	animatedValue.setValue(0)
    Animated.timing(
        animatedValue,
        {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear
        }
    )
    .start()
}

export function Buttons() {
	
return (
	<View style={{ flex: 1, zIndex: 1, elevate: 1 }}>
	<View style={{flex:1, flexDirection: 'row'}}>
		<HappyAnimation />
		<SadAnimation />
		<AngryAnimation />
	</View>
	<Usercount />
	<View style={{flex: 1}}></View>
		<View style={{ flex: 1, flexDirection: 'row', zIndex: 1, elevate: 1, justifyContent: 'center'}}>
			<HappyButton />
			<SadButton />
			<AngryButton />
		</View>
	</View>
	)
}

export default Buttons
