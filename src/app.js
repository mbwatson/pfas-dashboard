import { Sheet } from '@mui/joy'
import { Routes, Route } from 'react-router-dom'
import { DataProvider, useAuth } from '@context'
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

const OpenApp = () => {
  return (
    <DataProvider>      
      <Routes>
        <Route path="/dashboard/*" element={ <DashboardView /> } />
        <Route path="*" element={ <NotFoundView /> } />
      </Routes>
    </DataProvider>
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
