import { useMemo } from 'react'
import { Sheet } from '@mui/joy'
import {
  TableRows as TableIcon,
  DonutSmall as ChartIcon,
} from '@mui/icons-material'
import { AuthMenu } from '@components/auth'
import { DataProvider, PreferencesProvider, useAuth } from '@context'
import { Header } from './components/layout'
import {
  ChartView,
  LoginView,
  TableView,
  NotFoundView,
} from './views'
import { PreferencesDrawer } from '@components/preferences'
import { Routes, Route } from 'react-router-dom'

//

const ClosedApp = () => (
  <Sheet component="main">
    <Routes>
      <Route path="*" element={ <LoginView /> } />
    </Routes>
  </Sheet>
)

const menuItems = [
  { id: 'table', path: '/',      label: 'Table', icon: <TableIcon /> },
  { id: 'chart', path: '/chart', label: 'Chart', icon: <ChartIcon /> },
]

const OpenApp = () => {
  const headerActions = useMemo(() => [
    <AuthMenu key="auth-action-button" />,
  ], [])

  const visibleMenuItems = useMemo(() => [
    ...menuItems.filter(r => !r.hidden)
  ], [])

  return (
    <PreferencesProvider>
      <Header
        menuLinks={ visibleMenuItems }
        actions={ headerActions }
      />
      
      <Sheet component="main">
        <DataProvider>
          <Routes>
            <Route index element={ <TableView /> } />
            <Route path="chart" element={ <ChartView /> } />
            <Route path="*" element={ <NotFoundView /> } />
          </Routes>
        </DataProvider>
      </Sheet>

      <PreferencesDrawer />
    </PreferencesProvider>
  )
}

//

export const App = () => {
  const auth = useAuth()

  if (!auth.user) {
    return <ClosedApp />
  }

  return <OpenApp />
}
