import {
  DataObject as RawDataIcon,
  Home as HomeIcon,
  TableRows as TableIcon,
} from '@mui/icons-material'
import {
  HomeView,
  RawDataView,
  // TableView,
} from '../views'

// this array is used to define both
// routes (for react-router)
export const routes = [
  {
    id: 'home',
    path: '/',
    requiresAuth: false,
    element: <HomeView />,
  },
  {
    id: 'raw-data',
    path: '/data',
    requiresAuth: true,
    element: <RawDataView />,
  },
  // {
  //   id: 'table',
  //   path: '/table',
  //   requiresAuth: true,
  //   element: <TableView />,
  // },
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
