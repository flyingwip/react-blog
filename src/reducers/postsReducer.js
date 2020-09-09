// import * as R from 'ramda'

// rules of reducers

// 1. Must return any value besided 'undefined'
// 2. Produces 'state', or data to be inside of your app using only previous state and action
// In other words state as a parameter is v1, return state is v2
// 3. No side-effects. Reducers are pure.
// 4. Must not mutate its input 'state' argument
// Note point 4 does not throw an error.
// However updates will not be show because Redux will do a object comparison (by reference)
// and will not show the updates

// How to update state in reducers
// array
// removing : state.filter( element => element !== 'hi' )
// adding : [...state, 'hi'] or ['hi',...state]
// replacing: state.map( el => === 'hi' ? 'bye':el )

// object
// removing : {...state, age:undefined}
// let newObj = R.dissoc('age',state)

// adding {...state, age: 30}
// updating {...state, name:'Sam'}

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload
    default:
      return state
  }
}
