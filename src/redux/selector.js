export const getContact = state => state.contacts.items;
export const getFilter = state => state.filter.filter;
export const getState = ({ contacts }) => ({
  isLoading: contacts.isLoading,
  error: contacts.error,
});
