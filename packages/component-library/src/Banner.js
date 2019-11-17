import { variant } from 'styled-system'
import styled from '@emotion/styled'
import { Box } from './Box.js'

let bannerVariant = variant({
  scale: 'banners',
  prop: 'variant',
})

export let Banner = styled(Box)(bannerVariant)
