import React from "react";
import "../styles/form.css"

const ContactForm = ({
  addPerson,
  handleChange,
  newContact,
  showForm
}) => {
  const {first_name, last_name, number, email} = newContact
  return (
    <>
      <form className="modal" onSubmit={addPerson}>
        <div className="modal-content">
            <div className="modal-container">
            <span onClick={showForm} className="close-modal">&times;</span>
              <div>
                First Name: <input name="first_name" value={first_name} onChange={handleChange} required/>
              </div>
              <div>
                Last Name: <input name="last_name" value={last_name} onChange={handleChange} required/>
              </div>
              <div>
                Email: <input name="email" value={email} onChange={handleChange} type="email" required/>
              </div>
              <div>
                Number: <input name="number" value={number} onChange={handleChange} required/>
              </div>
              <div>
                <button className="submit-form" type="submit">add</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
