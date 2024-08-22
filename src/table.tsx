/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import {camelCase, capitalCase, constantCase, kebabCase, pascalCase, sentenceCase, snakeCase} from 'change-case'
import {Box, Text, render} from 'ink'
import {sha1} from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'

import {BORDER_SKELETONS, BorderStyle} from './skeletons.js'

/**
 * Features to implement:
 * - [x] properly render cells with ascii characters
 * - [x] refactor
 * - [x] if table exceeds the width of the terminal, minimally truncate the largest column to fit
 * - [x] wrap or truncate overflow
 * - [x] builtin column header formatters (e.g. capitalize, uppercase, etc.)
 * - [x] make column headers customizable
 * - [x] make borders removable
 * - [ ] add tests (variable height, header formatter, header options, border styles)
 *
 * Features to consider:
 * - [ ] more border styles
 * - [ ] options for sorting, filtering, showing extended columns
 * - [ ] alt text for truncated cells
 * - [ ] side by side tables
 *
 * NOPE
 * - [ ] title - Can implement this in sf-plugins-core
 */

type Scalar = string | number | boolean | null | undefined

type ScalarDict = {
  [key: string]: Scalar
}

export type CellProps = React.PropsWithChildren<{readonly column: number}>

export type ColumnAlignment = 'left' | 'right' | 'center'

export interface ColumnProps<T> {
  key: T
  name?: string
}
export type AllColumnProps<T> = {[K in keyof T]: ColumnProps<K>}[keyof T]

type Percentage = `${number}%`

type HeaderFormatter =
  | ((header: string) => string)
  | 'pascalCase'
  | 'capitalCase'
  | 'camelCase'
  | 'snakeCase'
  | 'kebabCase'
  | 'constantCase'
  | 'sentenceCase'

type SupportedColors =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | `#${string}`
  | `rgb(${number},${number},${number})`

type HeaderOptions = {
  color?: SupportedColors
  backgroundColor?: SupportedColors
  bold?: boolean
  dimColor?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  inverse?: boolean
  /**
   * Column header formatter. Can either be a function or a method name on the `change-case` library.
   *
   * See https://www.npmjs.com/package/change-case for more information.
   */
  formatter?: HeaderFormatter
}

export type TableProps<T extends ScalarDict> = {
  /**
   * List of values (rows).
   */
  data: T[]
  /**
   * Columns that we should display in the table.
   */
  columns?: (keyof T | AllColumnProps<T>)[]
  /**
   * Cell padding.
   */
  padding?: number
  /**
   * Width of the table. Can be a number (e.g. 80) or a percentage (e.g. '80%').
   *
   * If not provided, it will default to the width of the terminal (determined by `process.stdout.columns`).
   *
   * If you provide a number or percentage that is larger than the terminal width, it will default to the terminal width.
   *
   * If you provide a number or percentage that is too small to fit the table, it will default to the width of the table.
   */
  maxWidth?: Percentage | number
  /**
   * Overflow behavior for cells. Defaults to 'truncate'.
   */
  overflow?: 'wrap' | 'truncate'
  /**
   * Styling options for the column headers
   */
  headerOptions?: HeaderOptions
  /**
   * Border style for the table. Defaults to 'all'.
   */
  borderStyle?: BorderStyle
  /**
   * Align data in columns. Defaults to 'left'.
   */
  align?: ColumnAlignment
}

type Config<T> = {
  align: ColumnAlignment
  columns: (keyof T | AllColumnProps<T>)[]
  data: T[]
  padding: number
  maxWidth: number
  overflow: 'wrap' | 'truncate'
  headerOptions: HeaderOptions
  borderStyle: BorderStyle
}

const getDataKeys = <T extends ScalarDict>(data: T[]): (keyof T)[] => {
  const keys = new Set<keyof T>()

  for (const row of data) {
    for (const key in row) {
      if (key in row) {
        keys.add(key)
      }
    }
  }

  return [...keys]
}

const getColumns = <T extends ScalarDict>(config: Config<T>): Column<T>[] => {
  const {align, columns, maxWidth, padding} = config

  const widths: Column<T>[] = columns.map((propsOrKey) => {
    const props: ColumnProps<keyof T> = typeof propsOrKey === 'object' ? propsOrKey : {key: propsOrKey}
    const {key, name} = props

    const header = String(name ?? key).length
    // Get the width of each cell in the column
    const data = config.data.map((data) => {
      const value = data[key]

      if (value === undefined || value === null) return 0
      return stripAnsi(String(value)).length
    })

    const width = Math.max(...data, header) + padding * 2

    return {
      align: align ?? 'left',
      column: key,
      key: String(key),
      width,
    }
  })

  const numberOfBorders = widths.length + 1

  const calculateTableWidth = (widths: Column<T>[]) =>
    widths.map((w) => w.width).reduce((a, b) => a + b) + numberOfBorders

  // If the table is too wide, reduce the width of the largest column as little as possible to fit the table.
  // At most, it will reduce the width to the length of the column's header plus padding.
  // If the table is still too wide, it will reduce the width of the next largest column and so on
  let tableWidth = calculateTableWidth(widths)
  const seen = new Set<string>()
  while (tableWidth > maxWidth) {
    const largestColumn = widths.reduce((a, b) => (a.width > b.width ? a : b))
    const difference = tableWidth - maxWidth
    const minWidth = largestColumn.key.length + padding * 2
    const newWidth = largestColumn.width - difference < minWidth ? minWidth : largestColumn.width - difference
    largestColumn.width = newWidth
    tableWidth = calculateTableWidth(widths)
    if (seen.has(largestColumn.key)) break
    seen.add(largestColumn.key)
  }

  return widths
}

const getHeadings = <T extends ScalarDict>(config: Config<T>): Partial<T> => {
  const {
    columns,
    headerOptions: {formatter},
  } = config
  const format = (header: string | number | symbol) => {
    if (typeof header !== 'string') return header
    if (!formatter) return header

    if (typeof formatter === 'function') return formatter(header)

    switch (formatter) {
      case 'pascalCase': {
        return pascalCase(header)
      }

      case 'capitalCase': {
        return capitalCase(header)
      }

      case 'camelCase': {
        return camelCase(header)
      }

      case 'snakeCase': {
        return snakeCase(header)
      }

      case 'kebabCase': {
        return kebabCase(header)
      }

      case 'constantCase': {
        return constantCase(header)
      }

      case 'sentenceCase': {
        return sentenceCase(header)
      }

      default: {
        return header
      }
    }
  }

  return Object.fromEntries(
    columns.map((c) => {
      const key = typeof c === 'object' ? c.key : c
      const name = typeof c === 'object' ? (c.name ?? key) : c
      return [key, format(name)]
    }),
  ) as Partial<T>
}

class Builder<T extends ScalarDict> {
  constructor(private readonly config: Config<T>) {}

  public data(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: Cell,
      overflow: this.config.overflow,
      padding: this.config.padding,
      skeleton: BORDER_SKELETONS[this.config.borderStyle].data,
    })(props)
  }

  public footer(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: Skeleton,
      overflow: this.config.overflow,
      padding: this.config.padding,
      skeleton: BORDER_SKELETONS[this.config.borderStyle].footer,
    })(props)
  }

  public header(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: Skeleton,
      overflow: this.config.overflow,
      padding: this.config.padding,
      skeleton: BORDER_SKELETONS[this.config.borderStyle].header,
    })(props)
  }

  public headerFooter(props: RowProps<T>): React.ReactNode {
    const {headerFooter} = BORDER_SKELETONS[this.config.borderStyle]
    if (headerFooter) {
      return row<T>({
        cell: Skeleton,
        overflow: this.config.overflow,
        padding: this.config.padding,
        skeleton: headerFooter,
      })(props)
    }

    return false
  }

  public heading(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: Header,
      overflow: this.config.overflow,
      padding: this.config.padding,
      props: this.config.headerOptions,
      skeleton: BORDER_SKELETONS[this.config.borderStyle].heading,
    })(props)
  }

  public separator(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: Skeleton,
      overflow: this.config.overflow,
      padding: this.config.padding,
      skeleton: BORDER_SKELETONS[this.config.borderStyle].separator,
    })(props)
  }
}

function determineConfiguredWidth(providedWidth: number | Percentage | undefined): number {
  if (!providedWidth) return process.stdout.columns

  const num =
    typeof providedWidth === 'string' && providedWidth.endsWith('%')
      ? Math.floor((Number.parseInt(providedWidth, 10) / 100) * process.stdout.columns)
      : typeof providedWidth === 'string'
        ? Number.parseInt(providedWidth, 10)
        : providedWidth

  if (num > process.stdout.columns) {
    return process.stdout.columns
  }

  return num
}

/**
 * Determine the width to use for the table.
 *
 * This allows us to use the minimum width required to display the table if the configured width is too small.
 */
function determineWidthToUse<T>(columns: Column<T>[], configuredWidth: number): number {
  const tableWidth = columns.map((c) => c.width).reduce((a, b) => a + b) + columns.length + 1
  return tableWidth < configuredWidth ? configuredWidth : tableWidth
}

export function Table<T extends ScalarDict>(props: Pick<TableProps<T>, 'data'> & Partial<TableProps<T>>) {
  const config: Config<T> = {
    align: props.align ?? 'left',
    borderStyle: props.borderStyle ?? 'all',
    columns: props.columns ?? getDataKeys(props.data),
    data: props.data,
    headerOptions: props.headerOptions ?? {
      bold: true,
      color: 'blue',
    },
    maxWidth: determineConfiguredWidth(props.maxWidth),
    overflow: props.overflow ?? 'truncate',
    padding: props.padding ?? 1,
  }
  const columns = getColumns(config)
  const headings = getHeadings(config)
  const builder = new Builder<T>(config)

  return (
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
      {builder.header({columns, data: {}, key: 'header'})}
      {builder.heading({columns, data: headings, key: 'heading'})}
      {builder.headerFooter({columns, data: {}, key: 'footer'})}
      {props.data.map((row, index) => {
        // Calculate the hash of the row based on its value and position
        const key = `row-${sha1(row)}-${index}`

        // Construct a row.
        return (
          <Box key={key} flexDirection="column">
            {builder.separator({columns, data: {}, key: `separator-${key}`})}
            {builder.data({columns, data: row, key: `data-${key}`})}
          </Box>
        )
      })}
      {builder.footer({columns, data: {}, key: 'footer'})}
    </Box>
  )
}

type RowConfig = {
  /**
   * Component used to render cells.
   */
  cell: (props: CellProps) => React.ReactNode
  /**
   * Tells the padding of each cell.
   */
  padding: number
  /**
   * Component used to render skeleton in the row.
   */
  skeleton: {
    /**
     * Characters used in skeleton.
     *    |             |
     * (left)-(line)-(cross)-(line)-(right)
     *    |             |
     */
    left: string
    right: string
    cross: string
    line: string
  }
  overflow?: 'wrap' | 'truncate'
  props?: Record<string, unknown>
}

type RowProps<T extends ScalarDict> = {
  readonly key: string
  readonly data: Partial<T>
  readonly columns: Column<T>[]
}

type Column<T> = {
  key: string
  column: keyof T
  width: number
  align: ColumnAlignment
}

const truncate = (value: string, length: number) => `${value.slice(0, length)}...`

// insert new line every x characters
const wrap = (value: string, position: number, padding: number) => {
  const chars = [...value]
  const lines = []
  let line = ''
  let count = 0
  for (const char of chars) {
    if (count === position) {
      lines.push(line)
      line = ''
      count = 0
    }

    line += char
    count++
  }

  lines.push(line)
  return lines.join(`${' '.repeat(padding)}\n${' '.repeat(padding)}`)
}

/**
 * Constructs a Row element from the configuration.
 */
function row<T extends ScalarDict>(config: RowConfig): (props: RowProps<T>) => React.ReactNode {
  // This is a component builder. We return a function.
  const {overflow, padding, skeleton} = config

  return (props) => {
    const data = props.columns.map((column, colI) => {
      const value = props.data[column.column]

      if (value === undefined || value === null) {
        const key = `${props.key}-empty-${column.key}`

        return (
          <config.cell key={key} column={colI} {...config.props}>
            {skeleton.line.repeat(column.width)}
          </config.cell>
        )
      }

      const key = `${props.key}-cell-${column.key}`
      const v =
        // if the visible length of the value is greater than the column width, truncate or wrap
        stripAnsi(String(value)).length >= column.width
          ? overflow === 'wrap'
            ? wrap(String(value), column.width - padding * 2, padding)
            : truncate(String(value), column.width - (3 + padding * 2))
          : String(value)

      const spaces =
        overflow === 'wrap'
          ? column.width - stripAnsi(v).split('\n')[0].trim().length
          : column.width - stripAnsi(v).length
      let marginLeft: number
      let marginRight: number
      if (column.align === 'left') {
        marginLeft = padding
        marginRight = spaces - marginLeft
      } else if (column.align === 'center') {
        marginLeft = Math.floor(spaces / 2)
        marginRight = Math.ceil(spaces / 2)
      } else {
        marginRight = padding
        marginLeft = spaces - marginRight
      }

      return (
        <config.cell key={key} column={colI} {...config.props}>
          {`${skeleton.line.repeat(marginLeft)}${v}${skeleton.line.repeat(marginRight)}`}
        </config.cell>
      )
    })

    const height = data.map((d) => d.props.children.split('\n').length).reduce((a, b) => Math.max(a, b), 0)
    const elements = intersperse((i) => {
      const key = `${props.key}-hseparator-${i}`
      // The horizontal separator.
      return (
        <Skeleton key={key} height={height}>
          {skeleton.cross}
        </Skeleton>
      )
    }, data)

    return (
      <Box flexDirection="row">
        {/* Left */}
        <Skeleton height={height}>{skeleton.left}</Skeleton>
        {/* Data */}
        {...elements}
        {/* Right */}
        <Skeleton height={height}>{skeleton.right}</Skeleton>
      </Box>
    )
  }
}

/**
 * Renders the header of a table.
 */
export function Header(props: React.PropsWithChildren) {
  const {children, ...rest} = props
  return <Text {...rest}>{children}</Text>
}

/**
 * Renders a cell in the table.
 */
export function Cell(props: CellProps) {
  return <Text>{props.children}</Text>
}

/**
 * Renders the scaffold of the table.
 */
export function Skeleton(props: React.PropsWithChildren & {readonly height?: number}) {
  const {children, ...rest} = props
  // repeat Text component height times
  const texts = Array.from({length: props.height ?? 1}, (_, i) => (
    <Text key={i} {...rest}>
      {children}
    </Text>
  ))
  return <Box flexDirection="column">{texts}</Box>
}

/* Utility functions */

/**
 * Intersperses a list of elements with another element.
 */
function intersperse<T, I>(intersperser: (index: number) => I, elements: T[]): (T | I)[] {
  // Intersperse by reducing from left.
  const interspersed: (T | I)[] = elements.reduce(
    (acc, element, index) => {
      // Only add element if it's the first one.
      if (acc.length === 0) return [element]
      // Add the intersperser as well otherwise.
      return [...acc, intersperser(index), element]
    },
    [] as (T | I)[],
  )

  return interspersed
}

export function makeTable<T extends ScalarDict>(options: TableProps<T>): void {
  const {data, ...props} = options || {data: []}
  const instance = render(<Table data={data} {...props} />)
  instance.unmount()
}
