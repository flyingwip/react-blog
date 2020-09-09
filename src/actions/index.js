import jsonPlacholder from '../apis/jsonPlaceholder'
import * as R from 'ramda'
// import memoizeWith from 'ramda/src/memoizeWith'
// import identity from 'ramda/src/identity'

// export const fetchPosts = async () => {
//   // Bad approach because we are breaking the rules of Redux!!!
//   // it is because the async/await syntax
//   // the transpiled code does NOT return an object with a type property
//   // go check at babel.io
//   // see https://www.udemy.com/course/react-redux/learn/lecture/12586864#overview
//   const response = await jsonPlacholder.get('/posts')

//   return {
//     type: 'FETCH_POSTS',
//     payload: response,
//   }
// }

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  const userIds = R.compose(
    R.forEach((id) => dispatch(fetchUser(id))),
    R.uniq,
    R.map((item) => item.userId)
  )(getState().posts)
}

// with thunk the async await syntax is possible
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlacholder.get('/posts')
  dispatch({ type: 'FETCH_POSTS', payload: response.data })
}

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlacholder.get(`/users/${id}`)
  dispatch({ type: 'FETCH_USER', payload: response.data })
}

// with memoization!!
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch)
// const _fetchUser = R.memoizeWith(R.identity, async (id, dispatch) => {
//   const response = await jsonPlacholder.get(`/users/${id}`)
//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })

// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch)
// const _fetchUser = memoizeWith(identity, async (id, dispatch) => {
//   const response = await jsonPlacholder.get(`/users/${id}`)
//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })
