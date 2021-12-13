import React from "react";

const ContactList = ({ name, number }) => {
  return (
    <li id="listItem">
      {name} {number}
    </li>
  );
};

export default ContactList;