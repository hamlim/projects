import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, Link } from '@matthamlin/component-library'
import ErrorBoundary from '@matthamlin/error-boundary'
import NextLink from 'next/link'

function Fallback() {
  return <p>Error Encountered</p>
}

export default function Home() {
  return (
    <ThemeProvider>
      <ErrorBoundary Fallback={Fallback}>
        <Head>
          <title>Projects Monorepo</title>
        </Head>

        <NextLink href="/component-library">
          <Link>@matthamlin/component-library</Link>
        </NextLink>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
