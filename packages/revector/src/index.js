import React from 'react'

let { Children, useState } = React

export function Svg({ width, height, ...rest }) {
  return <svg {...rest} height={height} width={width} />
}

function isFunction(x) {
  return typeof x === 'function'
}

function callOrReturn(val) {
  return function(...args) {
    return isFunction(val) ? val(...args) : val
  }
}

/*
 SVG path commands

 Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

 M absolute movement x,y
 m local movement x,y
 
 L absolute line to x,y
 l local line to dx,dy

 H absolute horizontal line to x
 h local absolute line to dx

 V absolute vertical line to y
 v local vertical line to dy

 C Bezier curve from current point to absolute coords x1, y1
   C x1, y1  x2, y2, x, y
   x and y are the end points
   x1, y1, are the first control point (begining of curve)
   x2, y2 are the end control point (end of curve)
*/

let PathTypes = {
  move: 'MOVE',
  line: 'LINE',
  cubicBezier: 'CUBIC_BEZIER',
  cubicBezierStart: 'CUBIC_BEZIER_START',
  cubicBezierEnd: 'CUBIC_BEZIER_END',
  cubicBezierControl: 'CUBIC_BEZIER_CONTROL',
}

export function Move({ x, y }) {
  return null
}
Move.$type = PathTypes.move

export function Line({ x, y }) {
  return null
}
Line.$type = PathTypes.line

export function CubicBezier({ x, y }) {
  return null
}
CubicBezier.$type = PathTypes.cubicBezier

export function CubicBezierStart({ x, y }) {
  return null
}
CubicBezierStart.$type = PathTypes.cubicBezierStart

export function CubicBezierEnd({ x, y }) {
  return null
}
CubicBezierEnd.$type = PathTypes.cubicBezierEnd

export function CubicBezierControl({ x, y }) {
  return null
}
CubicBezierControl.$type = PathTypes.cubicBezierControl

function convertCubicBezierChildren(childrenArray, state) {
  return childrenArray.reduce((acc, child) => {
    if (child.type.$type === PathTypes.cubicBezierStart) {
      acc.start = {
        x: callOrReturn(child.props.x)(state),
        y: callOrReturn(child.props.y)(state),
      }
    } else if (child.type.$type === PathTypes.cubicBezierControl) {
      acc.control = {
        x: callOrReturn(child.props.x)(state) || '',
        y: callOrReturn(child.props.y)(state) || '',
      }
    } else {
      acc.end = {
        x: callOrReturn(child.props.x)(state),
        y: callOrReturn(child.props.y)(state),
      }
    }
    return acc
  }, {})
}

export function Path(props) {
  let [state, setState] = useState({
    x: 0,
    y: 0,
  })
  function convertChildren(childrenArr) {
    return childrenArr.reduce((path, child) => {
      let type, x, y
      if (child.type.$type === PathTypes.move) {
        if (child.props.local) {
          type = 'm'
        } else {
          type = 'M'
        }
        x = callOrReturn(child.props.x)(state)
        y = callOrReturn(child.props.y)(state)

        state = {
          ...state,
          x,
          y,
        }
        return `${path} ${type} ${x}, ${y}`
      } else if (child.type.$type === PathTypes.line) {
        if (child.props.local) {
          type = 'l'
        } else {
          type = 'L'
        }
        x = callOrReturn(child.props.x)(state)
        y = callOrReturn(child.props.y)(state)

        state = {
          ...state,
          x,
          y,
        }
        return `${path} ${type} ${x}, ${y}`
      } else if (child.type.$type === PathTypes.cubicBezier) {
        /*
          The structure we expect here is the following:
          <CubicBezier>
            <CBStart x={5} y={5} />
            <CBControl x={7} y={7} />
            <CBEnd x={9} y={5} />
          </CubicBezier>

          childrenData = {
            start: { x, y },
            end: { x, y },
            control: { x, y }
          }
        */
        if (child.props.local) {
          type = 'c'
        } else {
          type = 'C'
        }
        if (child.props.smooth) {
          if (child.props.local) {
            type = 's'
          } else {
            type = 'S'
          }
        }
        let {
          start,
          control = { x: '', y: '' },
          end,
        } = convertCubicBezierChildren(
          Children.toArray(child.props.children),
          state,
        )
        state = {
          ...state,
          x: end.x,
          y: end.y,
        }
        return `${path} ${type} ${start.x},${start.y} ${
          control.x ? `${control.x},` : ''
        }${control.y} ${end.x},${end.y}`
      }
      return path
    }, '')
  }
  let { children, ...rest } = props
  let path = convertChildren(Children.toArray(children))
  return <path d={path} {...rest} />
}
