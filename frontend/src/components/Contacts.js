import React from "react";
import Moment from 'react-moment'
const Contacts = ({ contacts, deletePerson, showForm }) => {
  const isNewContact = false
  return (
    <>
      <table>
      <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
        {contacts.map((contact, id) => (            
          <tbody key={contact._id}>
              <tr>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.number}</td>
                <td>{contact.email}</td>
                <td>
                  <Moment format="YYYY/MM/DD">
                    {contact.created}
                  </Moment>
                </td>
                <td>
                  <Moment format="YYYY/MM/DD">
                    {contact.updated}
                  </Moment>
                </td>
                <td>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      <button onClick={()=>showForm(contact, isNewContact)}>Edit</button>
                      <button onClick={()=>deletePerson(contact.first_name, contact._id)}>Delete</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          
        ))}
      </table>
    </>
  );
};

export default Contacts;
