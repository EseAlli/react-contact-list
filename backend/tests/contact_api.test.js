const Contact = require('../models/contact.model')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


describe('when there is initially some contact saved', () => {
  
    test('contact are returned as json', async () => {
      await api
        .get('/api/contact')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('all contact are returned', async () => {
      const response = await api.get('/api/contact')
      const contactsAtStart = await helper.contactsInDatabase()
  
      expect(response.body).toHaveLength(contactsAtStart.length)
    })
  
    test('a specific contact is within the returned contact', async () => {
      const response = await api.get('/api/contact')
  
      const contents = response.body.map(r => r.first_name)
      expect(contents).toContain(
        'Jane'
      )
    })
  
    describe('viewing a specific contact', () => {
  
      test('succeeds with a valid id', async () => {
        const contactsAtStart = await helper.contactsInDatabase()
  
        const contactToView = contactsAtStart[0]
  
        const resultContact = await api
          .get(`/api/contact/${contactToView._id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        const processedContactToView = JSON.parse(JSON.stringify(contactToView))
  
        expect(resultContact.body).toEqual(processedContactToView)
      })
  
      test('fails with statuscode 404 if contact does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()
  
        await api
          .get(`/api/contact/${validNonexistingId}`)
          .expect(404)
      })
  
      test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
  
        await api
          .get(`/api/contact/${invalidId}`)
          .expect(400)
      })
    })
  
    describe('addition of a new contact', () => {
  
      test('succeeds with valid data', async () => {
        const newContact = {
          first_name: "Jane",
          last_name: "Doe",
          number: "0808036579823",
          email: "janedoe1994@gmail.com",
          created: new Date(),
        }
  
        await api
          .post('/api/contact')
          .send(newContact)
          .expect(201)
          .expect('Content-Type', /application\/json/)
  
  
        const contactsAtEnd = await helper.contactsInDatabase()
        const email = contactsAtEnd.map(n => n.email)
        expect(email).toContain(
          'janedoe1994@gmail.com'
        )
      })
  
      test('fails with status code 400 if data invalid', async () => {
        const newContact = {
          first_name: "John"
        }
  
        await api
          .post('/api/contact')
          .send(newContact)
          .expect(400)
      })
    })
})
  
  afterAll(() => {
    mongoose.connection.close()
  })