import { Component } from 'react';
import Contacts from './Contacts';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };
  handleAddContact = e => {
    e.preventDefault();
    let nameInput = e.target.form[0];
    let numberInput = e.target.form[1];
    if (!nameInput.value || !numberInput.value) {
      Notiflix.Notify.warning('Ooops... Nothing here');
      return;
    }
    let prevContacts = this.state.contacts;
    prevContacts.push(nameInput.value);
    console.log(prevContacts);
    let newContact = {
      name: nameInput.value,
      number: numberInput.value,
    };
    this.setState(prevState => {
      return {
        contacts: newContact,
        name: prevState.name,
      };
    });
    e.target.form.reset();
  };
  /*OnChange для інпутів - записувати value у стейти
   onClick для кнопки - записати об'єкт зі значеннями зі стейтів у стейт контакту
   Валідація????*/
  render() {
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <form action="submit" className="add-form">
          <label htmlFor="name" className="add-label">
            Name
          </label>
          <input type="text" name="name" required className="add-input" />
          <label htmlFor="number" className="add-label">
            Number
          </label>
          <input type="tel" name="number" required className="add-input" />
          <button className="add-btn" onClick={this.handleAddContact}>
            Add contact
          </button>
        </form>
        <section className="contacts-wrapper">
          <h1 className="title">Contacts</h1>
          <ul className="contacts-list">
            <Contacts namesArray={this.state.contacts}></Contacts>
          </ul>
        </section>
      </>
    );
  }
}
