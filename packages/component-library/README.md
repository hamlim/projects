# `@matthamlin/components`

Version: `3.1.0`

A simple component library built on top of React, Styled Components, and
Styled-System.

### Patterns

#### Controlled and Uncontrolled Components

All of the input-style components within this component library come with both a
default (e.g. `Input`) and an Uncontrolled (e.g. `UncontrolledInput`) variants.
Both components support the same underlying API, however the Uncontrolled
variant can't be controlled using `value`.

#### Customizing the Rendered Element

All components support the `as` and `forwardedAs` props, however unless you know
what you are doing you **should always** use the `forwardedAs` prop. This will
ensure the styled-system short-hand props continue to work as expected.

### Available Components

All components extend from the base Box component, which accepts all the props
supported through styled-system, and spreads the rest onto the html element.

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

VisuallyHidden is an element for rendering visually hidden content. It extends
from Box.

```jsx
<VisuallyHidden>Some content here</VisuallyHidden>
```

#### `H1, H2, H3, H4, H5, H6`

The Heading components are composed of Box components, defaulting to rendering
the relative html heading element, and defaulting the fontSize to the scale of
fontSizes within the theme.

```jsx
<H1>Page Title</H1>
```

#### `Button`

The Button component is a wrapper around an accessible interactive html element,
with a few opinionated styles.

```jsx
<Button onTap={doSomething}>Click Here</Button>
```

#### `Input`

The Input component is a wrapper around the `input` html element. The
`UncontrolledInput` component is a wrapper around the Input primitive that
stores its own state for the value and accepts a `defaultValue` and an
`onChange`.

```jsx
<Box>
  <Label>
    <Input onChange={handleChange} value={value} />
  </Label>
  <Label>
    <UncontrolledInput defaultValue="foo" onChange={setValue} />
  </Label>
</Box>
```

#### `HiddenCheckbox`

The HiddenCheckbox component renders a visually hidden checkbox element. It must
be provided with `checked` and `onChange` props.

The UncontrolledHiddenCheckbox component does the same but supports an optional
`defaultChecked` prop and does not support the `checked` prop.

```jsx
<Box>
  <HiddenCheckbox onChange={handleChange} checked={checked} />

  <UncontrolledInput defaultChecked={defaultChecked} onChange={handleChange} />
</Box>
```

These intentionally render no default UI to let you compose selectable
experiences on top of them.

#### `Banner`

The Banner component supports 4 variants:

```jsx
<Box>
  <Banner variant="info">Info</Banner>
  <Banner variant="success">Success</Banner>
  <Banner variant="warning">Warning</Banner>
  <Banner variant="error">Error</Banner>
</Box>
```

#### `List` and `ListItem`

The List component supports 3 `variant` prop values:

- `base` - removes list styling
- `orderd`
- `unordered`

```jsx
<Box>
  <List variant="base" forwardedAs="ul">
    <ListItem>Content</ListItem>
    <ListItem>Content</ListItem>
  </List>
  <List variant="ordered" forwardedAs="ol">
    <ListItem>1</ListItem>
    <ListItem>2</ListItem>
  </List>
  <List variant="unordered" forwardedAs="ul">
    <ListItem>content</ListItem>
    <ListItem>content</ListItem>
  </List>
</Box>
```

#### `Link`

The Link component renders as a text link, it requires a `forwardedAs` prop to
render as an appropriate element (e.g. Link, 'a', etc).

```jsx
<Link forwardedAs="a" href="#">
  Link
</Link>
```

#### `useMedia`

```jsx
let matches = useMedia({
  query: '(min-width: 1000px)',
  // Optional, useful for server-side rendering
  defaultMatches: false,
  // Optional
  matchMedia: query => ({ matches, addListener, removeListener }),
})
```

#### `useId`

```jsx
let id = useId(providedId)
```

#### `GlobalStyles`

The GlobalStyles component simply adds a basic css reset to the page to ensure
style consistency.

If you are using the default `ThemeProvider` component this is not needed.

```jsx
<GlobalStyles />
```

#### `ThemeProvider` and `useTheme`

In order for the styles for the elements to work properly, the root of your app
should render a `ThemeProvider` component which accepts children and optionally
a `theme` override prop to override the default theme.

Additionally, you can use `useTheme` to read the theme within a function
component.

```jsx
render(
  <ThemeProvider theme={{ ...theme }}>
    <App />
  </ThemeProvider>,
)
// ...
let theme = useTheme()
```

#### `Theme`

The component library also exposes the theme object, allowing you to extend the
system.

This theme object follows the theme spec from styled-system, see
[here](https://styled-system.com/theme-specification) for more information.

```js
import { theme } from '@matthamlin/component-library'

export default {
  ...theme,
  // overrides
}
```

#### `Fieldset`

The `Fieldset` and `UncontrolledFieldset` components offer a context provider
for a tuple of `[value, setValue]` values, and renders a `fieldset` html
element. It is meant to wrap a set of options.

```jsx
<Fieldset value={val} onChange={handleChange}>
  ...
</Fieldset>
```

#### `HiddenRadioButton`

The `HiddenRadioButton` and `UncontrolledHiddenRadioButton` components offer
visually hidden inputs that act like radio selects.

They are built to be used within the `Fieldset` and `UncontrolledFieldset`
components.

```jsx
<UncontrolledFieldset defaultValue="a" name="foo">
  <Label>
    <UncontrolledHiddenRadioButton value="a" />A
  </Label>
  <Label>
    <UncontrolledHiddenRadioButton value="b" />B
  </Label>
  <Label>
    <UncontrolledHiddenRadioButton value="c" />C
  </Label>
</UncontrolledFieldset>
```

#### `Label`

The `Label` component is meant for wrapping input-style components with some
label text. By default it renders as an HTML label element.

```jsx
<Label>
  <Box>Descriptive label here:</Box>
  <Input />
</Label>
```

#### `Textarea`

The `Textarea` component renders as an HTML `textarea` element and is resizable
by default.

```jsx
<Label>
  <Box>Label text here:</Box>
  <Textarea defaultValue="Some long text here..." />
</Label>
```

#### `Checkbox`

The `Checkbox` component is a visual alternative to `HiddenCheckbox` that offers
an opinionated checkbox UI.

```jsx
<Box>
  <Label>
    <Checkbox checked={checked} onChange={setChecked} /> Check
  </Label>

  <Label>
    <UncontrolledCheckbox defaultChecked={false} onChange={handleChange} />{' '}
    Check
  </Label>
</Box>
```

#### `Stack`

The `Stack` component is a useful utility for wrapping some elements and
providing the same spacing to all of them.

```jsx
<Stack props={{ m: 4 }}>
  <Text>1</Text>
  <Text>2</Text>
  <Text>3</Text>
</Stack>
```

**Props**:

- `props` - An object of props spread down to the wrapping `Box` component
  around each child. (yes you read that correctly, the prop name is `props`)
- `inline` - A helper prop for applying `display="inline-flex"`

### Ideas:

- Theme visualizer
- Font Sizes by role `theme.fontSizes.h1`
- Dropdown Component
- Chip component
- Tabs
- Accordion
