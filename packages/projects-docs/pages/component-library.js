import ComponentLibrary from '../docs/component-library.mdx'
import MDXProvider from '../components/MDXProvider'
import Page from '../components/Page'
import { Link } from '@matthamlin/component-library'
import NextLink from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'

export default function ComponentLibraryPage() {
  return (
    <Page>
      <Header>
        <Head>
          <title>Component Library</title>
        </Head>
        <Header.Link href="/">Home</Header.Link>
      </Header>

      <MDXProvider>
        <ComponentLibrary />
      </MDXProvider>
    </Page>
  )
}
