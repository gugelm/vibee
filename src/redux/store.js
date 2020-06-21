import {createStore, applyMiddleware, combineReducers} from 'redux'
import { updatePrediction } from './actions'

let predictionDataUpdate = []

let happyAnimations = [
  {
  "happyAnimations": 1,
  }, 
  ]

function predictionStore(state=happyAnimations, action) {
	switch(action.type) {
		case "ADD_PREDICTION":
      return happyAnimations = [...happyAnimations, ...action.payload]
    case "DELETE_PREDICTION":
      return happyAnimations = happyAnimations.filter(a => a.happyAnimations !== action.payload.happyAnimations)
		default:
			return state
	}
}


export const reducer = combineReducers({
  happyAnimations: predictionStore,
})

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())