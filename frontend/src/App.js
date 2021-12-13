import React, { useState, useEffect } from "react";
import '../src/styles/app.css';
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import contactService from "./services/contacts"
import Notification from "./components/Notification"

const App = () => {
  const intialState ={
    first_name: "",
    last_name: "",
    number: "",
    email: ""
  }
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState(intialState)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [show, setShow] = useState(false)
  const [isNewContact, setIsNewContact] = useState(true)

  const hook = () => {
    contactService
    .getAll()
    .then( intialContacts =>{
      setContacts(intialContacts)
    })
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = contacts.find(p => p._id === newContact._id)
    if (person){
      const {_id, first_name, last_name, number, email} = newContact
      const updatedContact = {
         first_name,
         last_name,
         number,
         email
      }
      if(!isNewContact){
        contactService
        .update(_id, updatedContact )
        .then(updatePerson =>{
          hook()
          setSuccessMessage(`Updated ${first_name}`)
          showForm()
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)
        })
      }
      else if (window.confirm(`A person with ${email} is already exists, update ${first_name}'s with a new info?`)){
        contactService
        .update(_id, updatedContact )
        .then(updatePerson =>{
          hook()
          setSuccessMessage(`Updated ${first_name}`)
          showForm()
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)

        })
      }
    }
    else{
      contactService
      .create(newContact)
      .then(newPerson=>{
        setContacts(contacts.concat(newPerson));
        setSuccessMessage(`Added ${newContact.first_name} ${newContact.last_name}`)
        showForm()
        hook()
        setTimeout(()=>{
            setSuccessMessage(null)
        }, 5000)
      })
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };


  const showForm = (contact, isNewContact) =>{
      setShow(!show)
      if (contact){
        setNewContact(contact)
        setIsNewContact(isNewContact)
      }
  }

  const deleteUser = (name,id) =>{
    if (window.confirm(`Delete ${name} ?`)){
      contactService
      .deleteOne(id)
      .then(()=>{
        console.log(contacts.filter(person => person._id !== id))
        setContacts(contacts.filter(person => person._id !== id))
        setSuccessMessage(`Deleted ${newContact.first_name} ${newContact.last_name}`)
      })
      .catch(error=>{
        setErrorMessage(`Information of ${name} has already been removed from the server`)
        setTimeout(()=>{
            setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div className="contact-page">
      <h2>Contacts</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <button className="add-new" onClick={showForm}>add new</button>
      {show ? <ContactForm
        addPerson={addPerson}
        handleChange={handleChange}
        newContact={newContact}
        showForm={showForm} 
      />: ''}
      <Contacts 
      contacts={contacts} 
      showForm={showForm} 
      deletePerson={deleteUser}/>
    </div>
  );
};

export default App;
