import { useSelector } from 'react-redux'

const Notification = () => {
    const notifications = useSelector(state => state.notification)
    
    return (
        <div>
            {notifications.map(notification =>
                <div key={notification.id} style={{
                    border: 'solid',
                    padding: 10,
                    borderWidth: 1,
                    marginBottom: '20px',
                    display: notification.show ? '' : 'none'}}>
                    {notification.content}
                </div>
            )}
        </div>
    )
}

export default Notification