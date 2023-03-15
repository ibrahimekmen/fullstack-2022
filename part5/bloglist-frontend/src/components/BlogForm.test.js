import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('<BlogForm />', () => {

    let container

    const createBlog = jest.fn()

    beforeEach(() => {
        container = render(
            <BlogForm createBlog={createBlog}/>
        ).container
    })

    test('blog form is rendered', () => {
        const element = container.querySelector('.blogForm')
        screen.debug(element)
        expect(element).toBeDefined()
        expect(element).toHaveTextContent('Create a new blog post')
    })

    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
        const user = userEvent.setup()
        const titleInput = container.querySelector('#title-input')
        const authorInput = container.querySelector('#author-input')
        const urlInput = container.querySelector('#url-input')
        const sendButton = screen.getByText('save')

        screen.debug(titleInput)

        await user.type(titleInput, 'title test input')
        await user.type(authorInput, 'author test input')
        await user.type(urlInput, 'url test input')
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('title test input')
        expect(createBlog.mock.calls[0][0].author).toBe('author test input')
        expect(createBlog.mock.calls[0][0].url).toBe('url test input')
    })
})