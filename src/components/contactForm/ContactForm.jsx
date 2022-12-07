import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { fetchContacts, addContact } from '../../redux/operations';
import { getContact } from '../../redux/selector';
import { useEffect } from 'react';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContact);
  const dispatch = useDispatch();

  const nameId = nanoid(5);
  const numberId = nanoid(5);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const toggleInputValue = ({ currentTarget }) => {
    switch (currentTarget.name) {
      case 'name':
        setName(currentTarget.value);
        break;
      case 'number':
        setNumber(currentTarget.value);
        break;
      default:
        break;
    }
  };

  const addNewContact = ({ name, number }) => {
    const normalizedFind = name.toLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) {
      return alert(`${name} is already in contacts.`);
    }
    const findNumber = contacts.find(contact => contact.number === number);
    if (findNumber) {
      return alert(`This  number is already in use.`);
    }
    dispatch(addContact({ name, number }));
  };

  const handlerOnSubmit = event => {
    event.preventDefault();
    addNewContact({ name, number });

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handlerOnSubmit}>
      <Label>
        Name
        <Input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={toggleInputValue}
        />
      </Label>
      <Label>
        Number
        <Input
          id={numberId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={toggleInputValue}
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};
