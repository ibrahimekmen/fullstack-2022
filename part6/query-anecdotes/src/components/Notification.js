import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationMessage = useNotificationValue()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notificationMessage === '' ? 'none' : ''
  }
  

  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification
