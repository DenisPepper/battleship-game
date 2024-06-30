import { Navigate, createBrowserRouter } from 'react-router-dom';
import { CrudTrainingLayout } from '../layouts/crud-training-layout';
import { Home } from '../components/crud-training/home';
import { Create } from '../components/crud-training/create';
import { Read } from '../components/crud-training/read';
import { Delete } from '../components/crud-training/delete';
import { CarCard } from '../components/crud-training/car-card';
import { Authentication } from '../components/crud-training/auth';

export const crudTrainingRouter = createBrowserRouter([
  {
    element: <CrudTrainingLayout />,
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <Navigate to='/' /> },
      { path: 'create', element: <Create /> },
      { path: 'read', element: <Read /> },
      { path: 'auth', element: <Authentication /> },
      { path: 'delete', element: <Delete /> },
      { path: ':id', element: <CarCard /> },
    ],
  },
]);
