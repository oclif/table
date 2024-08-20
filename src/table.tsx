/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */
import { Box, Text, render } from 'ink'
import { sha1 } from 'object-hash'
import React from 'react'
import stripAnsi from 'strip-ansi'

/* Table */

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
  header: (props: React.PropsWithChildren<{}>) => JSX.Element
  /**
   * Component used to render a cell in the table.
   */
  cell: (props: CellProps) => JSX.Element
  /**
   * Component used to render the skeleton of the table.
   */
  skeleton: (props: React.PropsWithChildren<{}>) => JSX.Element
}

/* Table */

export class Table<T extends ScalarDict> extends React.Component<
  Pick<TableProps<T>, 'data'> & Partial<TableProps<T>>
> {
  /* Config */

  // The row with the data.
  data = row<T>({
    cell: this.getConfig().cell,
    padding: this.getConfig().padding,
    skeleton: {
      component: this.getConfig().skeleton,
      cross: '│',
      left: '│',
      // chars
      line: ' ',
      right: '│',
    },
  })

  // The bottom most line of the table.
  footer = row<T>({
    cell: this.getConfig().skeleton,
    padding: this.getConfig().padding,
    skeleton: {
      component: this.getConfig().skeleton,
      cross: '┴',
      left: '└',
      // chars
      line: '─',
      right: '┘',
    },
  })

  // The top most line in the table.
  header = row<T>({
    cell: this.getConfig().skeleton,
    padding: this.getConfig().padding,
    skeleton: {
      component: this.getConfig().skeleton,
      cross: '┬',
      left: '┌',
      // chars
      line: '─',
      right: '┐',
    },
  })

  // The line with column names.
  heading = row<T>({
    cell: this.getConfig().header,
    padding: this.getConfig().padding,
    skeleton: {
      component: this.getConfig().skeleton,
      cross: '│',
      left: '│',
      // chars
      line: ' ',
      right: '│',
    },
  })

  /* Rendering utilities */

  // The line that separates rows.
  separator = row<T>({
    cell: this.getConfig().skeleton,
    padding: this.getConfig().padding,
    skeleton: {
      component: this.getConfig().skeleton,
      cross: '┼',
      left: '├',
      // chars
      line: '─',
      right: '┤',
    },
  })

  /**
   * Calculates the width of each column by finding
   * the longest value in a cell of a particular column.
   *
   * Returns a list of column names and their widths.
   */
  getColumns(): Column<T>[] {
    const { columns, padding } = this.getConfig()

    const widths: Column<T>[] = columns.map((propsOrKey) => {
      const props: ColumnProps<keyof T> =
        typeof propsOrKey === 'object'
          ? propsOrKey
          : { align: 'left', key: propsOrKey }
      const {align, key} = props

      const header = String(key).length
      /* Get the width of each cell in the column */
      const data = this.props.data.map((data) => {
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

  /**
   * Merges provided configuration with defaults.
   */
  getConfig(): TableProps<T> {
    return {
      cell: this.props.cell || Cell,
      columns: this.props.columns || this.getDataKeys(),
      data: this.props.data,
      header: this.props.header || Header,
      padding: this.props.padding || 1,
      skeleton: this.props.skeleton || Skeleton,
    }
  }

  /**
   * Gets all keys used in data by traversing through the data.
   */
  getDataKeys(): (keyof T)[] {
    const keys = new Set<keyof T>()

    // Collect all the keys.
    for (const data of this.props.data) {
      for (const key in data) {
        if (key in data) {
          keys.add(key)
        }
      }
    }

    return [...keys]
  }

  /**
   * Returns a (data) row representing the headings.
   */
  getHeadings(): Partial<T> {
    const columns = this.getConfig().columns.map((c) =>
      typeof c === 'object' ? c.key : c,
    )

    const headings: Partial<T> = columns.reduce(
      (acc, column) => ({ ...acc, [column]: column }),
      {} as Partial<T>,
    )

    return headings
  }

  /* Render */

  render() {
    /* Data */
    const columns = this.getColumns()
    const headings = this.getHeadings()

    /**
     * Render the table line by line.
     */
    return (
      <Box flexDirection="column">
        {/* Header */}
        {this.header({ columns, data: {}, key: 'header' })}
        {this.heading({ columns, data: headings, key: 'heading' })}
        {/* Data */}
        {this.props.data.map((row, index) => {
          // Calculate the hash of the row based on its value and position
          const key = `row-${sha1(row)}-${index}`

          // Construct a row.
          return (
            <Box key={key} flexDirection="column">
              {this.separator({ columns, data: {}, key: `separator-${key}` })}
              {this.data({ columns, data: row, key: `data-${key}` })}
            </Box>
          )
        })}
        {/* Footer */}
        {this.footer({ columns, data: {}, key: 'footer' })}
      </Box>
    )
  }
}

/* Helper components */

type RowConfig = {
  /**
   * Component used to render cells.
   */
  cell: (props: CellProps) => JSX.Element
  /**
   * Tells the padding of each cell.
   */
  padding: number
  /**
   * Component used to render skeleton in the row.
   */
  skeleton: {
    component: (props: React.PropsWithChildren<{}>) => JSX.Element
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
): (props: RowProps<T>) => JSX.Element {
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
