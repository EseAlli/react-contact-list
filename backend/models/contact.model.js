const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const validateEmailAdress = (email) =>{
  let regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}


const contactSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:{type: String, required : true},
  number: { type: String, required: true},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmailAdress, 'Please fill a valid email address'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  created : {type: Date, default: Date.now},
  updated:{type: Date},
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)