import { useState } from 'react';
import { signUpNewUser } from '../../supabase/client';

export function Signup() {
  const [error, setError] = useState('');

  const onError = (error) => {
    setError(error.message ?? 'error on sign in!');
  };

  const onSuccess = (data) => {
    if (data) alert('please, check your email address');
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    signUpNewUser(onError, onSuccess, userData);
  };

  return (
    <form onSubmit={onSubmit}>
      <header>Вход в систему</header>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <label>
          Email
          <input type='email' name='email' autoComplete='on' />
        </label>
        <label>
          Password
          <input type='password' name='password' autoComplete='on' />
        </label>
        <button type='submit'>Sign in</button>
      </section>
      <section>{error && <span>{error}</span>}</section>
      <footer></footer>
    </form>
  );
}
