import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createBlog = async newBlog => {
    const config = {
        headers : {
            Authorization: token
        }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const likeBlog = async (likedBlog) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    
    const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog, config)
    console.log('response data from put request inside blogservicejs', response.data)
    return response.data
}

const removeBlog = async (blogToRemove) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const response = await axios.delete(`${baseUrl}/${blogToRemove.id}`, config)
    return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, likeBlog, removeBlog, setToken }