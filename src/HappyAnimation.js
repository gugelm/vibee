import React from 'react';
import { View, Animated, Easing, Dimensions, Image, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

let animatedValue = new Animated.Value(0)  

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

export function HappyAnimation() {
    
    const happyAnimations = useSelector(state => state.happyAnimations)
    const [ happyCounter, happyCounterEdit ] = React.useState(0)

    let windowWidth = Dimensions.get('window').width
    let windowHeight = (Dimensions.get('window').height)
        
    const movingMargin = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (windowHeight/2.4)]
    })

    const movingXHappy = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -90]
    })

return (
    happyAnimations.map(item => <Animated.Image 
        source={require('./assets/happy.png')}
        key={Math.floor(Math.random() * 99999999).toString(10)}
        style={{
		transform: [
		{translateY: (movingMargin)},
		{translateX: (movingXHappy)}
		],
		zIndex: 0,
        // change this back to absolute later
        position: 'relative',
        marginLeft: 144,
		marginTop: (windowHeight*.35),    
		height: 14,
		width: 14,}} 
        >    
    </Animated.Image>)
)
}

export default HappyAnimation