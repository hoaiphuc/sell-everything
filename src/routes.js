import { Navigate, useRoutes} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

import ProtectedRoutes from './pages/ProtectedRoutes';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        // Wrap the children of the DashboardLayout with ProtectedRoutes
        { 
          path: 'app', 
          element: <ProtectedRoutes><DashboardAppPage /></ProtectedRoutes> 
        },
        { 
          path: 'user', 
          element: <ProtectedRoutes><UserPage /></ProtectedRoutes> 
        },
        { 
          path: 'products', 
          element: <ProtectedRoutes><ProductsPage /></ProtectedRoutes> 
        },
        { 
          path: 'blog', 
          element: <ProtectedRoutes><BlogPage /></ProtectedRoutes> 
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    
  ]);

  return routes;
}
