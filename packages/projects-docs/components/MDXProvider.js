import * as components from '@matthamlin/component-library'
import { MDXProvider as Provider } from '@mdx-js/react'

function createElementWithSpacing(Element) {
  return function Spacer(props) {
    return (
      <components.Box my={4}>
        <Element {...props} />
      </components.Box>
    )
  }
}

let mdxComponents = {
  ...components,
  p: createElementWithSpacing(components.Text),
  inlineCode: props => (
    <components.Text
      px={1}
      py="2px"
      borderRadius={0}
      color="gray.9"
      bg="gray.2"
      forwardedAs="code"
      {...props}
    />
  ),
  h1: createElementWithSpacing(components.H1),
  h2: createElementWithSpacing(components.H2),
  h3: createElementWithSpacing(components.H3),
  h4: createElementWithSpacing(components.H4),
  h5: createElementWithSpacing(components.H5),
  h6: createElementWithSpacing(components.H6),
  ul: createElementWithSpacing(props => (
    <components.List variant="unordered" forwardedAs="ul" {...props} />
  )),
  ol: createElementWithSpacing(props => (
    <components.List variant="ordered" forwardedAs="ol" {...props} />
  )),
  li: props => <components.ListItem {...props} />,
  code: createElementWithSpacing(props => (
    <components.Box
      forwardedAs="pre"
      px={1}
      py="2px"
      borderRadius={0}
      color="gray.9"
      bg="gray.2"
    >
      <components.Box forwardedAs="code" {...props} />
    </components.Box>
  )),
}

export default function MDXProvider({ children }) {
  return <Provider components={mdxComponents}>{children}</Provider>
}
