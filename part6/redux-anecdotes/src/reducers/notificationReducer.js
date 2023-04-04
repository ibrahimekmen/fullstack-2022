import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        addNotification(state, action) {
            const newNotification = {
                content: action.payload.content,
                id: action.payload.id,
                show:true
            }
            return state.concat(newNotification)
        },
        removeNotification(state, action) {
            const id = action.payload.id
            const indexToRemove = state.map(notification => notification.id).indexOf(id)
            state.splice(indexToRemove, 1)
        }
    }
})
export const { addNotification, removeNotification } = notificationSlice.actions
export const setNotification = (payload, time) => {
    return async dispatch => {
        dispatch(addNotification(payload))
        setTimeout(() => {
            dispatch(removeNotification(payload.id))
        }, time*1000)
    }
   
}
export default notificationSlice.reducer