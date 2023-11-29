import { Component } from 'react';
import ContactList from './ContactList';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  getContactsNames = () => {
    const namesArray = this.state.contacts.map(contact => contact.name);
    return namesArray;
  };

  handleAddContact = e => {
    e.preventDefault();
    let nameInput = e.target.form[0];
    let numberInput = e.target.form[1];
    if (!nameInput.value || !numberInput.value) {
      Notiflix.Notify.warning('Ooops... Something missed', {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    if (this.getContactsNames().includes(nameInput.value)) {
      Notiflix.Notify.warning(`${nameInput.value} is already in contacts`, {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    this.setState(prev => {
      return {
        contacts: [
          ...prev.contacts,
          { name: this.state.name, number: this.state.number, id: nanoid() },
        ],
      };
    });
    e.target.form.reset();
  };

  handleDelete = e => {
    if (e.target.className === 'delete-btn') {
      const contactIdToDelete = e.currentTarget.id;
      this.setState(prev => ({
        contacts: prev.contacts.filter(el => el.id !== contactIdToDelete),
      }));
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm
          handleAddContact={this.handleAddContact}
          handleChange={this.handleChange}
        />

        <section className="contacts-wrapper">
          <h1 className="title">Contacts</h1>
          <Filter handleChange={this.handleChange} />
          <ContactList
            contactsArray={this.getVisibleContacts()}
            handleDelete={this.handleDelete}
          />
        </section>
      </>
    );
  }
}
