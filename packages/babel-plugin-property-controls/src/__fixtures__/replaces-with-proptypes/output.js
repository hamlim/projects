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
;('TODO')
;('TODO')
