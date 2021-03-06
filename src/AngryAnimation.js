import React from 'react';
import { View, Animated, Easing, Dimensions, Image } from 'react-native'

let animatedValue = new Animated.Value(0)    

export let animateAngry = () => {
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

export function AngryAnimation() {

    let windowWidth = Dimensions.get('window').width
    let windowHeight = (Dimensions.get('window').height)
           
    const movingMargin = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (windowHeight/2.4)]
    })
    
    const movingXAngry = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    })

return (
    <Animated.Image
        source={require('./assets/angry.png')} 
        style={{
        transform: [
        {translateY: (movingMargin)},
        {translateX: (movingXAngry)}
        ],
        zIndex: 0,
        position: 'absolute',
        marginLeft: 175,
        marginTop: (windowHeight*.35),
        height: 14,
        width: 14,
        }} 
    />
)
}

export default AngryAnimation