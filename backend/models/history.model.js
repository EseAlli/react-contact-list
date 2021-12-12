const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  contact_id : {type: mongoose.Schema.Types.ObjectId,
    ref: "Contact"},
  added: [{type : Object}],
  removed: [{type: Object}],
  created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('History', historySchema)