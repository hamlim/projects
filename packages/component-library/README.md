# `@matthamlin/components`

A simple component library built on top of React, Styled Components, and Styled-System.

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

#### `VisuallyHidden`

VisuallyHidden is an element for rendering visually hidden content. It extends from Box.

```jsx
<VisuallyHidden>Some content here</VisuallyHidden>
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

#### `HiddenCheckbox` and `ControlledHiddenCheckbox`

The HiddenCheckbox component renders a visually hidden checkbox element. It must be provided with `checked` and `onChange` props.

The ControlledHiddenCheckbox component does the same but supports an optional `defaultChecked` prop and does not support the checked prop.

```jsx
<HiddenCheckbox onChange={handleChange} checked={checked} />

<ControlledInput
  defaultChecked={defaultChecked}
  onChange={handleChange}
/>
```

#### `Banner`

The Banner component supports 4 variants:

```jsx
<Banner variant="info">Info</Banner>
<Banner variant="success">Success</Banner>
<Banner variant="warning">Warning</Banner>
<Banner variant="error">Error</Banner>
```

#### `List` and `ListItem

The List component supports 3 `variant` prop values:

- `base` - removes list styling
- `orderd`
- `unordered`

```jsx
<List variant="base" as="ul">
  <ListItem>Content</ListItem>
  <ListItem>Content</ListItem>
</List>
<List variant="ordered" as="ol">
  <ListItem>1</ListItem>
  <ListItem>2</ListItem>
</List>
<List variant="unordered" as="ul">
  <ListItem>content</ListItem>
  <ListItem>content</ListItem>
</List>
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

#### `useId`

```jsx
let id = useId(providedId)
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

#### `Fieldset`

The `Fieldset` and `ControlledFieldset` components offer a context provider for a tuple of `[value, setValue]` values, and renders a `fieldset` html element. It is meant to wrap a set of options.

```jsx
<Fieldset value={} onChange={}>
  ...
</Fieldset>
```

#### `RadioButton`

The `RadioButton` and `ControlledRadioButton` components offer visually hidden inputs that act like radio selects.

They are built to be used within the `Fieldset` and `ControlledFieldset` components.

```jsx
<ControlledFieldset defaultValue="a" name="foo">
  <label>
    <ControlledRadioButton value="a">
    A
  </label>
  <label>
    <ControlledRadioButton value="b">
    B
  </label>
  <label>
    <ControlledRadioButton value="c">
    C
  </label>
</ControlledFieldset>


### Ideas:

- Theme visualizer
- Font Sizes by role `theme.fontSizes.h1`
- Dropdown Component
- Chip component
- Tabs
- Accordion
```
