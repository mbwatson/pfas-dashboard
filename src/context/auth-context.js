import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

const AuthContext = createContext({ })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated, user,
    loginWithRedirect, logout: auth0Logout,
  } = useAuth0()

  // these are simply wrappers around the Auth0 functions,
  // allowing injection of custom app-related logic.
  const login = () => {
    loginWithRedirect()
  }
  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })
  }

  const value = useMemo(() => ({ user, login, logout, isAuthenticated }), [user])

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
