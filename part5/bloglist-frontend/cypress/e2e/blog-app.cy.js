describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/test/reset`)
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
        cy.visit('')
    })

    it('front page can be opened', function() {
        cy.contains('blogs')
    })

    it('login form is shown', function() {
        cy.contains('Log In').click()
    })

    it('user can log in', function() {
        cy.contains('Log In').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('Matti Luukkainen logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('Log In').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('a new blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('cypress.com')
            cy.contains('save').click()
            cy.contains('a new blog a blog created by cypress by cypress added')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    author: 'cypress',
                    title: 'cypress\' post',
                    url: 'url.com'
                })
            })

            it('a blog can be liked', function() {
                cy.contains('cypress')
                cy.contains('view').click()
                cy.contains('likes 0')
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('a blog created by the user can be deleted', function() {
                cy.contains('cypress')
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.contains('cypress').should('not.exist')
            })

            it('a user can\'t delete the blog of another user', function() {
                cy.contains('log out').click()
                const newUser = {
                    name: 'ibo ekmen',
                    username: 'ibo',
                    password: 'ekmen'
                }

                cy.request('POST', `${Cypress.env('BACKEND')}/users/`, newUser)
                cy.login({ username: 'ibo', password: 'ekmen' })
                cy.contains('cypress')
                cy.contains('view').click()
                cy.contains('remove').should('have.css', 'display', 'none')
            })

            it.only('blogs are in order of likes', function() {
                cy.createBlog({
                    author: 'cypress',
                    title: 'cypress\' 2nd post',
                    url: 'url.com',
                    likes: 1
                })

                cy.createBlog({
                    author: 'cypress',
                    title: 'cypress\' 3rd post',
                    url: 'url.com',
                    likes: 3
                })

                cy.get('.blog').eq(0).should('contain', 'cypress\' 3rd post')
                cy.get('.blog').eq(1).should('contain', 'cypress\' 2nd post')
                cy.get('.blog').eq(2).should('contain', 'cypress\' post')
            })
        })
    })
})

