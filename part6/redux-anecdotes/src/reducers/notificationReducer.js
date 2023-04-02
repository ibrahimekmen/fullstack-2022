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
            state.push(newNotification)
        },
        removeNotification(state, action) {
            const id = action.payload.id
            const indexToRemove = state.map(notification => notification.id).indexOf(id)
            state.splice(indexToRemove, 1)
        }
    }
})
export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer