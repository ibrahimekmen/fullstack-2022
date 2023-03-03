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
    
    let authorCount = {}
    blogs.forEach(blog => {
        if(authorCount[blog.author]){
            authorCount[blog.author]++
        }else{
            authorCount[blog.author] = 1
        }
    });
    
    const blogCounts = Object.values(authorCount) // 1,2,3
    const maxBlogCount = Math.max(...blogCounts) // 3
    const authors = Object.keys(authorCount) // chan, dijkstra, martin
    const maxAuthor = authors.filter(author => authorCount[author] === maxBlogCount)
    let result = Array(maxAuthor.length)
    maxAuthor.forEach((author,i) => {
        result[i] = {author: author, blogs: maxBlogCount}
    })
    
    return result
}

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

console.log(mostBlogs(blogs)) 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
  