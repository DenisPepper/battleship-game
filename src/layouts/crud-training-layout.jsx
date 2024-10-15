import { useState } from 'react';
import { Link, Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { signOut } from '../supabase/client';
import './crud-training-layout.scss'

export function CrudTrainingLayout() {
  const { state } = useNavigation();
  const [error, setError] = useState('');

  const onError = (error) => {
    if (error) {
      setError(error.message ?? 'error on sigb out');
      return;
    }

    alert('you logged out');
  };

  const handleSignOut = () => {
    signOut(onError);
  };

  return (
    <>
      <h1>Тренировка crud-операций на supabase</h1>
      {error && <span>{error}</span>}
      <nav style={{ display: 'flex', gap: '20px' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li>
            <Link style={{ fontSize: '24px' }} to='/'>
              🏠
            </Link>
          </li>
          <li className='nav-link--favorite'>
            <Link to='/battle-field'>battle-field</Link>
          </li>
          <li>
            <Link to='/auth'>auth</Link>
          </li>
          <li>
            <Link to='/signup'>signup</Link>
          </li>
          <li>
            <Link to='/create'>create</Link>
          </li>
          <li>
            <Link to='/read'>read</Link>
          </li>
          <li>
            <Link to='/delete'>delete</Link>
          </li>
        </ul>
        <button type='button' onClick={handleSignOut}>
          Sign out
        </button>
      </nav>
      <ScrollRestoration />
      <div>{state === 'loading' ? <div>Loading...</div> : <Outlet />}</div>
    </>
  );
}
