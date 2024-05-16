import { App } from './app'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import {
  AuthProvider,
  PreferencesProvider,
} from '@context'
import './index.css'
import '@fontsource/inter'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <HashRouter>
    <AuthProvider>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </AuthProvider>
  </HashRouter>
)

root.render(<ProvisionedApp />)
