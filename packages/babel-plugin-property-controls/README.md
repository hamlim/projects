# `@hamlim/babel-plugin-property-controls`

A babel plugin for transforming property controls on React components back to prop types and default
props.

## Why use this plugin?

If you want to implement `@hamlim/property-controls` but also document your components using
`propTypes` and `defaultProps`, this plugin will generate prop-types and default props based on your
property controls on your components. This way you can author the prop types once and support both
needs.

## How it works?

**In**:

```jsx
function Avatar({
  initials,
  backgroundImage,
  size
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: size,
        height: size,
				borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span>{initials}</span>
    </div>
  );
}

Avatar.propertyControls = {
  initials: {
    type: PropTypes.node.isRequired,
    label: 'The users initials to display over the background image'
  },
  backgroundImage: {
    type: PropTypes.string,
    label: `The background image on the avatar.

Ensure that this image has a high enough contrast for the color of the initials provided.`
    default: null
  },
  size: {
    type: PropTypes.oneOf([ 20, 40, 80 ]),
    label: `The dimensions of the avatar component`,
    default: 40
  }
}
```

**Out**:

```jsx
function Avatar({
  initials,
  backgroundImage,
  size
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span>{initials}</span>
    </div>
  );
}

Avatar.propTypes = {
  /* The users initials to display over the background image */
  initials: PropTypes.node.isRequired,
  /**
   * The background image on the avatar.
   * Ensure that this image has a high enough contrast for the color of the initials provided.
   */
  backgroundImage: PropTypes.string,
  /* The dimensions of the avatar component */
  size: PropTypes.oneOf([ 20, 40, 80 ])
}

Avatar.defaultProps = {
  backgroundImage: null,
  size: 40
}

Avatar.propertyControls = {
  initials: {
    type: PropTypes.node.isRequired,
    label: 'The users initials to display over the background image'
  },
  backgroundImage: {
    type: PropTypes.string,
    label: `The background image on the avatar.

Ensure that this image has a high enough contrast for the color of the initials provided.`
    default: null
  },
  size: {
    type: PropTypes.oneOf([ 20, 40, 80 ]),
    label: `The dimensions of the avatar component`,
    default: 40
  }
}
```
