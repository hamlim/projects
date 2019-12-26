import { lazy } from 'react'

export default [
  {
    to: '2019-bend',
    title: '2019 Bend',
    component: lazy(() => import('./content/2019/july/bend.mdx')),
  },
]
