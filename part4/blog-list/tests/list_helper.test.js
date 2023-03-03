const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('totalLikes', () => {
    test('empty list 0', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has 1 item the sum is the likes of that', () => {
        expect(listHelper.totalLikes([{"likes": 3}])).toBe(3)
    })

    test('bigger list is calculated right', () => {
        expect(listHelper.totalLikes([{"likes": 3} , {"likes" : 4}, {"likes" : 10}])).toBe(17)
    })
})

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

const blogsWithTwoMaxAuthors = [
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
      likes: 17,
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

describe('favoriteBlog', () => {
        
    test('empty list', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })

    test('when list has one item that items likes is the expected result', () => {
        expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0])
    })

    test('bigger list is calculated right', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
    })
})

describe('mostBlogs', () => { 
    test('empty list', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })

    test('when list has one item its author is the answer', () => {
        expect(listHelper.mostBlogs([blogs[0]])).toEqual([{author: blogs[0].author, blogs: 1}])
    })

    test('when list has one author with most blogs it returns that author with the number of blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual([{ author: 'Robert C. Martin', blogs: 3 }])
    })

    test('when list has more than one author with most blogs it returns multiple authors with the same number of blogs' , () => {
        expect(listHelper.mostBlogs(blogsWithTwoMaxAuthors)).toEqual([{ author: 'Edsger W. Dijkstra', blogs: 3 },{ author: 'Robert C. Martin', blogs: 3 }])
    })
})

describe('mostLikes', () => { 
    test('empty list', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })

    test('when list has one item its author is the answer', () => {
        expect(listHelper.mostLikes([blogs[0]])).toEqual([{author: blogs[0].author, likes: 7}])
    })

    test('when list has one author with most likes it returns that author with the number of blogs', () => {
        expect(listHelper.mostLikes(blogs)).toEqual([{ author: 'Edsger W. Dijkstra', likes: 17 }])
    })

    test('when list has more than one author with most likes it returns multiple authors with the same number of likes' , () => {
        expect(listHelper.mostLikes(blogsWithTwoMaxAuthors)).toEqual([{ author: 'Edsger W. Dijkstra', likes: 29 },{ author: 'Robert C. Martin', likes: 29 }])
    })
})