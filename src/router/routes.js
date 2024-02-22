import {
  Dashboard as DashboardIcon,
  QueryStats as AnalysisIcon,
  Map as MapIcon,
  Info as AboutIcon,
  HeadsetMic as ContactIcon,
} from '@mui/icons-material'
import {
  AboutView,
  AnalysisView,
  ContactView,
  HomeView,
  MapView,
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
    id: 'analysis',
    path: '/analysis',
    requiresAuth: true,
    element: <AnalysisView />,
  },
  {
    id: 'map',
    path: '/map',
    requiresAuth: true,
    element:  <MapView />,
  },
  {
    id: 'about',
    path: '/about',
    requiresAuth: false,
    element: <AboutView />,
  },
  {
    id: 'contact',
    path: '/contact',
    requiresAuth: false,
    element: <ContactView />,
  },
]

// here, we construct the main menu options
// and pair an icon with each route.
// `id` identifies the pairing.
export const menuItems = [
  { id: 'home',      label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'analysis',  label: 'Analysis',  icon: <AnalysisIcon /> },
  { id: 'map',       label: 'Map',       icon: <MapIcon /> },
  { id: 'about',     label: 'About',     icon: <AboutIcon /> },
  { id: 'contact',   label: 'Contact',   icon: <ContactIcon /> },
].reduce((acc, { id, icon, label }) => {
  const route = routes.find(r => r.id === id)
  if (!route) {
    return acc
  }
  acc.push({ ...route, icon, label })
  return acc
}, [])
