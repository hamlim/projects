import * as React from 'react'
import useAirtable from '../useAirtable'
import { userContext } from '../userContext'
import {
  Button,
  Box,
  Input,
  useTheme,
  Text,
} from '@matthamlin/component-library'
import ErrorBoundary from '../ErrorBoundary.js'
import { useHistory } from '@matthamlin/reroute-core'

let { useContext, useState, Suspense } = React

function preventDefault(e) {
  e.preventDefault()
}

function noop() {}

let base = 'appB11NkZV0FkRu4i'
let table = 'users'

function CheckUser({ username, passkey }) {
  let [, setUser] = useContext(userContext)
  let { history } = useHistory()
  let { records: users } = useAirtable({ base, table })

  let user = users.find(
    u => u.fields.username === username && u.fields.passkey === passkey,
  )
  if (user) {
    setUser(user.fields)
    history.push('/')
  } else {
    throw "Couldn't find user."
  }
  return null
}

function Null() {
  return null
}

export default function Login() {
  let theme = useTheme()
  let [user, setUser] = useContext(userContext)

  let [username, setUsername] = useState('')
  let [passkey, setPasskey] = useState('')
  let [attemptedLogin, setAttemptedLogin] = useState(false)

  return (
    <Box
      display="grid"
      alignItems="center"
      justifyItems="center"
      minHeight="100%"
    >
      <Box
        forwardedAs="form"
        onSubmit={preventDefault}
        minWidth={['80vw', , , '40vw']}
      >
        <Box forwardedAs="label" display="block">
          Username:
          <Input
            value={username}
            onChange={setUsername}
            autoComplete="username"
          />
        </Box>
        <Box forwardedAs="label" display="block" mt={6}>
          Passkey:
          <Input
            value={passkey}
            onChange={setPasskey}
            type="password"
            autoComplete="current-password"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setAttemptedLogin(true)
              }
            }}
          />
        </Box>
        <Box mt={6}>
          <Button
            isFullWidth
            onTap={() => setAttemptedLogin(true)}
            disabled={attemptedLogin}
          >
            Login
          </Button>
        </Box>
        {!!attemptedLogin && (
          <Suspense fallback={<Text>Logging in...</Text>}>
            <ErrorBoundary
              onError={() => setAttemptedLogin(2)}
              FallbackComponent={() => (
                <Box mt={6}>
                  <Text color={theme.colors.red[8]}>
                    Failed to login. Retry?
                  </Text>
                  <Button isFullWidth onTap={() => setAttemptedLogin(false)}>
                    Try Again
                  </Button>
                </Box>
              )}
            >
              <CheckUser username={username} passkey={passkey} />
            </ErrorBoundary>
          </Suspense>
        )}
      </Box>
    </Box>
  )
}
