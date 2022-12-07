import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import { getContact } from '../../redux/selector';
import { getFilter } from '../../redux/selector';
import { ListItem, Name, Number, DeleteButton } from './ContactsList.styled';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, id, number } = contact;
  return (
    <ListItem>
      <Name>{name}</Name>
      <Number>{number}</Number>

      <DeleteButton type="button" onClick={() => dispatch(deleteContact(id))}>
        Delete
      </DeleteButton>
    </ListItem>
  );
};
export const ContactsList = () => {
  const contacts = useSelector(getContact);
  const filterName = useSelector(getFilter);

  const isVisibleContacts = () => {
    if (!filterName) {
      return contacts;
    }
    const normalaizedFilter = filterName.toLowerCase();

    return contacts.filter(({ name }) => {
      const normalaizedName = name.toLowerCase();
      const result = normalaizedName.includes(normalaizedFilter);
      return result;
    });
  };
  const visibleContacts = isVisibleContacts();

  return (
    <ul>
      {visibleContacts &&
        visibleContacts.map(contact => (
          <ContactItem contact={contact} key={contact.id} />
        ))}
    </ul>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
