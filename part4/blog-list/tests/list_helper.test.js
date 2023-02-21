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