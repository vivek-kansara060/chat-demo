import React from 'react';
import { RouterProvider } from 'react-router';
import FrontRoutes from './routes/FrontRoutes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={FrontRoutes} />
    </div>
  );
}

export default App;
