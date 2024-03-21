import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

const AuthContext = createContext({ })

export const useAuth = () => useContext(AuthContext)

const useDevelopmentAuth0 = () => {
  return {
    isAuthenticated: true,
    user: {
      email: "email@ddre.ss",
      email_verified: true,
      family_name: "Doe",
      given_name: "J",
      locale: "en",
      name: "J Doe",
      nickname: "jdoe",
      picture: null,
      sub: "google-oauth2|XXXXXXXXXXXXXXXXXXXXX",
      updated_at: new Date().toISOString(),
    },
    loginWithRedirect: console.log(),
    logout: console.log(),
  }
}

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated, user,
    loginWithRedirect, logout: auth0Logout,
  } = process.env.NODE_ENV !== 'production'
    ? useDevelopmentAuth0()
    : useAuth0()
  console.log(user)

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
