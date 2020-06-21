import React from 'react';
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import HappyAnimation, { animateHappy } from './HappyAnimation'



export function MultiHap() {
    const happyAnimations = useSelector(state => state.happyAnimations)
    return(
    happyAnimations.map(item => <HappyAnimation key={`${user}`}></HappyAnimation>)
    )
}