const Contact = require('../models/contact.model');
const History = require('../models/history.model');
const mongoose = require('mongoose')

const create = async (req, res, next) =>{
    const {first_name, last_name, email, number} = req.body
    const contact = new Contact(req.body)
    try {
        const result = await contact.save()
        if (result){
            res.status(201).json({
                message: 'Contact Created Succesfully!',
                data:{
                    first_name,
                    last_name,
                    email,
                    number
                }
            })
        }else{
            res.status(400).json({
                error: 'Could not create Contact' 
            })
        }
    } catch (error) {
        next(error)
    }
}

const list = async (req, res, next) =>{
    try {
        const contact = await Contact.find({})
        if (contact){
            res.json(contact)
        }else{
            res.status(400).json({
                error: "Could not get Contact"
            })
        }
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) =>{
    const {id} = req.params
    const body = req.body
    try {
      const contact = await Contact.findById(id)
      if(contact){
        const updatedContact = await Contact.findOneAndUpdate(id, body, {new: true})
        if (updatedContact) {
            res.status(201).json({
                message: "Contact Updated Succesfully",
                data: updatedContact
            })
        }
        else{
            res.status(400).json({
                error: "Could not update Contact"
            })
        }
      }
      else{
          res.status(404).json({
              error: "Contact does not exist"
          })
      }
    } catch (error) {
        next(error)
    }
}

const listById = async (req, res, next)=>{
    const {id} = req.params
    try {
        const contact = await Contact.findById(id)
        console.log(contact)
        if (contact){
            res.send(contact)
        }
        else{
            res.status(404).json({
                error: "Could not get Contact"
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteContact = async (req, res, next)=>{
    const {id} = req.params
    try {
        const deleted = await Contact.findByIdAndDelete(id)
        if (deleted){
            res.status(204)
        }
        else{
            res.status(400).json({
                error: "Could not Delete Contact"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    list,
    update,
    listById,
    deleteContact
}