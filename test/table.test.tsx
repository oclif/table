/* eslint-disable perfectionist/sort-objects */
import ansis from 'ansis'
import {config, expect} from 'chai'
import {Box} from 'ink'
import {render} from 'ink-testing-library'
import React from 'react'

import {Cell, Header, Skeleton, Table, formatTextWithMargins} from '../src/table.js'

config.truncateThreshold = 0

// Helpers -------------------------------------------------------------------

const skeleton = (v: string) => <Skeleton>{v}</Skeleton>

const header = (v: string) => (
  // @ts-expect-error - ignore
  <Header bold color="blue">
    {v}
  </Header>
)
const cell = (v: string) => <Cell column={0}>{v}</Cell>

describe('Table', () => {
  it('renders table', () => {
    const data = [{name: 'Foo'}]

    const {lastFrame: actual} = render(<Table data={data} />)
    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with numbers', () => {
    const data = [{name: 'Foo', age: 12}]
    const {lastFrame: actual} = render(<Table data={data} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' age ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
          {cell(' 12  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with multiple rows', () => {
    const data = [
      {name: 'Foo', age: 12},
      {name: 'Bar', age: 0},
    ]
    const {lastFrame: actual} = render(<Table data={data} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' age ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
          {cell(' 12  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Bar  ')}
          {skeleton('│')}
          {cell(' 0   ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with undefined value', () => {
    const data = [{name: 'Foo'}, {age: 15, name: 'Bar'}]
    const {lastFrame: actual} = render(<Table data={data} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' age ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
          {cell('     ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Bar  ')}
          {skeleton('│')}
          {cell(' 15  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with custom padding', () => {
    const data = [
      {name: 'Foo', age: 12},
      {name: 'Bar', age: 15},
    ]
    const {lastFrame: actual} = render(<Table data={data} padding={3} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────────')}
          {skeleton('┬')}
          {skeleton('─────────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header('   name   ')}
          {skeleton('│')}
          {header('   age   ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────────')}
          {skeleton('┼')}
          {skeleton('─────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('   Foo    ')}
          {skeleton('│')}
          {cell('   12    ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────────')}
          {skeleton('┼')}
          {skeleton('─────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('   Bar    ')}
          {skeleton('│')}
          {cell('   15    ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────────')}
          {skeleton('┴')}
          {skeleton('─────────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with values containing ansi characters', () => {
    const data = [
      {name: ansis.bold('Foo'), age: 12},
      {name: ansis.bold('Bar'), age: 15},
    ]
    const {lastFrame: actual} = render(<Table data={data} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' age ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(` ${ansis.bold('Foo')}  `)}
          {skeleton('│')}
          {cell(' 12  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(` ${ansis.bold('Bar')}  `)}
          {skeleton('│')}
          {cell(' 15  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders table with maxWidth', () => {
    const data = [
      {name: 'Foo', id: 'i'.repeat(30)},
      {name: 'Bar', id: 'i'.repeat(30)},
    ]

    const {lastFrame: actual} = render(<Table data={data} maxWidth={30} />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────────────────────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' id                  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────────────────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiii… ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────────────────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Bar  ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiii… ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────────────────────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })

  it('renders a table with wrapped content', () => {
    const data = [
      {name: 'Foo', id: 'i'.repeat(70)},
      {name: 'Bar', id: 'i'.repeat(70)},
    ]

    const {lastFrame: actual} = render(<Table data={data} maxWidth={30} overflow="wrap" />)

    const {lastFrame: expected} = render(
      <>
        <Box>
          {skeleton('┌')}
          {skeleton('──────')}
          {skeleton('┬')}
          {skeleton('─────────────────────')}
          {skeleton('┐')}
        </Box>
        <Box>
          {skeleton('│')}
          {header(' name ')}
          {skeleton('│')}
          {header(' id                  ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────────────────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Foo  ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiii       ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('├')}
          {skeleton('──────')}
          {skeleton('┼')}
          {skeleton('─────────────────────')}
          {skeleton('┤')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell(' Bar  ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiiiiiiiii ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('│')}
          {cell('      ')}
          {skeleton('│')}
          {cell(' iiiiiiiiiiiii       ')}
          {skeleton('│')}
        </Box>
        <Box>
          {skeleton('└')}
          {skeleton('──────')}
          {skeleton('┴')}
          {skeleton('─────────────────────')}
          {skeleton('┘')}
        </Box>
      </>,
    )

    expect(actual()).to.equal(expected())
  })
})

describe('formatTextWithMargins', () => {
  describe('wrap + align left', () => {
    it('formats short string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'left',
          overflow: 'wrap',
          padding: 1,
          value: 'Foo',
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 46,
        text: 'Foo',
      })
    })

    it('formats long string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'left',
          overflow: 'wrap',
          padding: 1,
          value: 'i'.repeat(70),
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 1,
        text: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\n iiiiiiiiiiiiiiiiiiiiii                          ',
      })
    })

    it('formats multiline string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'left',
          overflow: 'wrap',
          padding: 1,
          value: `Lorem ipsum dolor sit amet, consectetur
adipi
scing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 2,
        text: 'Lorem ipsum dolor sit amet, consectetur        \n adipi                                          \n scing elit. Sed do eiusmod tempor incididunt ut\n labore et dolore magna aliqua.                 ',
      })
    })
  })

  describe('wrap + align center', () => {
    it('formats short string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'center',
          overflow: 'wrap',
          padding: 1,
          value: 'Foo',
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 23,
        marginRight: 24,
        text: 'Foo',
      })
    })

    it('formats long string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'center',
          overflow: 'wrap',
          padding: 1,
          value: 'i'.repeat(70),
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 1,
        text: ' iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\n              iiiiiiiiiiiiiiiiiiiiii             ',
      })
    })

    it('formats multiline string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'center',
          overflow: 'wrap',
          padding: 1,
          value: `Lorem ipsum dolor sit amet, consectetur
adipi
scing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 2,
        text: '     Lorem ipsum dolor sit amet, consectetur    \n                      adipi                     \n scing elit. Sed do eiusmod tempor incididunt ut\n          labore et dolore magna aliqua.        ',
      })
    })
  })

  describe('wrap + align right', () => {
    it('formats short string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'right',
          overflow: 'wrap',
          padding: 1,
          value: 'Foo',
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 46,
        marginRight: 1,
        text: 'Foo',
      })
    })

    it('formats long string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'right',
          overflow: 'wrap',
          padding: 1,
          value: 'i'.repeat(70),
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 1,
        marginRight: 1,
        text: 'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii\n                           iiiiiiiiiiiiiiiiiiiiii',
      })
    })

    it('formats multiline string', () => {
      expect(
        formatTextWithMargins({
          horizontalAlignment: 'right',
          overflow: 'wrap',
          padding: 1,
          value: `Lorem ipsum dolor sit amet, consectetur
adipi
scing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
          width: 50,
        }),
      ).to.deep.equal({
        marginLeft: 2,
        marginRight: 1,
        text: '        Lorem ipsum dolor sit amet, consectetur\n                                            adipi\n  scing elit. Sed do eiusmod tempor incididunt ut\n                   labore et dolore magna aliqua.',
      })
    })
  })
})
