import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      await loginService
        .login({ username, password })
        .then((res) => {
          console.log(res)
          dispatch(setUser(res))
          blogService.setToken(res.token)
          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(res))
        })
        .catch((err) => console.log(err))
      // dispatch(setUser(newUser))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export default userSlice.reducer
