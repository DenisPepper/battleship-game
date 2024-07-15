import { Link, Outlet, ScrollRestoration } from 'react-router-dom';

export function ReactFlowTrainingLayout() {
  return (
    <>
      <h1>Проба React Flow</h1>
      <Nav />
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '20px' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li>
          <Link style={{ fontSize: '24px' }} to='/'>
            🏠
          </Link>
        </li>
      </ul>
    </nav>
  );
}
