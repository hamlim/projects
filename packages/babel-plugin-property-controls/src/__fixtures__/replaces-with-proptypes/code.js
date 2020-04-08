import React from 'react'
import PropTypes from 'prop-types'

export default function Avatar({ initials, backgroundImage, size }) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{initials}</span>
    </div>
  )
}

Avatar.propertyControls = {
  initials: {
    type: PropTypes.node.isRequired,
    label: 'The users initials to display over the background image',
  },
  backgroundImage: {
    type: PropTypes.string,
    label: `The background image on the avatar.

Ensure that this image has a high enough contrast for the color of the initials provided.`,
    default: null,
  },
  size: {
    type: PropTypes.oneOf([20, 40, 80]),
    label: `The dimensions of the avatar component`,
    default: 40,
  },
}
