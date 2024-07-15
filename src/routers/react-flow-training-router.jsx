import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ReactFlowTrainingLayout } from '../layouts/react-flow-training-layout';
import { Home } from '../components/react-flow-training/home';

export const reactFlowTrainingRouter = createBrowserRouter([
  {
    element: <ReactFlowTrainingLayout />,
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
]);
