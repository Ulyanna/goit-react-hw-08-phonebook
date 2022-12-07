import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selector';
import { filterContacts } from '../../redux/filterSlice';

import { Label, Input } from './Filter.styled';

export const Filter = () => {
  const filterName = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilter = evt => {
    const { value } = evt.currentTarget;
    dispatch(filterContacts(value));
  };

  return (
    <Label>
      Find contacts by name :
      <Input
        type="text"
        name="filter"
        required
        value={filterName}
        onChange={handleFilter}
      />
    </Label>
  );
};
