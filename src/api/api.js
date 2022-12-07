import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const getContacts = async () => {
  const { data } = await instance.get('/contacts');
  return data;
};

export const addContact = async data => {
  const { data: result } = await instance.post('/contacts', data);

  return result;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/contacts/${id}`);

  return data;
};

export const register = async credentials => {
  const newUser = { ...credentials };
  const { data } = await instance.post(`/users/signup`, newUser);
  return data;
};

export const logIn = async credentials => {
  const user = { ...credentials };
  const { data } = await instance.post(`/users/login`, user);
  return data;
};

export const logOut = async () => {
  const { data } = await instance.post(`/users/logout`);
  return data;
};
