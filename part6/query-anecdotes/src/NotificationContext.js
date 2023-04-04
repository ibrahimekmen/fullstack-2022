import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
    switch(action.type) {
        case "NEW_NOTIFICATION":
            return `you added ${action.content}`
        case "REMOVE_NOTIFICATION":
            return ''
        case 'VOTE_NOTIFICATION':
            return `you voted ${action.content}`
        case 'ERROR_NOTIFICATION':
            return `new anecdote must be 5 characters or longer`
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext