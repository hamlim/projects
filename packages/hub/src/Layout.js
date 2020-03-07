import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useContext,
} from 'react'
import {
  Box,
  ListItem,
  List,
  Link,
  VisuallyHidden,
  useTheme,
  Text,
  Theme,
} from '@matthamlin/component-library'
import { useRoute, Link as RouterLink } from '@matthamlin/reroute-browser'
import { userContext } from './userContext'

let AnchorLink = forwardRef((props, ref) => (
  <Link as="a" ref={ref} {...props} />
))

function SkipNavLink() {
  let [focus, setFocus] = useState(false)
  let wrapperRef = useRef()

  let Wrapper = focus ? Box : VisuallyHidden

  useEffect(() => {
    if (focus) {
      window.requestAnimationFrame(() => {
        wrapperRef.current.focus()
      })
    }
  }, [focus])

  return (
    <Wrapper
      key="SkipNavLink"
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={() => setFocus(false)}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          setFocus(false)
        }
      }}
    >
      <AnchorLink ref={wrapperRef} href="#main">
        Skip to main content
      </AnchorLink>
    </Wrapper>
  )
}

function RouteLink(props) {
  return <Link forwardedAs={RouterLink} {...props} />
}

export function Nav() {
  let [user] = useContext(userContext)
  let homeProps = useRoute('/')
  let moneyProps = useRoute('/money')
  let taskProps = useRoute('/tasks')
  let healthProps = useRoute('/health')
  let habitProps = useRoute('/habits')

  let HomeLink = homeProps.match ? Text : RouteLink
  let MoneyLink = moneyProps.match ? Text : RouteLink
  let TaskLink = taskProps.match ? Text : RouteLink
  let HealthLink = healthProps.match ? Text : RouteLink
  let HabitsLink = habitProps.match ? Text : RouteLink

  let theme = useTheme()

  return (
    <>
      <SkipNavLink />
      <Box forwardedAs="nav" backgroundColor={theme.colors.gray[1]} p={4}>
        <LayoutWrapper>
          <List
            variant="base"
            forwardedAs="ul"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <ListItem mr={4}>
              <HomeLink to="/" fontSize={2}>
                Hub
              </HomeLink>
            </ListItem>
            {user.isLoggedIn ? (
              <>
                <Box display="inline-flex">
                  <ListItem mr={4}>
                    <MoneyLink to="/money" fontSize={2}>
                      Money
                    </MoneyLink>
                  </ListItem>
                  <ListItem mr={4}>
                    <TaskLink to="/tasks" fontSize={2}>
                      Tasks
                    </TaskLink>
                  </ListItem>
                  <ListItem mr={4}>
                    <HealthLink to="/health" fontSize={2}>
                      Health
                    </HealthLink>
                  </ListItem>
                  <ListItem>
                    <HabitsLink to="/habits" fontSize={2}>
                      Habits
                    </HabitsLink>
                  </ListItem>
                </Box>
                <ListItem>{user.username}</ListItem>
              </>
            ) : (
              <ListItem>
                <RouteLink to="/login" fontSize={2}>
                  Login
                </RouteLink>
              </ListItem>
            )}
          </List>
        </LayoutWrapper>
      </Box>
    </>
  )
}

function LayoutWrapper({ children, ...props }) {
  return (
    <Box
      {...props}
      maxWidth={['98vw', '90vw', '80vw', '80ch']}
      minWidth={['98vw', '90vw', '80vw', '80ch']}
      marginX={['1vw', '5vw', '10vw', 'auto']}
    >
      {children}
    </Box>
  )
}

export function Layout({ children }) {
  return (
    <LayoutWrapper as="main" id="main" flexGrow="1">
      {children}
    </LayoutWrapper>
  )
}
