
/* eslint-disable react/prop-types */

import {Box, Text, render} from 'ink'
import {sha1} from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'

import {BORDER_SKELETONS} from './skeletons.js'
import {CellProps, Column, Config, Percentage, RowConfig, RowProps, ScalarDict, TableProps} from './types.js';
import {allKeysInCollection, filterData, getColumns, getHeadings, intersperse, sortData, truncate, wrap} from './utils.js';

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
    columns: props.columns ?? allKeysInCollection(props.data),
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
  const data = sortData(filterData(props.data, props.filter ?? {}), props.sort)

  const dataComponent = row<T>({
    cell: Cell,
    overflow: config.overflow,
    padding: config.padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].data,
  })

  const footerComponent = row<T>({
    cell: Skeleton,
    overflow: config.overflow,
    padding: config.padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].footer,
  })

  const headerComponent = row<T>({
    cell: Skeleton,
    overflow: config.overflow,
    padding: config.padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].header,
  })

  const {headerFooter} = BORDER_SKELETONS[config.borderStyle]
  const headerFooterComponent = headerFooter ? row<T>({
    cell: Skeleton,
    overflow: config.overflow,
    padding: config.padding,
    skeleton: headerFooter,
  }) : () => false

  const headingComponent = row<T>({
    cell: Header,
    overflow: config.overflow,
    padding: config.padding,
    props: config.headerOptions,
    skeleton: BORDER_SKELETONS[config.borderStyle].heading,
  })

  const separatorComponent = row<T>({
    cell: Skeleton,
    overflow: config.overflow,
    padding: config.padding,
    skeleton: BORDER_SKELETONS[config.borderStyle].separator,
  })

  return (
    <Box flexDirection="column" width={determineWidthToUse(columns, config.maxWidth)}>
      {headerComponent({columns, data: {}, key: 'header'})}
      {headingComponent({columns, data: headings, key: 'heading'})}
      {headerFooterComponent({columns, data: {}, key: 'footer'})}
      {data.map((row, index) => {
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

/**
 * Renders a table with the given data.
 * @param options see {@link TableProps}
 */
export function makeTable<T extends ScalarDict>(options: TableProps<T>): void {
  const {data, ...props} = options || {data: []}
  const instance = render(<Table data={data} {...props} />)
  instance.unmount()
}
