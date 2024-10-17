/* eslint-disable react/prop-types */

import cliTruncate from 'cli-truncate'
import {Box, Text, render} from 'ink'
import {WriteStream} from 'node:tty'
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
  Percentage,
  RowConfig,
  RowProps,
  TableOptions,
} from './types.js'
import {
  allKeysInCollection,
  determineWidthOfWrappedText,
  getColumns,
  getHeadings,
  intersperse,
  maybeStripAnsi,
  sortData,
} from './utils.js'

/**
 * Determines the configured width based on the provided width value.
 * If no width is provided, it returns the width of the current terminal.
 * If the provided width is a percentage, it calculates the width based on the percentage of the terminal width.
 * If the provided width is a number, it returns the provided width.
 * If the calculated width is greater than the terminal width, it returns the terminal width.
 *
 * @param providedWidth - The width value provided.
 * @returns The determined configured width.
 */
function determineConfiguredWidth(
  providedWidth: number | Percentage | undefined,
  columns = process.stdout.columns,
): number {
  if (!providedWidth) return columns

  const num =
    typeof providedWidth === 'string' && providedWidth.endsWith('%')
      ? Math.floor((Number.parseInt(providedWidth, 10) / 100) * columns)
      : typeof providedWidth === 'string'
        ? Number.parseInt(providedWidth, 10)
        : providedWidth

  if (num > columns) {
    return columns
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

function determineTruncatePosition(overflow: Overflow): 'start' | 'middle' | 'end' {
  switch (overflow) {
    case 'truncate-middle': {
      return 'middle'
    }

    case 'truncate-start': {
      return 'start'
    }

    case 'truncate-end': {
      return 'end'
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

    return {marginLeft, marginRight}
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
    const wrappedText = wrapAnsi(valueWithNoZeroWidthChars, spaceForText, {hard: true, trim: true, wordWrap: true})
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

function setup<T extends Record<string, unknown>>(props: TableOptions<T>) {
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
  } = props

  const headerOptions = noStyle ? {} : ({bold: true, color: 'blue', ...props.headerOptions} satisfies HeaderOptions)
  const borderStyle = noStyle ? 'none' : (props.borderStyle ?? 'all')
  const borderColor = noStyle ? undefined : props.borderColor
  const borderProps = {color: borderColor}
  const titleOptions = noStyle ? {} : props.titleOptions

  const processedData = maybeStripAnsi(sortData(filter ? data.filter((row) => filter(row)) : data, sort), noStyle)
  const config: Config<T> = {
    borderStyle,
    columns: props.columns ?? allKeysInCollection(data),
    data: processedData,
    headerOptions,
    horizontalAlignment,
    maxWidth: determineConfiguredWidth(maxWidth),
    overflow,
    padding,
    verticalAlignment,
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
  } = setup(props)

  return (
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
      {title && <Text {...titleOptions}>{title}</Text>}
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

/**
 * A custom WriteStream that captures the frames written to stdout.
 * This allows us to avoid an issue where Ink rerenders the component twice
 * because it uses ansiEscapes.clearTerminal, which doesn't seem to have
 * the desired effect in powershell.
 */
class Stream extends WriteStream {
  private frames: string[] = []

  public lastFrame(): string | undefined {
    return this.frames
      .filter((f) => {
        const stripped = stripAnsi(f)
        return stripped !== '' && stripped !== '\n'
      })
      .at(-1)
  }

  write(data: string): boolean {
    this.frames.push(data)
    return true
  }
}

class Output {
  public stream: Stream | WriteStream

  public constructor(fd = 1) {
    this.stream = process.env.NODE_ENV === 'test' ? process.stdout : new Stream(fd)
  }

  public maybePrintLastFrame() {
    if (this.stream instanceof Stream) {
      process.stdout.write(`${this.stream.lastFrame()}`)
    } else {
      process.stdout.write('\n')
    }
  }
}

function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [] as T[][])
}

function renderTableInChunks<T extends Record<string, unknown>>(props: TableOptions<T>): void {
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
  } = setup(props)

  const headerOutput = new Output()
  const headerInstance = render(
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
      {title && <Text {...titleOptions}>{title}</Text>}
      {headerComponent({columns, data: {}, key: 'header'})}
      {headingComponent({columns, data: headings, key: 'heading'})}
      {headerFooterComponent({columns, data: {}, key: 'footer'})}
    </Box>,
    {stdout: headerOutput.stream},
  )
  headerInstance.unmount()
  headerOutput.maybePrintLastFrame()

  const chunks = chunk(processedData, Math.max(1, Math.floor(process.stdout.rows / 2)))
  for (const chunk of chunks) {
    const chunkOutput = new Output()
    const instance = render(
      <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
        {chunk.map((row, index) => {
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
      </Box>,
      {stdout: chunkOutput.stream},
    )
    instance.unmount()
    chunkOutput.maybePrintLastFrame()
  }

  const footerOutput = new Output()
  const footerInstance = render(
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
      {footerComponent({columns, data: {}, key: 'footer'})}
    </Box>,
    {stdout: footerOutput.stream},
  )
  footerInstance.unmount()
  footerOutput.maybePrintLastFrame()
}

/**
 * Renders a table with the given data.
 * @param options see {@link TableOptions}
 */
export function printTable<T extends Record<string, unknown>>(options: TableOptions<T>): void {
  if (options.data.length > 50_000) {
    renderTableInChunks(options)
    return
  }

  const output = new Output()
  const instance = render(<Table {...options} />, {stdout: output.stream})
  instance.unmount()
  output.maybePrintLastFrame()
}

function Container(props: ContainerProps) {
  return (
    <Box flexWrap="wrap" flexDirection={props.direction ?? 'row'} {...props}>
      {props.children}
    </Box>
  )
}

export function printTables<T extends Record<string, unknown>[]>(
  tables: {[P in keyof T]: TableOptions<T[P]>},
  options?: Omit<ContainerProps, 'children'>,
): void {
  if (tables.reduce((acc, table) => acc + table.data.length, 0) > 30_000) {
    throw new Error('The data is too large to print multiple tables. Please use `printTable` instead.')
  }

  const output = new Output()
  const leftMargin = options?.marginLeft ?? options?.margin ?? 0
  const rightMargin = options?.marginRight ?? options?.margin ?? 0
  const columns = process.stdout.columns - (leftMargin + rightMargin)

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
  output.maybePrintLastFrame()
}
