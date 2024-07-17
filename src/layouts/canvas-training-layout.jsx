import { Link, Outlet, ScrollRestoration } from 'react-router-dom';

export function CanvasTrainingLayout() {
  return (
    <>
      <h1>Проба Canvas API. Reproduction 3Cad Dragger UI/API.</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link style={{ fontSize: '24px' }} to='/'>
            🏠
          </Link>
          <Link to='drawing_shapes'>Drawing shapes with canvas</Link>
        </ul>
      </nav>
      <ScrollRestoration />
      <Outlet />
      <ul>
        <li>Длина и ширина canvas должны быть пропорциональны размеру шкафа</li>
        <li>
          <a
            href='https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial'
            target='_blank'
          >
            Руководство MDN по Canvas API
          </a>
        </li>
        <li>
          Сменить базовый угол отсчета координат с левого верхнего на левый
          нижний
        </li>
      </ul>
    </>
  );
}
