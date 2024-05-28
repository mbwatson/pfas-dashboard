import { Sheet } from '@mui/joy'
import { Routes, Route } from 'react-router-dom'
import { DataProvider, PreferencesProvider, useAuth } from '@context'
import {
  DashboardView,
  LoginView,
  NotFoundView,
} from './views'

//

const ClosedApp = () => (
  <Sheet component="main">
    <Routes>
      <Route path="*" element={ <LoginView /> } />
    </Routes>
  </Sheet>
)

//

export const App = () => {
  const auth = useAuth()

  if (!auth.user) {
    return <ClosedApp />
  }

  return <DashboardView />
}
