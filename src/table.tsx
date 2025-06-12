/* eslint-disable react/prop-types */

import cliTruncate from 'cli-truncate'
import {Box, render, Text} from 'ink'
import {EventEmitter} from 'node:events'
import {env} from 'node:process'
import {sha1} from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'
import wrapAnsi from 'wrap-ansi'

import {BORDER_SKELETONS} from './skeletons.js'
import {
  CellProps,
  Column,
  Config,
  ContainerProps,
  HeaderOptions,
  HorizontalAlignment,
  Overflow,
  RowConfig,
  RowProps,
  TableOptions,
} from './types.js'
import {
  allKeysInCollection,
  determineConfiguredWidth,
  determineWidthOfWrappedText,
  getColumns,
  getColumnWidth,
  getHeadings,
  intersperse,
  maybeStripAnsi,
  shouldUsePlainTable,
  sortData,
} from './utils.js'

/**
 * Determine the width to use for the table.
 *
 * This allows us to use the minimum width required to display the table if the configured width is too small.
 */
function determineWidthToUse<T>(columns: Column<T>[], maxWidth: number, width: number | undefined): number {
  const tableWidth = columns.map((c) => c.width).reduce((a, b) => a + b, 0) + columns.length + 1
  return width ?? (tableWidth < maxWidth ? maxWidth : tableWidth)
}

function determineTruncatePosition(overflow: Overflow): 'start' | 'middle' | 'end' {
  switch (overflow) {
    case 'truncate-end': {
      return 'end'
    }

    case 'truncate-middle': {
      return 'middle'
    }

    case 'truncate-start': {
      return 'start'
    }

    default: {
      return 'end'
    }
  }
}

export function formatTextWithMargins({
  horizontalAlignment,
  overflow,
  padding,
  value,
  width,
}: {
  overflow: Overflow
  value: unknown
  width: number
  padding: number
  horizontalAlignment: HorizontalAlignment
}): {
  text: string
  marginLeft: number
  marginRight: number
} {
  function calculateMargins(spaces: number): {marginLeft: number; marginRight: number} {
    let marginLeft: number
    let marginRight: number
    if (spaces <= 0 || Number.isNaN(spaces)) {
      return {marginLeft: 0, marginRight: 0}
    }

    if (horizontalAlignment === 'left') {
      marginLeft = padding
      marginRight = spaces - marginLeft
    } else if (horizontalAlignment === 'center') {
      marginLeft = Math.floor(spaces / 2)
      marginRight = Math.ceil(spaces / 2)
    } else {
      marginRight = padding
      marginLeft = spaces - marginRight
    }

    return {
      // Ensure that the margin is never negative
      marginLeft: Math.max(0, marginLeft),
      marginRight: Math.max(0, marginRight),
    }
  }

  // Some terminals don't play nicely with zero-width characters, so we replace them with spaces.
  // https://github.com/sindresorhus/terminal-link/issues/18
  // https://github.com/Shopify/cli/pull/995
  const valueWithNoZeroWidthChars = String(value).replaceAll('​', ' ')
  const spaceForText = width - padding * 2

  if (stripAnsi(valueWithNoZeroWidthChars).length <= spaceForText) {
    const spaces = width - stripAnsi(valueWithNoZeroWidthChars).length
    return {
      text: valueWithNoZeroWidthChars,
      ...calculateMargins(spaces),
    }
  }

  if (overflow === 'wrap') {
    const wrappedText = wrapAnsi(valueWithNoZeroWidthChars, spaceForText, {
      hard: true,
      trim: true,
      wordWrap: true,
    }).replace(/^\n/, '') // remove leading newline (wrapAnsi adds it to emojis)
    const {marginLeft, marginRight} = calculateMargins(width - determineWidthOfWrappedText(stripAnsi(wrappedText)))

    const lines = wrappedText.split('\n').map((line, idx) => {
      const {marginLeft: lineSpecificLeftMargin, marginRight: lineSpecificRightMargin} = calculateMargins(
        width - stripAnsi(line).length,
      )

      if (horizontalAlignment === 'left') {
        return idx === 0
          ? `${line}${' '.repeat(lineSpecificRightMargin - marginRight)}`
          : `${' '.repeat(marginLeft)}${line}${' '.repeat(lineSpecificRightMargin - marginRight)}`
      }

      if (horizontalAlignment === 'center') {
        return idx === 0
          ? `${' '.repeat(lineSpecificLeftMargin - marginLeft)}${line}${' '.repeat(lineSpecificRightMargin)}`
          : `${' '.repeat(lineSpecificLeftMargin)}${line}${' '.repeat(lineSpecificRightMargin - marginRight)}`
      }

      // right alignment
      return idx === 0
        ? `${' '.repeat(Math.max(0, lineSpecificLeftMargin - marginLeft))}${line}${' '.repeat(lineSpecificRightMargin - marginRight)}`
        : `${' '.repeat(lineSpecificLeftMargin)}${line}${' '.repeat(lineSpecificRightMargin - marginRight)}`
    })

    return {
      marginLeft,
      marginRight,
      text: lines.join('\n'),
    }
  }

  const text = cliTruncate(valueWithNoZeroWidthChars.replaceAll('\n', ' '), spaceForText, {
    position: determineTruncatePosition(overflow),
  })
  const spaces = width - stripAnsi(text).length
  return {
    text,
    ...calculateMargins(spaces),
  }
}

function setupTable<T extends Record<string, unknown>>(props: TableOptions<T>) {
  const {
    data,
    filter,
    horizontalAlignment = 'left',
    maxWidth,
    noStyle = false,
    overflow = 'truncate',
    padding = 1,
    sort,
    title,
    verticalAlignment = 'top',
    width,
  } = props

  const headerOptions = noStyle ? {} : ({bold: true, color: 'blue', ...props.headerOptions} satisfies HeaderOptions)
  const borderStyle = noStyle ? 'none' : (props.borderStyle ?? 'all')
  const borderColor = noStyle ? undefined : props.borderColor
  const borderProps = {color: borderColor}
  const titleOptions = noStyle ? {} : props.titleOptions

  const processedData = maybeStripAnsi(sortData(filter ? data.filter((row) => filter(row)) : data, sort), noStyle)
  const tableWidth = width ? determineConfiguredWidth(width) : undefined
  const config: Config<T> = {
    borderStyle,
    columns: props.columns ?? allKeysInCollection(data),
    data: processedData,
    headerOptions,
    horizontalAlignment,
    maxWidth: tableWidth ?? determineConfiguredWidth(maxWidth),
    overflow,
    padding,
    verticalAlignment,
    width: tableWidth,
  }

  const headings = getHeadings(config)
  const columns = getColumns(config, headings)
  // check for duplicate columns
  const columnKeys = columns.map((c) => c.key)
  const duplicates = columnKeys.filter((c, i) => columnKeys.indexOf(c) !== i)
  if (duplicates.length > 0) {
    throw new Error(`Duplicate columns found: ${duplicates.join(', ')}`)
  }

  const dataComponent = row<T>({
    borderProps,
    cell: Cell,
    skeleton: BORDER_SKELETONS[config.borderStyle].data,
  })

  const footerComponent = row<T>({
    borderProps,
    cell: Skeleton,
    props: borderProps,
    skeleton: BORDER_SKELETONS[config.borderStyle].footer,
  })

  const headerComponent = row<T>({
    borderProps,
    cell: Skeleton,
    props: borderProps,
    skeleton: BORDER_SKELETONS[config.borderStyle].header,
  })

  const {headerFooter} = BORDER_SKELETONS[config.borderStyle]
  const headerFooterComponent = headerFooter
    ? row<T>({
        borderProps,
        cell: Skeleton,
        props: borderProps,
        skeleton: headerFooter,
      })
    : () => false

  const headingComponent = row<T>({
    borderProps,
    cell: Header,
    props: config.headerOptions,
    skeleton: BORDER_SKELETONS[config.borderStyle].heading,
  })

  const separatorComponent = row<T>({
    borderProps,
    cell: Skeleton,
    props: borderProps,
    skeleton: BORDER_SKELETONS[config.borderStyle].separator,
  })

  return {
    columns,
    config,
    dataComponent,
    footerComponent,
    headerComponent,
    headerFooterComponent,
    headingComponent,
    headings,
    processedData,
    separatorComponent,
    title,
    titleOptions,
  }
}

export function Table<T extends Record<string, unknown>>(props: TableOptions<T>) {
  const {
    columns,
    config,
    dataComponent,
    footerComponent,
    headerComponent,
    headerFooterComponent,
    headingComponent,
    headings,
    processedData,
    separatorComponent,
    title,
    titleOptions,
  } = setupTable(props)

  return (
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth, config.width)}>
      {title ? <Text {...titleOptions}>{title}</Text> : null}
      {headerComponent({columns, data: {}, key: 'header'})}
      {headingComponent({columns, data: headings, key: 'heading'})}
      {headerFooterComponent({columns, data: {}, key: 'footer'})}
      {processedData.map((row, index) => {
        // Calculate the hash of the row based on its value and position
        const key = `row-${sha1(row)}-${index}`

        // Construct a row.
        return (
          <Box key={key} flexDirection="column">
            {separatorComponent({columns, data: {}, key: `separator-${key}`})}
            {dataComponent({columns, data: row, key: `data-${key}`})}
          </Box>
        )
      })}
      {footerComponent({columns, data: {}, key: 'footer'})}
    </Box>
  )
}

/**
 * Constructs a Row element from the configuration.
 */
function row<T extends Record<string, unknown>>(config: RowConfig): (props: RowProps<T>) => React.ReactNode {
  // This is a component builder. We return a function.
  const {borderProps, skeleton} = config

  return (props) => {
    const data = props.columns.map((column, colI) => {
      const {horizontalAlignment, overflow, padding, verticalAlignment, width} = column
      const value = props.data[column.column]

      if (value === undefined || value === null) {
        const key = `${props.key}-empty-${column.key}`

        return (
          <config.cell key={key} column={colI} {...config.props}>
            {skeleton.line.repeat(width)}
          </config.cell>
        )
      }

      const key = `${props.key}-cell-${column.key}`
      const {marginLeft, marginRight, text} = formatTextWithMargins({
        horizontalAlignment,
        overflow,
        padding,
        value,
        width,
      })

      const alignItems =
        verticalAlignment === 'top' ? 'flex-start' : verticalAlignment === 'center' ? 'center' : 'flex-end'
      return (
        <config.cell key={key} column={colI} {...{alignItems}} {...config.props}>
          {`${skeleton.line.repeat(marginLeft)}${text}${skeleton.line.repeat(marginRight)}`}
        </config.cell>
      )
    })

    const height = data.map((d) => d.props.children.split('\n').length).reduce((a, b) => Math.max(a, b), 0)
    const elements = intersperse((i) => {
      const key = `${props.key}-hseparator-${i}`
      // The horizontal separator.
      return (
        <Skeleton key={key} height={height} {...borderProps}>
          {skeleton.cross}
        </Skeleton>
      )
    }, data)

    return (
      <Box flexDirection="row">
        <Skeleton height={height} {...borderProps}>
          {skeleton.left}
        </Skeleton>
        {...elements}
        <Skeleton height={height} {...borderProps}>
          {skeleton.right}
        </Skeleton>
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
  return (
    <Box {...props}>
      <Text>{props.children}</Text>
    </Box>
  )
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

type FakeStdout = {
  lastFrame: () => string
} & NodeJS.WriteStream

/**
 * Return a custom WriteStream that captures the frames written to stdout.
 * This allows us to avoid an issue where Ink rerenders the component twice
 * because it uses ansiEscapes.clearTerminal, which doesn't seem to have
 * the desired effect in powershell.
 *
 * Implementation inspired by https://github.com/vadimdemedes/ink/blob/master/test/helpers/create-stdout.ts
 */
const createStdout = (): FakeStdout => {
  // eslint-disable-next-line unicorn/prefer-event-target
  const stdout = new EventEmitter() as unknown as FakeStdout
  // Override the rows so that ink doesn't clear the entire terminal when
  // unmounting the component and the height of the output is greater than
  // the height of the terminal
  // https://github.com/vadimdemedes/ink/blob/v5.0.1/src/ink.tsx#L174
  // This might be a bad idea but it works.
  stdout.rows = 10_000
  stdout.columns = getColumnWidth()
  const frames: string[] = []

  stdout.write = (data: string) => {
    frames.push(data)
    return true
  }

  stdout.lastFrame = () =>
    frames
      .filter((f) => {
        const stripped = stripAnsi(f)
        return stripped !== '' && stripped !== '\n'
      })
      .at(-1) ?? ''

  return stdout
}

class Output {
  public stream: FakeStdout

  public constructor() {
    this.stream = createStdout()
  }

  public printLastFrame() {
    process.stdout.write(`${this.stream.lastFrame()}\n`)
  }
}

function renderPlainTable<T extends Record<string, unknown>>(props: TableOptions<T>): void {
  const {columns, headings, processedData, title} = setupTable(props)

  if (title) console.log(title)
  const headerString = columns.reduce((acc, column) => {
    const {horizontalAlignment, overflow, padding, width} = column
    const {marginLeft, marginRight, text} = formatTextWithMargins({
      horizontalAlignment,
      overflow,
      padding,
      value: headings[column.column] ?? column.column,
      width,
    })

    return `${acc}${' '.repeat(marginLeft)}${text}${' '.repeat(marginRight)}`
  }, '')
  console.log(headerString)
  console.log('-'.repeat(headerString.length))

  for (const row of processedData) {
    const stringToPrint = columns.reduce((acc, column) => {
      const {horizontalAlignment, overflow, padding, width} = column
      const value = row[column.column]

      if (value === undefined || value === null) {
        return `${acc}${' '.repeat(width)}`
      }

      const {marginLeft, marginRight, text} = formatTextWithMargins({
        horizontalAlignment,
        overflow,
        padding,
        value,
        width,
      })

      return `${acc}${' '.repeat(marginLeft)}${text}${' '.repeat(marginRight)}`
    }, '')
    console.log(stringToPrint)
  }

  console.log()
}

/**
 * Prints a table based on the provided options. If the data length exceeds 10,000 entries,
 * the table is rendered in a non-styled format to avoid memory issues.
 *
 * @template T - A generic type that extends a record with string keys and unknown values.
 * @param {TableOptions<T>} options - The options for rendering the table, including data and other configurations.
 * @returns {void}
 */
export function printTable<T extends Record<string, unknown>>(options: TableOptions<T>): void {
  const limit = Number.parseInt(env.OCLIF_TABLE_LIMIT ?? env.SF_TABLE_LIMIT ?? '10000', 10) ?? 10_000
  if (options.data.length >= limit || shouldUsePlainTable()) {
    renderPlainTable(options)
    return
  }

  const output = new Output()
  const instance = render(<Table {...options} />, {stdout: output.stream})
  instance.unmount()
  output.printLastFrame()
}

/**
 * Generates a table as a string based on the provided options.
 *
 * @template T - A generic type extending a record with string keys and unknown values.
 * @param {TableOptions<T>} options - The options to configure the table.
 * @returns {string} The rendered table as a string.
 */
export function makeTable<T extends Record<string, unknown>>(options: TableOptions<T>): string {
  const output = new Output()
  const instance = render(<Table {...options} />, {stdout: output.stream})
  instance.unmount()
  return output.stream.lastFrame() ?? ''
}

function Container(props: ContainerProps) {
  return (
    <Box flexWrap="wrap" flexDirection={props.direction ?? 'row'} {...props}>
      {props.children}
    </Box>
  )
}

/**
 * Prints multiple tables to the console.
 *
 * @template T - An array of records where each record represents a table.
 * @param {Object.<keyof T, TableOptions<T[keyof T]>>} tables - An object containing table options for each table.
 * @param {Omit<ContainerProps, 'children'>} [options] - Optional container properties excluding 'children'.
 * @throws {Error} Throws an error if the total number of rows across all tables exceeds 30,000.
 */
export function printTables<T extends Record<string, unknown>[]>(
  tables: {[P in keyof T]: TableOptions<T[P]>},
  options?: Omit<ContainerProps, 'children'>,
): void {
  if (tables.reduce((acc, table) => acc + table.data.length, 0) > 10_000) {
    throw new Error('The data is too large to print multiple tables. Please use `printTable` instead.')
  }

  const output = new Output()
  const leftMargin = options?.marginLeft ?? options?.margin ?? 0
  const rightMargin = options?.marginRight ?? options?.margin ?? 0
  const columns = getColumnWidth() - (leftMargin + rightMargin)
  const processed = tables.map((table) => ({
    ...table,
    // adjust maxWidth to account for margin and columnGap
    maxWidth: determineConfiguredWidth(table.maxWidth, columns) - (options?.columnGap ?? 0) * tables.length,
  }))

  const instance = render(
    <Container {...options}>
      {processed.map((table) => (
        <Table key={sha1(table)} {...table} />
      ))}
    </Container>,
    {stdout: output.stream},
  )
  instance.unmount()
  output.printLastFrame()
}
