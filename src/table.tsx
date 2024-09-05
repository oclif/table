
/* eslint-disable react/prop-types */

import {Box, Text, render} from 'ink'
import {sha1} from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'

import {BORDER_SKELETONS} from './skeletons.js'
import {
  CellProps,
  Column,
  Config,
  HeaderOptions,
  Percentage,
  RowConfig,
  RowProps,
  ScalarDict,
  TableProps
} from './types.js';
import {allKeysInCollection, getColumns, getHeadings, intersperse, sortData, truncate, wrap} from './utils.js';

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

export function Table<T extends ScalarDict>(props: TableProps<T>) {
  const {
    align = 'left',
    borderStyle = 'all',
    data,
    filter,
    maxWidth,
    orientation = 'horizontal',
    overflow = 'truncate',
    padding = 1,
    sort,
  } = props

  const headerOptions = {bold: true, color: 'blue', ...props.headerOptions} satisfies HeaderOptions
  const processedData = sortData(filter ? data.filter((row) => filter(row)) : data, sort)
  const config: Config<T> = {
    borderStyle,
    columns: props.columns ?? allKeysInCollection(data),
    data: processedData,
    headerOptions,
    maxWidth: determineConfiguredWidth(maxWidth),
    overflow,
    padding,
  }

  const columns = getColumns(config)
  const headings = getHeadings(config)

  const dataComponent = row<T>({
    align,
    cell: Cell,
    overflow,
    padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].data,
  })

  const footerComponent = row<T>({
    align,
    cell: Skeleton,
    overflow,
    padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].footer,
  })

  const headerComponent = row<T>({
    align,
    cell: Skeleton,
    overflow,
    padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].header,
  })

  const {headerFooter} = BORDER_SKELETONS[config.borderStyle]
  const headerFooterComponent = headerFooter ? row<T>({
    align,
    cell: Skeleton,
    overflow,
    padding,
    skeleton: headerFooter,
  }) : () => false

  const headingComponent = row<T>({
    align,
    cell: Header,
    overflow,
    padding,
    props: config.headerOptions,
    skeleton: BORDER_SKELETONS[config.borderStyle].heading,
  })

  const separatorComponent = row<T>({
    align,
    cell: Skeleton,
    overflow,
    padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].separator,
  })

  if (orientation === 'vertical') {
    return (
      <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)} paddingBottom={1}>
        {processedData.map((row, index) => {
          // Calculate the hash of the row based on its value and position
          const key = `row-${sha1(row)}-${index}`
          const maxKeyLength = Math.max(...Object.values(headings).map((c) => c.length))
          // Construct a row.
          return (
            <Box key={key} borderTop borderBottom={false} borderLeft={false} borderRight={false} flexDirection="column" borderStyle="single">
              {/* print all data in key:value pairs */}
              {columns.map((column) => {
                const value = (row[column.column] ?? '').toString()
                const keyName = (headings[column.key] ?? column.key).toString()
                const keyPadding = ' '.repeat(maxKeyLength - keyName.length + padding)
                return (
                  <Box key={`${key}-cell-${column.key}`} flexWrap='wrap'>
                    <Text {...config.headerOptions}>{keyName}{keyPadding}</Text>
                    <Text wrap={overflow}>{value}</Text>
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)} paddingBottom={1}>
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
function row<T extends ScalarDict>(config: RowConfig): (props: RowProps<T>) => React.ReactNode {
  // This is a component builder. We return a function.
  const {align, overflow, padding, skeleton} = config

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
      if (align === 'left') {
        marginLeft = padding
        marginRight = spaces - marginLeft
      } else if (align === 'center') {
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
        <Skeleton height={height}>{skeleton.left}</Skeleton>
        {...elements}
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

/**
 * Renders a table with the given data.
 * @param options see {@link TableProps}
 */
export function makeTable<T extends ScalarDict>(options: TableProps<T>): void {
  const instance = render(<Table {...options} />)
  instance.unmount()
}
