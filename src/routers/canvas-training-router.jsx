import { Navigate, createBrowserRouter } from 'react-router-dom';
import { CanvasTrainingLayout } from '../layouts/canvas-training-layout';
import { Home } from '../components/canvas-training/home.jsx';
import { DrawingShapes } from '../components/canvas-training/drawing-shapes.jsx';

export const reactCanvasRouter = createBrowserRouter([
  {
    element: <CanvasTrainingLayout />,
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '*', element: <Navigate to='/' /> },
      { path: 'drawing_shapes', element: <DrawingShapes /> },
    ],
  },
]);
