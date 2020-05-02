import { Link, Box, Stack } from '@matthamlin/component-library'
import NextLink from 'next/link'

export default function Header({ children }) {
  return (
    <Box m={4} forwardedAs="header">
      <Stack props={{ mx: 2 }}>{children}</Stack>
    </Box>
  )
}

Header.Link = function HeaderLink({ href, children }) {
  return (
    <NextLink href={href}>
      <Link>{children}</Link>
    </NextLink>
  )
}
