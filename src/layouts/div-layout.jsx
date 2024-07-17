import { Outlet, ScrollRestoration } from 'react-router-dom';

export function DivLayout() {
  return (
    <>
      <h1>Dragger на обычных компонентах</h1>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
