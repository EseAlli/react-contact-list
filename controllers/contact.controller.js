const Contact = require('../models/contact.model');
const History = require('../models/history.model');
const mongoose = require('mongoose')

const create = async (req, res, next) =>{
    const {first_name, last_name, email, number} = req.body
    const contact = new Contact(req.body)
    try {
        const result = await contact.save()
        if (result){
            res.status(200).json({
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
        const aggregrations = [
           {
               $lookup:{
                   from: 'histories',
                   localField: '_id',
                   foreignField: 'contact_id',
                   as: 'history',
               }
           },
           {
               $project:{
                   created : 1,
                   first_name: 1,
                   last_name: 1,
                   updated: 1,
                   email: 1,
                   number: 1,
                   history:1
               }
           }
        ]
        const contact = await Contact.aggregate(aggregrations)
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
        const added = []
        const removed = []
        // const oldContact = await Contact.findOneAndUpdate(id, body, {new: false})
        for (const [key, value] of Object.entries(body)) {     
            const addedData = {
                [key] : value
            }
            added.push(addedData)
            const removedData = {
                [key] : contact[`${key}`]
            }
            removed.push(removedData)
        }
        const history = new History ( {
           contact_id : id,
           added,
           removed
        })
        const createdHistory = await history.save()
        if (createdHistory) {
            res.status(201).json({
                message: "Contact Updated Succesfully"
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
        const aggregrations = [
            {
                $match : {_id: mongoose.Types.ObjectId(id)}
            },
            {
                $lookup:{
                    from: 'histories',
                    localField: '_id',
                    foreignField: 'contact_id',
                    as: 'history'
                }
            },
            {
                $project:{
                    created : 1,
                    first_name: 1,
                    last_name: 1,
                    updated: 1,
                    email: 1,
                    number: 1,
                    history: '$history'
                }
            }
        ]
        const contact = await Contact.aggregate(aggregrations)
        if (contact){
            res.json(contact)
        }
        else{
            res.status(400).json({
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
            res.status(204).json({
                message: "Contact Deleted Succesfully"
            })
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