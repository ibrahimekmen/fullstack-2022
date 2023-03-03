const dummy = (blogs) => {
    return 1
}



const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return sum + item.likes
    }
    
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, current) => {
        return (current.likes >= max.likes ) ? current : max
    }

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    
    let authorBlogCount = {}
    blogs.forEach(blog => {
        if(authorBlogCount[blog.author]){
            authorBlogCount[blog.author]++
        }else{
            authorBlogCount[blog.author] = 1
        }
    })
    
    const blogCounts = Object.values(authorBlogCount) // 1,2,3
    const maxBlogCount = Math.max(...blogCounts) // 3
    const authors = Object.keys(authorBlogCount) // chan, dijkstra, martin
    const maxAuthors = authors.filter(author => authorBlogCount[author] === maxBlogCount)
    let result = Array(maxAuthors.length)
    maxAuthors.forEach((author,i) => {
        result[i] = {author: author, blogs: maxBlogCount}
    })
    
    return result
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    let authorLikeCount = {}
    blogs.forEach(blog => {
        if(authorLikeCount[blog.author]){
            authorLikeCount[blog.author] += blog.likes
        }else{
            authorLikeCount[blog.author] = blog.likes
        }
    })

    const likeCounts = Object.values(authorLikeCount)
    const maxLike = Math.max(...likeCounts)
    const authors = Object.keys(authorLikeCount)
    const maxAuthors = authors.filter(author => authorLikeCount[author] === maxLike)
    let result = Array(maxAuthors.length)
    maxAuthors.forEach((author, i)=> {
        result[i] = {author: author, likes: maxLike}
    })

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
  