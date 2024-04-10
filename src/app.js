import { Fragment, useMemo } from 'react'
import { Sheet } from '@mui/joy'
import { AuthMenu } from '@components/auth'
import { useAppContext } from '@context'
import { menuItems, Router } from './router'
import { Header } from './components/layout'

import { PreferencesDrawer } from '@components/preferences'

//

export const App = () => {
  const { auth, pageRef, preferences } = useAppContext()

  const headerActions = useMemo(() => {
    let actions = [<AuthMenu key="auth-action-button" />]
    if (auth.user) {
      actions = [
        ...actions,
      ]
    }
    return actions
  }, [auth.user])

  const availableMenuItems = useMemo(() => {
    if (!auth.user) {
      return menuItems.filter(r => !r.requiresAuth)
    }
    return menuItems 
  }, [auth.user])

  return (
    <Fragment>
      <Header
        menuLinks={ availableMenuItems }
        actions={ headerActions }
      />
      
      <Sheet
        component="main"
        ref={ pageRef }
        className={
          preferences.colorMode.dark ? 'dark-mode' : 'light-mode'
        }
      >
        <Router />
      </Sheet>

      <PreferencesDrawer />

    </Fragment>
  )
}
