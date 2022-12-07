import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/operations';

export const LogInForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleInputValue = ({ currentTarget }) => {
    switch (currentTarget.name) {
      case 'email':
        setEmail(currentTarget.value);
        break;
      case 'password':
        setPassword(currentTarget.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={toggleInputValue}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={toggleInputValue}
      />
      <button type="submit">Log In</button>
    </form>
  );
};
