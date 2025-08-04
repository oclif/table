import React from 'react'

import {BorderStyle} from './skeletons.js'

export type CellProps = React.PropsWithChildren<{readonly column: number}>

export type HorizontalAlignment = 'left' | 'right' | 'center'
export type VerticalAlignment = 'top' | 'center' | 'bottom'
export type Percentage = `${number}%`

export type ColumnProps<T> = {
  /**
   * Horizontal alignment of cell content. Overrides the horizontal alignment set in the table.
   */
  horizontalAlignment?: HorizontalAlignment
  key: T
  /**
   * Name of the column. If not provided, it will default to the key.
   */
  name?: string
  /**
   * Overflow behavior for cells. Overrides the overflow set in the table.
   */
  overflow?: Overflow
  /**
   * Padding for the column. Overrides the padding set in the table.
   */
  padding?: number
  /**
   * Vertical alignment of cell content. Overrides the vertical alignment set in the table.
   */
  verticalAlignment?: VerticalAlignment
  /**
   * Set the width of the column. If not provided, it will default to the width of the content.
   */
  width?: Percentage | number
}
export type AllColumnProps<T> = {[K in keyof T]: ColumnProps<K>}[keyof T]

type TextOptions = {
  color?: SupportedColor
  backgroundColor?: SupportedColor
  bold?: boolean
  dimColor?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  inverse?: boolean
}

export type HeaderFormatter =
  | ((header: string) => string)
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'kebabCase'
  | 'pascalCase'
  | 'sentenceCase'
  | 'snakeCase'

export type SupportedColor =
  | 'black'
  | 'blackBright'
  | 'blue'
  | 'blueBright'
  | 'cyan'
  | 'cyanBright'
  | 'gray'
  | 'green'
  | 'greenBright'
  | 'grey'
  | 'magenta'
  | 'magentaBright'
  | 'red'
  | 'redBright'
  | 'reset'
  | 'white'
  | 'whiteBright'
  | 'yellow'
  | 'yellowBright'
  | `#${string}`
  | `rgb(${number},${number},${number})`

export type HeaderOptions = TextOptions & {
  /**
   * Column header formatter. Can either be a function or a method name on the `change-case` library.
   *
   * See https://www.npmjs.com/package/change-case for more information.
   */
  formatter?: HeaderFormatter
}

export type Overflow = 'wrap' | 'truncate' | 'truncate-middle' | 'truncate-start' | 'truncate-end'

type SortOrder<T> = 'asc' | 'desc' | ((valueA: T, valueB: T) => number)

export type Sort<T> = {
  [K in keyof T]?: SortOrder<T[K]>
}

export type TableOptions<T extends Record<string, unknown>> = {
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
   * Maximum width of the table. Can be a number (e.g. 80) or a percentage (e.g. '80%').
   *
   * By default, the table will only take up as much space as it needs to fit the content. If it extends beyond the maximum width,
   * it will wrap or truncate the content based on the `overflow` option. In other words, this property allows you to set the width
   * at which wrapping or truncation occurs.
   *
   * If not provided, the maximum width will default to the terminal width.
   *
   * If you provide a number or percentage that is larger than the terminal width, it will default to the terminal width.
   *
   * If you provide a number or percentage that is too small to fit the table, it will default to the minimum width of the table.
   */
  maxWidth?: Percentage | number
  /**
   * Exact width of the table. Can be a number (e.g. 80) or a percentage (e.g. '80%').
   *
   * By default, the table will only take up as much space as it needs to fit the content. If you set the `width` option, the table will
   * always take up that amount of space, regardless of the content. If the content is too large, it will wrap or truncate based on the
   * `overflow` option. If it's too small, it will add empty space evenly across the columns.
   *
   * Setting this property will override the `maxWidth` option.
   *
   * If not provided, it will default to the natural width of the table.
   *
   * If you provide a number or percentage that is larger than the terminal width, it will default to the terminal width.
   *
   * If you provide a number or percentage that is too small to fit the table, it will default to the minimum width of the table.
   */
  width?: Percentage | number
  /**
   * Overflow behavior for cells. Defaults to 'truncate'.
   */
  overflow?: Overflow
  /**
   * Styling options for the column headers
   */
  headerOptions?: HeaderOptions
  /**
   * Border style for the table. Defaults to 'all'.
   */
  borderStyle?: BorderStyle
  /**
   * Color of the table border. Defaults to 'white' in dark terminals and 'black' in light terminals.
   */
  borderColor?: SupportedColor
  /**
   * Align data in columns. Defaults to 'left'.
   */
  horizontalAlignment?: HorizontalAlignment
  /**
   * Apply a filter to each row in the table.
   */
  filter?: (row: T) => boolean
  /**
   * Sort the data in the table.
   *
   * Each key in the object should correspond to a column in the table. The value can be 'asc', 'desc', or a custom sort function.
   *
   * The order of the keys determines the order of the sorting. The first key is the primary sort key, the second key is the secondary sort key, and so on.
   *
   * @example
   * ```js
   * const data = [
   * {name: 'Alice', age: 30},
   * {name: 'Bob', age: 25},
   * {name: 'Charlie', age: 35},
   * ]
   *
   * // sort the name column in ascending order
   * printTable({data, sort: {name: 'asc'}})
   *
   * // sort the name column in descending order
   * printTable({data, sort: {name: 'desc'}})
   *
   * // sort by name in ascending order and age in descending order
   * printTable({data, sort: {name: 'asc', age: 'desc'}})
   *
   * // sort by name in ascending order and age in descending order using a custom sort function
   * printTable({data, sort: {name: 'asc', age: (a, b) => b - a}})
   * ```
   */
  sort?: Sort<T>
  /**
   * Vertical alignment of cell content. Defaults to 'top'.
   */
  verticalAlignment?: VerticalAlignment
  /**
   * Title of the table. Displayed above the table.
   */
  title?: string
  /**
   * Whether or not to trim the whitespace of row content
   * default: true
   */
  trimWhitespace?: boolean
  /**
   * Styling options for the title of the table.
   */
  titleOptions?: TextOptions
  /**
   * Disable all styling for the table.
   */
  noStyle?: boolean
}

export type Config<T> = {
  columns: (keyof T | AllColumnProps<T>)[]
  data: T[]
  padding: number
  maxWidth: number
  overflow: Overflow
  headerOptions: HeaderOptions
  borderStyle: BorderStyle
  horizontalAlignment: HorizontalAlignment
  verticalAlignment: VerticalAlignment
  width: number | undefined
}

export type RowConfig = {
  /**
   * Component used to render cells.
   */
  cell: (props: CellProps) => React.ReactNode
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
  props?: Record<string, unknown>
  borderProps: {
    color: SupportedColor | undefined
  }
}

export type RowProps<T extends Record<string, unknown>> = {
  readonly key: string
  readonly data: Partial<T>
  readonly columns: Column<T>[]
}

export type Column<T> = {
  key: string
  column: keyof T
  width: number
  padding: number
  horizontalAlignment: HorizontalAlignment
  verticalAlignment: VerticalAlignment
  overflow: Overflow
}

export type ContainerProps = {
  readonly alignItems?: 'flex-start' | 'flex-end' | 'center'
  readonly children: React.ReactNode
  readonly columnGap?: number
  readonly direction?: 'row' | 'column'
  readonly margin?: number
  readonly marginLeft?: number
  readonly marginRight?: number
  readonly marginTop?: number
  readonly marginBottom?: number
  readonly rowGap?: number
}
