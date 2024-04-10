import {
  Dashboard as DashboardIcon,
} from '@mui/icons-material'
import {
  HomeView,
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
]

// here, we construct the main menu options
// and pair an icon with each route.
// `id` identifies the pairing.
export const menuItems = [
  { id: 'home',      label: 'Dashboard', icon: <DashboardIcon /> },
].reduce((acc, { id, icon, label }) => {
  const route = routes.find(r => r.id === id)
  if (!route) {
    return acc
  }
  acc.push({ ...route, icon, label })
  return acc
}, [])
