import * as React from 'react'
import { useHistory } from '@matthamlin/reroute-core'

let { createContext, useState, useEffect } = React

let initialUser = {
  isLoggedIn: false,
  username: '',
  passkey: '',
}

export let userContext = createContext({
  user: initialUser,
  setUser() {},
})

export function Provider({ children }) {
  let [user, originalSetUser] = useState(() => {
    try {
      let user = JSON.parse(window.localStorage.getItem('hub-user'))
      return user
    } catch (err) {
      return initialUser
    }
  })
  let history = useHistory()

  function setUser(user) {
    originalSetUser({
      ...user,
      isLoggedIn: true,
    })
  }

  useEffect(() => {
    window.localStorage.setItem('hub-user', JSON.stringify(user))
  }, [user])

  function logout() {
    originalSetUser(initialUser)
    history.push('/')
  }

  return (
    <userContext.Provider value={[user, setUser, logout]}>
      {children}
    </userContext.Provider>
  )
}
