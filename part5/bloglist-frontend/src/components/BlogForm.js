import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const onSubmit = async (event) => {
        event.preventDefault()
        createBlog({author,url,title})
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return (
        <div>
            <h2>Create a new blog post</h2>
            <form onSubmit={onSubmit}>
            <div>
                title
                <input type="text" value={title} name="Title" onChange={event => setTitle(event.target.value)} />
            </div>
            <div>
                author
                <input type="text" value={author} name="Author" onChange={event => setAuthor(event.target.value)} />
            </div>
            <div>
                url
                <input type="text" value={url} name="Url" onChange={event => setUrl(event.target.value)} />
            </div>
                    <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm