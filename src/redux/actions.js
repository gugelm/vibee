import { store } from '../redux/store'
import { useDispatch } from 'react-redux'

// action types
export const ADD_PREDICTION = 'ADD_PREDICTION'

// action creators
export let addPrediction = (happyAnimations) =>
  ({
    type: ADD_PREDICTION,
    payload: [{
      happyAnimations: happyAnimations,
    }]
  })

  export let deletePrediction = (happyAnimations) =>
 ({
    type: DELETE_PREDICTION,
    payload: {
      happyAnimations: happyAnimations,
    }
  })