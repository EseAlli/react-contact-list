const Contact = require('../models/contact.model')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('when there is initially some contact saved', () => {
  
    // beforeEach(async () => {
    //   await Contact.deleteMany({})
    //   await Contact.insertMany(helper.starterContact)
    // })
  
    // test('contact are returned as json', async () => {
    //   await api
    //     .get('/api/contact')
    //     .expect(200)
    //     .expect('Content-Type', /application\/json/)
    // })
  
    // test('all contact are returned', async () => {
    //   const response = await api.get('/api/contact')
  
    //   expect(response.body).toHaveLength(helper.starterContact.length)
    // })
  
    // test('a specific contact is within the returned contact', async () => {
    //   const response = await api.get('/api/contact')
  
    //   const contents = response.body.map(r => r.first_name)
    //   expect(contents).toContain(
    //     'Ese'
    //   )
    // })
  
    describe('viewing a specific contact', () => {
  
      test('succeeds with a valid id', async () => {
        const contactsAtStart = await helper.contactsInDatabase()
  
        const contactToView = contactsAtStart[0]
  
        const resultContact = await api
          .get(`/api/contact/${contactToView._id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        const processedContactToView = JSON.parse(JSON.stringify(contactToView))
        console.log(processedContactToView)
  
        expect(resultContact.body).toEqual(processedContactToView)
      })
  
    //   test('fails with statuscode 404 if contact does not exist', async () => {
    //     const validNonexistingId = await helper.nonExistingId()
  
    //     await api
    //       .get(`/api/contact/${validNonexistingId}`)
    //       .expect(404)
    //   })
  
    //   test('fails with statuscode 400 id is invalid', async () => {
    //     const invalidId = '5a3d5da59070081a82a3445'
  
    //     await api
    //       .get(`/api/contact/${invalidId}`)
    //       .expect(400)
    //   })
    })
  
    // describe('addition of a new contact', () => {
  
    //   test('succeeds with valid data', async () => {
    //     const newContact = {
    //       content: 'async/await simplifies making async calls',
    //       important: true,
    //     }
  
    //     await api
    //       .post('/api/contact')
    //       .send(newContact)
    //       .expect(200)
    //       .expect('Content-Type', /application\/json/)
  
  
    //     const contactsAtEnd = await helper.contactsInDatabase()
    //     expect(contactsAtEnd).toHaveLength(helper.starterContact.length + 1)
  
    //     const contents = contactsAtEnd.map(n => n.content)
    //     expect(contents).toContain(
    //       'async/await simplifies making async calls'
    //     )
    //   })
  
    //   test('fails with status code 400 if data invalid', async () => {
    //     const newContact = {
    //       important: true
    //     }
  
    //     await api
    //       .post('/api/contact')
    //       .send(newContact)
    //       .expect(400)
  
    //     const contactsAtEnd = await helper.contactsInDatabase()
  
    //     expect(contactsAtEnd).toHaveLength(helper.starterContact.length)
    //   })
    // })
  
    // describe('deletion of a contact', () => {
  
    //   test('succeeds with status code 204 if id is valid', async () => {
    //     const contactsAtStart = await helper.contactsInDatabase()
    //     console.log(contactsAtStart)
    //     const contactToDelete = contactsAtStart[0]
  
    //     await api
    //       .delete(`/api/contact/${contactToDelete.id}`)
    //       .expect(204)
  
    //     const contactsAtEnd = await helper.contactsInDatabase()
  
    //     expect(contactsAtEnd).toHaveLength(
    //       helper.starterContact.length - 1
    //     )
  
    //     const contents = contactsAtEnd.map(r => r.content)
  
    //     expect(contents).not.toContain(contactToDelete.content)
    //   })
    // })
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })