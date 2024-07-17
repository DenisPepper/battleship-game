import { Navigate, createBrowserRouter } from 'react-router-dom';
import { DivLayout } from '../layouts/div-layout';
import { Dragger } from '../components/div/dragger/dragger.jsx';

export const reactDivRouter = createBrowserRouter([
  {
    element: <DivLayout />,
    path: '/',
    children: [
      { index: true, element: <Dragger /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
]);
