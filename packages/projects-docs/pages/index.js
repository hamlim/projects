import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@matthamlin/component-library'
import ErrorBoundary from '@matthamlin/error-boundary'

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
      </ErrorBoundary>
    </ThemeProvider>
  )
}
