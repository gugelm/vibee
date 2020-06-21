import React, { useEffect, useState, Component } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, Image } from 'react-native'
import firebase from 'firebase'
import { Button } from 'react-native-elements'
import useStateWithCallback from 'use-state-with-callback'
import HappyAnimation, { animateHappy } from './HappyAnimation'
import SadAnimation, { animateSad } from './SadAnimation'
import AngryAnimation, { animateAngry } from './AngryAnimation'
import HappyButton from './HappyButton'
import SadButton from './SadButton'
import AngryButton from './AngryButton'
import Usercount from './Usercount'
import { MultiHap } from './MultiHap';

global.user = Math.floor(Math.random() * 999999)

// create an array
// every time happybutton is clicked, add to the array
// when the animation finishes for that element, destroy it in the array

export function Buttons() {

return (
	<View style={{ flex: 1, zIndex: 1, elevate: 1 }}>
	<View style={{flex:1, flexDirection: 'row'}}>
		<MultiHap />
		<SadAnimation />
		<AngryAnimation />
	</View>
	<Usercount />
	<View style={{flex: 1}}></View>
		<View style={{ flex: 1, flexDirection: 'row', zIndex: 1, elevate: 1, justifyContent: 'center'}}>
			<HappyButton />
			<renderText />
			<SadButton />
			<AngryButton />
		</View>
	</View>
	)
}

export default Buttons
