const Contact = require('../models/contact.model')


const nonExistingId = async () => {
  const contact = new Contact({ first_name: 'Fake', last_name:"Name", number: "0808089736829", email:"fakeemail@gmail.com", created: new Date() })
  await contact.save()
  await contact.remove()

  return contact._id.toString()
}

const contactsInDatabase = async () => {
  const contacts = await Contact.find({})
  return contacts.map(contact => contact.toJSON())
}

module.exports = {
  starterContact,
  nonExistingId,
  contactsInDatabase,
}
