import { Outlet, ScrollRestoration } from 'react-router-dom';

export function DivLayout() {
  return (
    <>
      <h1>Divider, implemented on block elements</h1>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
