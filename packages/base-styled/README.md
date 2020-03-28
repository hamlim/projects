# `@matthamlin/base-styled`

A base React component that removes style props from `styled-system`.

## API

```jsx
import Base from '@matthamlin/base-styled'
import { compose, space, border, color, flexbox } from 'styled-system'

let Box = styled(Base)(compose(space, border, color, flexbox))
```

## Note:

If you create a higher-order `Box` component based off of this component, you should only ever use `forwardedAs` and not `as` when using `styled-components` to ensure that this component is rendered
