import { Outlet, ScrollRestoration } from 'react-router-dom';

export function CanvasTrainingLayout() {
  return (
    <>
      <h1>Проба Canvas API</h1>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
