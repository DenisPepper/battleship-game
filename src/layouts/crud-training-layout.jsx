import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from 'react-router-dom';

export function CrudTrainingLayout() {
  const { state } = useNavigation();

  return (
    <>
      <h1>Тренировка crud-операций на supabase</h1>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
          <li>
            <Link to='/'>🏠</Link>
          </li>
          <li>
            <Link to='/create'>create</Link>
          </li>
          <li>
            <Link to='/read'>read</Link>
          </li>
          <li>
            <Link to='/update'>update</Link>
          </li>
          <li>
            <Link to='/delete'>delete</Link>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      <div>{state === 'loading' ? <div>Loading...</div> : <Outlet />}</div>
    </>
  );
}
