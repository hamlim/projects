import React, { Suspense } from 'react'
import { Text, Box } from '@matthamlin/component-library'

import { Transactions, TransactionsFallback } from './Transactions'
import ErrorBoundary from '../../ErrorBoundary'

export default function View() {
  return (
    <Box>
      <Text fontSize={3}>View</Text>

      <ErrorBoundary FallbackComponent={TransactionsFallback}>
        <Suspense fallback={<Text>Loading Transactions...</Text>}>
          <Transactions />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}
