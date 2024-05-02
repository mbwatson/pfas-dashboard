import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useColorScheme } from '@mui/joy/styles'
import { useAuth } from '@context'
import {
  useToggleLocalStorage,
  useWindowSize,
} from '@hooks'

const AppContext = createContext({ })

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = ({ children }) => {
  const windowSize = useWindowSize()

  const { mode, setMode } = useColorScheme()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePreferences = () => setDrawerVisibility(!drawerVisibility)
  const closePreferences = () => setDrawerVisibility(false)
  const openPreferences = () => setDrawerVisibility(true)

  const inLightMode = useMemo(() => mode === 'light', [mode])
  const inDarkMode = useMemo(() => mode === 'dark', [mode])
  const otherColorMode = useMemo(() => inDarkMode ? 'light' : 'dark', [mode])
  const toggleColorMode = useCallback(() => setMode(otherColorMode), [mode])

  const cache = useToggleLocalStorage('use-cache')

  return (
    <AppContext.Provider value={{
      auth: useAuth(),
      loading, setLoading,
      preferences: {
        visibility: drawerVisibility,
        hide: closePreferences,
        show: openPreferences,
        toggle: togglePreferences,
        colorMode: {
          current: mode,
          other: otherColorMode,
          toggle: toggleColorMode,
          light: inLightMode,
          dark: inDarkMode,
        },
        cache,
      },
      windowSize,
    }}>
      { children }
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node,
}
