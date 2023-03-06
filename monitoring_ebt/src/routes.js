import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import DownloadPage from './pages/DownloadPage';
import DataAll from './pages/DataAll';
import Efisiensi from './pages/Efisiensi';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard-EBT-DTNTF/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard-EBT-DTNTF/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'data', element: <DataAll/> },
        { path: 'efisiensi', element: <Efisiensi/> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard-EBT-DTNTF/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'download',
      element: <DownloadPage />,
    },
  ]);

  return routes;
}
