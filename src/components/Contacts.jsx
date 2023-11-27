import React from 'react';
import { nanoid } from 'nanoid';

const Contacts = namesArray => {
  console.log(namesArray.namesArray);
  return (
    <>
      {namesArray.namesArray.map(name => (
        <li id={nanoid()} key={nanoid()} className="contacts-item">
          <h2 className="contacts-item-title">{name}</h2>
        </li>
      ))}
    </>
  );
};

export default Contacts;
