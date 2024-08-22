import {BorderStyle} from './skeletons.js'

export type Scalar = string | number | boolean | null | undefined

export type ScalarDict = {
  [key: string]: Scalar
}

export type CellProps = React.PropsWithChildren<{readonly column: number}>

export type ColumnAlignment = 'left' | 'right' | 'center'

export interface ColumnProps<T> {
  key: T
  name?: string
}
export type AllColumnProps<T> = {[K in keyof T]: ColumnProps<K>}[keyof T]

export type Percentage = `${number}%`

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

export type HeaderOptions = {
  color?: SupportedColor
  backgroundColor?: SupportedColor
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
  /**
   * Filter the data in the table.
   *
   * Each key in the object should correspond to a column in the table. The value can be a string or a regular expression.
   *
   * @example
   * ```js
   * const data = [
   *  {name: 'Alice', age: 30},
   *  {name: 'Bob', age: 25},
   *  {name: 'Charlie', age: 35},
   * ]
   *
   * // filter the name column with a string
   * makeTable({data, filter: {name: 'Alice'}})
   *
   * // filter the name column with a regular expression
   * makeTable({data, filter: {name: /^A/}})
   * ```
   */
  filter?: Partial<Record<keyof T, boolean | string | RegExp>>
  /**
   * Sort the data in the table.
   *
   * Each key in the object should correspond to a column in the table. The value can be 'asc' or 'desc'.
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
   * makeTable({data, sort: {name: 'asc'}})
   *
   * // sort the name column in descending order
   * makeTable({data, sort: {name: 'desc'}})
   *
   * // sort by name in ascending order and age in descending order
   * makeTable({data, sort: {name: 'asc', age: 'desc'}})
   * ```
   */
  sort?: Partial<Record<keyof T, 'asc' | 'desc'>>
}

export type Config<T> = {
  align: ColumnAlignment
  columns: (keyof T | AllColumnProps<T>)[]
  data: T[]
  padding: number
  maxWidth: number
  overflow: 'wrap' | 'truncate'
  headerOptions: HeaderOptions
  borderStyle: BorderStyle
}

export type RowConfig = {
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

export type RowProps<T extends ScalarDict> = {
  readonly key: string
  readonly data: Partial<T>
  readonly columns: Column<T>[]
}

export type Column<T> = {
  key: string
  column: keyof T
  width: number
  align: ColumnAlignment
}
