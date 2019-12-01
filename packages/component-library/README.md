# `@matthamlin/components`

A simple component library built on top of React, Emotion, and Styled-System.

### Available Components

All components extend from the base Box component, which accepts all the props supported through
styled-system, and spreads the rest onto the html element.

#### `Box`

Box accepts all the props supported through `styled-system`.

```jsx
<Box color="primary" m={[2, 4]}>
  Content
</Box>
```

#### `Text`

Text is a wrapper on top Box, that defaults to rendering as a `p` element

```jsx
<Text>Some content here</Text>
```

#### `H1, H2, H3, H4, H5, H6`

The Heading components are composed of Box components, defaulting to rendering the relative html
heading element, and defaulting the fontSize to the scale of fontSizes within the theme.

```jsx
<H1>Page Title</H1>
```

#### `Button`

The Button component is a wrapper around an html `button` element, with a few opinionated styles.

```jsx
<Button onClick={doSomething}>Click Here</Button>
```

#### `Input` and `ControlledInput`

The Input component is a wrapper around the `input` html element. The `ControlledInput` component is
a wrapper around the Input primitive that stores its own state for the value and accepts a
`defaultValue` and an `onChange`.

```jsx
<Input onChange={handleChange} value={value} />

<ControlledInput defaultValue="foo" onChange={setValue} />
```

#### `Banner`

The Banner component supports 4 variants:

```jsx
<Banner variant="info">Info</Banner>
<Banner variant="success">Success</Banner>
<Banner variant="warning">Warning</Banner>
<Banner variant="error">Error</Banner>
```

#### `Link`

The Link component renders as a text link, it requires an `as` prop to render as an appropriate
element (e.g. Link, 'a', etc).

```jsx
<Link as="a" href="#">
  Link
</Link>
```

#### `useMedia`

```jsx
let matches = useMedia({
  query: '(min-width: 1000px)',
  defaultMatches: false,
  matchMedia: query => ({ matches, addListener, removeListener }),
})
```

#### `GlobalStyles`

The GlobalStyles component simply adds a basic css reset to the page to ensure style consistency.

```jsx
<GlobalStyles />
```

#### `ThemeProvider` and `useTheme`

In order for the styles for the elements to work properly, the root of your app should render a
`ThemeProvider` component which accepts children and optionally a `theme` override prop to override
the default theme.

Additionally, you can use `useTheme` to read the theme within a function component.

#### `Theme`

The components library also exposes the Theme object, allowing you to extend the system.

This theme object follows the theme spec from styled-system, see
[here](https://styled-system.com/theme-specification) for more information.
