import * as React from 'react'
import { useHistory } from '@matthamlin/reroute-core'

let { createContext, useState } = React

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
  let [user, originalSetUser] = useState(initialUser)
  let history = useHistory()

  function setUser(user) {
    originalSetUser({
      ...user,
      isLoggedIn: true,
    })
  }

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
