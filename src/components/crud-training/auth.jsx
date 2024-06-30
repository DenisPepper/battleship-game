import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../../supabase/client';

export function Authentication() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const auth = localStorage.getItem('sb-vjschmwmhttjrxfcglgl-auth-token');
    if (auth) navigate('/');
  }, [navigate]);

  const onError = (error) => {
    setError(error.message ?? 'error on sign in!');
  };

  const onSuccess = (data) => {
    navigate('/');
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const authData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    signInWithEmail(onError, onSuccess, authData);
  };

  return (
    <form onSubmit={onSubmit}>
      <header>Вход в систему</header>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <label>
          Email
          <input type='email' name='email' />
        </label>
        <label>
          Password
          <input type='password' name='password' />
        </label>
        <button type='submit'>Sign in</button>
      </section>
      <section>{error && <span>{error}</span>}</section>
      <footer>
        
      </footer>
    </form>
  );
}
