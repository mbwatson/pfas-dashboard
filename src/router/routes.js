import {
  DataObject as RawDataIcon,
  Home as HomeIcon,
  TableRows as TableIcon,
} from '@mui/icons-material'
import {
  HomeView,
  RawDataView,
  TableView,
} from '../views'

// this array is used to define both
// routes (for react-router)
export const routes = [
  {
    id: 'home', // just for uniqueness
    path: '/', // url
    hidden: false, // whether it has a menu item
    requiresAuth: false, // whether requires a logged-in user to access
    element: <HomeView />, // what to render--the page content component
  },
  {
    id: 'raw-data',
    path: '/raw',
    hidden: false,
    requiresAuth: true,
    element: <RawDataView />,
  },
  {
    id: 'table',
    path: '/table',
    hidden: false,
    requiresAuth: true,
    element: <TableView />,
  },
]

// here, we construct the main menu options
// and pair an icon with each route.
// `id` identifies the pairing.
export const menuItems = [
  { id: 'home',      label: 'Home', icon: <HomeIcon /> },
  { id: 'raw-data',  label: 'Raw Data', icon: <RawDataIcon /> },
  { id: 'table',     label: 'Table', icon: <TableIcon /> },
].reduce((acc, { id, icon, label }) => {
  const route = routes.find(r => r.id === id)
  if (!route) {
    return acc
  }
  acc.push({ ...route, icon, label })
  return acc
}, [])
