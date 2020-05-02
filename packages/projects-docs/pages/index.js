import * as React from 'react'
import ErrorBoundary from '@matthamlin/error-boundary'
import Head from 'next/head'
import Page from '../components/Page'
import Header from '../components/Header'

function Fallback() {
  return <p>Error Encountered</p>
}

export default function Home() {
  return (
    <Page>
      <ErrorBoundary Fallback={Fallback}>
        <Header>
          <Head>
            <title>Projects Monorepo</title>
          </Head>
          <Header.Link href="/">Home</Header.Link>
          <Header.Link href="/component-library">
            @matthamlin/component-library
          </Header.Link>
        </Header>
      </ErrorBoundary>
    </Page>
  )
}
