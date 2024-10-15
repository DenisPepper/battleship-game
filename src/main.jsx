import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { GameProvider } from './game/components/game-provider.jsx';

//import { RouterProvider } from 'react-router-dom';
//import { crudTrainingRouter } from './routers/crud-training-router';
//import { reactFlowTrainingRouter } from './routers/react-flow-training-router.jsx';
//import { reactCanvasRouter } from './routers/canvas-training-router.jsx';
//import { reactDivRouter } from './routers/div-router.jsx';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
    {/* <RouterProvider router={crudTrainingRouter} /> */}
  </React.StrictMode>
);
