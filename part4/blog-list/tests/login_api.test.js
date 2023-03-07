const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('logging in', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
        const user = new User({username: helper.initialUser.username, passwordHash})
        await user.save()
    })

    test('logging in with right credentials return token', async () => {
        const response = await api
            .post('/api/login')
            .send({
                username: helper.initialUser.username,
                password: helper.initialUser.password
            })
            .expect(200)
        

        expect(response.body.token).toBeDefined()            
    })
})
