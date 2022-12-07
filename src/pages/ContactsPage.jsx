import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/operations';
import { ContactForm } from '../components/contactForm/ContactForm';
import { ContactsList } from '../components/contactsList/ContactsList';
import { Filter } from '../components/filter/Filter';

export default function Tasks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <Filter />
      <ContactsList />
    </div>
  );
}
