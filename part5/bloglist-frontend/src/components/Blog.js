import { useState } from 'react'
const Blog = ({ blog, user, likeBlog, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    let removeButtonVisible = false

    if(user.id === blog.user.id){
        removeButtonVisible = true
    }
    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleShow = () => {
        setVisible(!visible)
    }

    const likeBlogEvent = (event) => {
        event.preventDefault()
        likeBlog(blog)
    }

    const removeBlogEvent = (event) => {
        event.preventDefault()
        if(window.confirm(`Do you want to remmove the blog ${blog.title} by ${blog.author}?`)){
            removeBlog(blog)
        }
    }

    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div style={blogStyle} className='blogTest'>
            {blog.title} {blog.author} <button onClick={toggleShow}>{visible ? 'hide' : 'view'}</button>
            <div style={showWhenVisible} className='notShown'>
                {blog.url}
                <br/>
                likes {blog.likes} <button onClick={likeBlogEvent}>like</button>
                <br/>
                {user.name}
                <button style={{ display: removeButtonVisible ? '' : 'none' }} onClick={removeBlogEvent}>remove</button>
            </div>
        </div>
    )
}

export default Blog