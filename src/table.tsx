/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import { Box, Text, render } from 'ink'
import { sha1 } from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'

/* Table */
/**
 * Features to implement:
 * - [x] properly render cells with ascii characters
 * - [x] refactor
 * - [ ] never render a table that exceeds the width of the terminal
 *       - this will require truncating the content of the cells
 *       - question: how do we know which columns take priority?
 *         - tty-table lets you specify the width of each column, e.g. 50%
 * - [ ] utilities for sorting, filtering, showing extended columns
 */


type Scalar = string | number | boolean | null | undefined

type ScalarDict = {
  [key: string]: Scalar
}

export type CellProps = React.PropsWithChildren<{ readonly column: number }>

export type ColumnAlignment = 'left' | 'right' | 'center'

export interface ColumnProps<T> {
  align?: ColumnAlignment
  key: T
}
export type AllColumnProps<T> = { [K in keyof T]: ColumnProps<K> }[keyof T]

export type TableProps<T extends ScalarDict> = {
  /**
   * List of values (rows).
   */
  data: T[]
  /**
   * Columns that we should display in the table.
   */
  columns: (keyof T | AllColumnProps<T>)[]
  /**
   * Cell padding.
   */
  padding: number
  /**
   * Header component.
   */
  header: (props: React.PropsWithChildren<{}>) => React.ReactNode
  /**
   * Component used to render a cell in the table.
   */
  cell: (props: CellProps) => React.ReactNode
  /**
   * Component used to render the skeleton of the table.
   */
  skeleton: (props: React.PropsWithChildren<{}>) => React.ReactNode
}


const getDataKeys = <T extends ScalarDict>(data: T[]): (keyof T)[] => {
  const keys = new Set<keyof T>()

  // Collect all the keys.
  for (const row of data) {
    for (const key in row) {
      if (key in row) {
        keys.add(key)
      }
    }
  }

  return [...keys]
}

type Config<T> = {
  cell: (props: CellProps) => React.ReactNode
  columns: (keyof T | AllColumnProps<T>)[]
  data: T[]
  header: (props: React.PropsWithChildren<{}>) => React.ReactNode
  padding: number
  skeleton: (props: React.PropsWithChildren<{}>) => React.ReactNode
}

const getColumns = <T extends ScalarDict>(config: Config<T>): Column<T>[] => {
  const {columns, padding} = config

  const widths: Column<T>[] = columns.map((propsOrKey) => {
    const props: ColumnProps<keyof T> =
      typeof propsOrKey === 'object'
        ? propsOrKey
        : { align: 'left', key: propsOrKey }
    const {align, key} = props

    const header = String(key).length
    /* Get the width of each cell in the column */
    const data = config.data.map((data) => {
      const value = data[key]

      if (value === undefined || value === null) return 0
      return stripAnsi(String(value)).length
    })

    const width = Math.max(...data, header) + padding * 2

    /* Construct a cell */
    return {
      align: align ?? 'left',
      column: key,
      key: String(key),
      width,
    }
  })

  return widths
}

const getHeadings = <T extends ScalarDict>(config: Config<T>): Partial<T> => {
  const columns = config.columns.map((c) =>
    typeof c === 'object' ? c.key : c,
  )
  return Object.fromEntries(columns.map((column) => [column, column])) as Partial<T>
}

class Builder<T extends ScalarDict> {

  constructor(private readonly config: Config<T>) {}

  public data(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: this.config.cell,
      padding: this.config.padding,
      skeleton: {
        component: this.config.skeleton,
        cross: '│',
        left: '│',
        line: ' ',
        right: '│',
      },
    })(props)
  }

  public footer(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: this.config.skeleton,
      padding: this.config.padding,
      skeleton: {
        component: this.config.skeleton,
        cross: '┴',
        left: '└',
        line: '─',
        right: '┘',
      },
    })(props)
  }

  public header(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: this.config.skeleton,
      padding: this.config.padding,
      skeleton: {
        component: this.config.skeleton,
        cross: '┬',
        left: '┌',
        line: '─',
        right: '┐',
      },
    })(props)
  }

  public heading(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: this.config.header,
      padding: this.config.padding,
      skeleton: {
        component: this.config.skeleton,
        cross: '│',
        left: '│',
        line: ' ',
        right: '│',
      },
    })(props)
  }

  public separator(props: RowProps<T>): React.ReactNode {
    return row<T>({
      cell: this.config.skeleton,
      padding: this.config.padding,
      skeleton: {
        component: this.config.skeleton,
        cross: '┼',
        left: '├',
        line: '─',
        right: '┤',
      },
    })(props)
  }
}

export function Table<T extends ScalarDict>(
  props: Pick<TableProps<T>, 'data'> & Partial<TableProps<T>>,
) {
  const config: Config<T> = {
    cell: props.cell || Cell,
    columns: props.columns || getDataKeys(props.data),
    data: props.data,
    header: props.header || Header,
    padding: props.padding || 1,
    skeleton: props.skeleton || Skeleton,
  }
  const columns = getColumns(config)
  const headings = getHeadings(config)
  const builder = new Builder<T>(config)

  return (
    <Box flexDirection="column">
      {/* Header */}
      {builder.header({ columns, data: {}, key: 'header' })}
      {builder.heading({ columns, data: headings, key: 'heading' })}
      {/* Data */}
      {props.data.map((row, index) => {
        // Calculate the hash of the row based on its value and position
        const key = `row-${sha1(row)}-${index}`

        // Construct a row.
        return (
          <Box key={key} flexDirection="column">
            {builder.separator({ columns, data: {}, key: `separator-${key}` })}
            {builder.data({ columns, data: row, key: `data-${key}` })}
          </Box>
        )
      })}
      {/* Footer */}
      {builder.footer({ columns, data: {}, key: 'footer' })}
    </Box>
  )
}

/* Helper components */

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
    component: (props: React.PropsWithChildren<{}>) => React.ReactNode
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
}

type RowProps<T extends ScalarDict> = {
  key: string
  data: Partial<T>
  columns: Column<T>[]
}

type Column<T> = {
  key: string
  column: keyof T
  width: number
  align: ColumnAlignment
}

/**
 * Constructs a Row element from the configuration.
 */
function row<T extends ScalarDict>(
  config: RowConfig,
): (props: RowProps<T>) => React.ReactNode {
  /* This is a component builder. We return a function. */

  const {padding, skeleton} = config

  /* Row */
  return (props) => (
    <Box flexDirection="row">
      {/* Left */}
      <skeleton.component>{skeleton.left}</skeleton.component>
      {/* Data */}
      {...intersperse(
        (i) => {
          const key = `${props.key}-hseparator-${i}`

          // The horizontal separator.
          return (
            <skeleton.component key={key}>{skeleton.cross}</skeleton.component>
          )
        },

        // Values.
        props.columns.map((column, colI) => {
          // content
          const value = props.data[column.column]

          if (value === undefined || value === null) {
            const key = `${props.key}-empty-${column.key}`

            return (
              <config.cell key={key} column={colI}>
                {skeleton.line.repeat(column.width)}
              </config.cell>
            )
          }

            const key = `${props.key}-cell-${column.key}`

            // const shouldTruncate = stringWidth(String(value)) > column.width

            // margins
            const spaces = column.width - stripAnsi(String(value)).length
            let ml: number
            let mr: number
            if (column.align === 'left') {
              ml = padding
              mr = spaces - ml
            } else if (column.align === 'center') {
              ml = Math.floor(spaces / 2)
              mr = Math.ceil(spaces / 2)
            } else {
              mr = padding
              ml = spaces - mr
            }

            return (
              /* prettier-ignore */
              <config.cell key={key} column={colI}>
                {`${skeleton.line.repeat(ml)}${String(value)}${skeleton.line.repeat(mr)}`}
              </config.cell>
            )

        }),
      )}
      {/* Right */}
      <skeleton.component>{skeleton.right}</skeleton.component>
    </Box>
  )
}

/**
 * Renders the header of a table.
 */
export function Header(props: React.PropsWithChildren<{}>) {
  return (
    <Text bold color="blue">
      {props.children}
    </Text>
  )
}

/**
 * Renders a cell in the table.
 */
export function Cell(props: CellProps) {
  return <Text>{props.children}</Text>
}

/**
 * Redners the scaffold of the table.
 */
export function Skeleton(props: React.PropsWithChildren<{}>) {
  return <Text bold>{props.children}</Text>
}

/* Utility functions */

/**
 * Intersperses a list of elements with another element.
 */
function intersperse<T, I>(
  intersperser: (index: number) => I,
  elements: T[],
): (T | I)[] {
  // Intersparse by reducing from left.
  const interspersed: (T | I)[] = elements.reduce((acc, element, index) => {
    // Only add element if it's the first one.
    if (acc.length === 0) return [element]
    // Add the intersparser as well otherwise.
    return [...acc, intersperser(index), element]
  }, [] as (T | I)[])

  return interspersed
}

export function makeTable<T extends ScalarDict>(
  data: T[],
  // columns?: (keyof T | AllColumnProps<T>)[],
  // props?: Partial<TableProps<T>> = {},
): void{
  const instance = render(<Table data={data} />)
  instance.unmount()
}
