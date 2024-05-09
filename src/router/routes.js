import {
  Dashboard as DashboardIcon,
  TableRows as TableIcon,
} from '@mui/icons-material'
import {
  DashboardView,
  LoginView,
  RawDataView,
  TableView,
} from '../views'

// this array is used to define routes for react-router.
export const routes = [
  {
    id: 'dashboard',
    path: '/',
    hidden: false,
    requiresAuth: true,
    element: <DashboardView />,
  },
  {
    id: 'login',
    path: '/login',
    hidden: false,
    requiresAuth: false,
    element: <LoginView />,
  },
  {
    id: 'table',
    path: '/table',
    hidden: false,
    requiresAuth: true,
    element: <TableView />,
  },
  {
    id: 'raw-data',
    path: '/raw',
    hidden: true, // route will exist, but user will have to visit `/#/raw` manually...
    requiresAuth: true, // ...provided they're logged in.
    element: <RawDataView />,
  },
]

// here, we construct the main menu options
// and pair an icon with each route.
// `id` identifies the pairing.
export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'table',     label: 'Table', icon: <TableIcon /> },
].reduce((acc, { id, icon, label }) => {
  const route = routes.find(r => r.id === id)
  if (!route) {
    return acc
  }
  acc.push({ ...route, icon, label })
  return acc
}, [])
