# `@matthamlin/base-styled`

A base React component that removes style props from `styled-system`.

## API

```jsx
import Base from '@matthamlin/base-styled'
import { compose, space, border, color, flexbox } from 'styled-system'

let Box = styled(Base)(compose(space, border, color, flexbox))
```
