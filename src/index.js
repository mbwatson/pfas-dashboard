import { App } from './app'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import { Auth0Provider } from '@auth0/auth0-react'
import {
  AppContextProvider,
  AuthProvider,
  DataProvider,
} from '@context'
import theme from './theme'
import './index.css'
import '@fontsource/inter'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <Auth0Provider
    domain="renci.auth0.com"
    clientId="wVibbe3STC4m6mh7EDL9Bk6aXLEljmFR"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <CssVarsProvider theme={ theme } defaultMode="light">
      <HashRouter>
        <AuthProvider>
          <AppContextProvider>
            <DataProvider>
              <App />
            </DataProvider>
          </AppContextProvider>
        </AuthProvider>
      </HashRouter>
    </CssVarsProvider>
  </Auth0Provider>
)

root.render(<ProvisionedApp />)
