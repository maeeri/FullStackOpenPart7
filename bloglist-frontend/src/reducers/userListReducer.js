import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload
    }
  },
})

export const { setUserList } = userListSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
      const users = await userService.getAll()
    dispatch(setUserList(users))
  }
}

export default userListSlice.reducer
