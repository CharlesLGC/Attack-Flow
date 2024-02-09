import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './components/home';
import NotFound from './components/NotFound';
import './index.css';
import Create from './components/create';
import BackEndTest from './components/BackEndTest';
import Library from './components/Library';
import CreateProject from './components/CreateProject';
import Dashboard from './components/Dashboard';
import Graph from './components/graph';
import ApprovalRequests from './components/approvalrequests';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/library',
    element: <Library />,
  },
  {
    path: '/backTest',
    element: <BackEndTest />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/projects',
    element: <CreateProject />,
  },
  {
    path: '/approval-requests',
    element: <ApprovalRequests />,
  },
  {
    path: '/projects/:id',
    element: <Create />,
  },
  {
    path: '/graph/:id',
    element: <Graph />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_APP_CLIENT}/backTest`,
        audience: import.meta.env.VITE_APP_AUTH_AUDIENCE,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
);
