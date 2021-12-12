const express = require('express');
const {create, list, update, listById, deleteContact} = require('../controllers/contact.controller')
const router = express.Router()

router
.route('/')
.post(create)
.get(list)

router
.route('/:id')
.put(update)
.get(listById)
.delete(deleteContact)

module.exports = router;