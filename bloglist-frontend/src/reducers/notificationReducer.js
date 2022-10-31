import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notify(state, action) {
            return action.payload
        }
    }
})

export const { notify } = notificationSlice.actions

let timeoutID = null


export const setNotification = (message, time) => { 
    if(timeoutID) clearTimeout(timeoutID)
    return dispatch => {        
        dispatch(notify(message))
        timeoutID = setTimeout(() => {
        dispatch(notify(''))
      }, time * 1000)
    } 
}

export default notificationSlice.reducer
