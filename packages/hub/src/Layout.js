import React, { useState, useEffect, useRef, forwardRef } from 'react'
import {
  Box,
  ListItem,
  List,
  Link,
  VisuallyHidden,
} from '@matthamlin/component-library'
import { useRoute, Link as RouterLink } from '@matthamlin/reroute-browser'

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
      ref={wrapperRef}
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      as={AnchorLink}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={() => setFocus(false)}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          setFocus(false)
        }
      }}
      as="a"
      href="#main"
    >
      Skip to main content
    </Wrapper>
  )
}

export function Nav() {
  let homeProps = useRoute('/')
  let cashProps = useRoute('/cash')
  let taskProps = useRoute('/tasks')

  return (
    <>
      <SkipNavLink />
      <Box as="nav">
        <List variant="base" as="ul" display="inline-flex">
          <ListItem mr={4}>
            <Link as={RouterLink} to="/" isActive={homeProps.match}>
              Home
            </Link>
          </ListItem>
          <ListItem mr={4}>
            <Link as={RouterLink} to="/cash" isActive={cashProps.match}>
              Money
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/tasks" isActive={taskProps.match}>
              Tasks
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  )
}

export function Layout({ children }) {
  return (
    <Box as="main" id="main">
      {children}
    </Box>
  )
}
