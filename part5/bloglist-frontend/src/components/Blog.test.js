import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
    let container
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'component author',
        url: 'example.com',
        likes: 0,
        user: {
            id: 1234
        }
    }

    const userObject = {
        name: 'adder name',
        id: 1234
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerRemove = jest.fn()

    beforeEach(() => {
        container = render(
            <Blog blog={blog} user={userObject} likeBlog={mockHandlerLike} removeBlog={mockHandlerRemove}/>
        ).container
    })

    test('renders content', () => {
        const element = container.querySelector('.blogTest')
        expect(element).toBeDefined()
        expect(element).toHaveTextContent('Component testing is done with react-testing-library')
    })

    test('url and likes are not rendered by default', () => {
        const element = container.querySelector('.notShown')
        screen.debug(element)
        expect(element).toHaveStyle('display: none')
    })

    test('after clicking the button, url and likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.notShown')
        expect(div).not.toHaveStyle('display: none')
    })

    test('like button works', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('view')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandlerLike).toBeCalledTimes(2)
    })
})


