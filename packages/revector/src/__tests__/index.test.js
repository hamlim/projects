import React from 'react'
import { render } from '@testing-library/react'
import {
  Svg,
  Path,
  Line,
  Move,
  CubicBezier,
  CubicBezierStart as CBStart,
  CubicBezierControl as CBControl,
  CubicBezierEnd as CBEnd,
} from '../index'

describe('Path', () => {
  it('matches a snapshot using Move and Line', () => {
    const { container } = render(
      <Svg height="100%" width="100%" viewBox="0 0 200 100">
        <Path fill="none" stroke="red">
          <Move x={10} y={90} />
          <Line x={({ x }) => x + 10} y={({ y }) => y + 10} />
        </Path>
      </Svg>,
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
      <svg
        height="100%"
        viewBox="0 0 200 100"
        width="100%"
      >
        <path
          d=" M 10, 90 L 20, 100"
          fill="none"
          stroke="red"
        />
      </svg>
    `)
  })

  it('matches a snapshot using Move and Cubic Bezier', () => {
    const { container } = render(
      <Svg height={'100%'} width={'100%'} viewBox="0 0 200 100">
        <Path fill="none" stroke="red">
          <Move x={10} y={90} />
          <CubicBezier>
            <CBStart x={30} y={90} />
            <CBControl x={25} y={10} />
            <CBEnd x={50} y={10} />
          </CubicBezier>
          <CubicBezier smooth>
            <CBStart x={70} y={90} />
            <CBEnd x={90} y={90} />
          </CubicBezier>
        </Path>
      </Svg>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <svg
        height="100%"
        viewBox="0 0 200 100"
        width="100%"
      >
        <path
          d=" M 10, 90 C 30,90 25,10 50,10 S 70,90  90,90"
          fill="none"
          stroke="red"
        />
      </svg>
    `)
  })
})
