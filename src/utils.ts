import {camelCase, capitalCase, constantCase, kebabCase, pascalCase, sentenceCase, snakeCase} from 'change-case'
import {orderBy} from 'natural-orderby'
import {env} from 'node:process'
import stripAnsi from 'strip-ansi'

import {Column, ColumnProps, Config, Percentage, Sort} from './types.js'

/**
 * Intersperses a list of elements with another element.
 *
 * @example
 * ```js
 * intersperse(() => 'foo', [1, 2, 3]) // => [1, 'foo', 2, 'foo', 3]
 * ```
 */
export function intersperse<T, I>(intersperser: (index: number) => I, elements: T[]): (T | I)[] {
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

export function sortData<T extends Record<string, unknown>>(data: T[], sort?: Sort<T> | undefined): T[] {
  if (!sort) return data
  const identifiers = Object.keys(sort)
  const orders = Object.values(sort)
  return orderBy(data, identifiers, orders)
}

export function allKeysInCollection<T extends Record<string, unknown>>(data: T[]): (keyof T)[] {
  const keys = new Set<keyof T>()
  for (const row of data) {
    for (const key in row) {
      if (key in row) keys.add(key)
    }
  }

  return [...keys]
}

export function determineWidthOfWrappedText(text: string): number {
  const lines = text.split('\n')
  return lines.reduce((max, line) => Math.max(max, line.length), 0)
}

// In certain systems, `process.stdout.columns` can be 0
// The column width is calculated by:
// 1. The value of `OCLIF_TABLE_COLUMN_OVERRIDE` (if set)
// 2. The value of `process.stdout.columns`
// 3. If `process.stdout.columns` is 0, use 80
export function getColumnWidth(): number {
  return Number.parseInt(process.env.OCLIF_TABLE_COLUMN_OVERRIDE || '0', 10) || process.stdout.columns || 80
}

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
export function determineConfiguredWidth(
  providedWidth: number | Percentage | undefined,
  columns = getColumnWidth(),
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

export function getColumns<T extends Record<string, unknown>>(config: Config<T>, headings: Partial<T>): Column<T>[] {
  const {columns, horizontalAlignment, maxWidth, overflow, verticalAlignment, width} = config

  const widths: Column<T>[] = columns.map((propsOrKey) => {
    const props: ColumnProps<keyof T> = typeof propsOrKey === 'object' ? propsOrKey : {key: propsOrKey}
    const {key} = props
    const padding = props.padding ?? config.padding

    // Get the width of each cell in the column
    const data = config.data.map((data) => {
      const value = data[key]

      if (value === undefined || value === null) return 0
      // Some terminals don't play nicely with zero-width characters, so we replace them with spaces.
      // https://github.com/sindresorhus/terminal-link/issues/18
      // https://github.com/Shopify/cli/pull/995
      return determineWidthOfWrappedText(stripAnsi(String(value).replaceAll('​', ' ')))
    })

    const header = String(headings[key]).length
    // If a column width is provided, use that. Otherwise, use the width of the largest cell in the column.
    const columnWidth = props.width
      ? determineConfiguredWidth(props.width, width ?? maxWidth)
      : Math.max(...data, header) + padding * 2

    return {
      column: key,
      horizontalAlignment: props.horizontalAlignment ?? horizontalAlignment,
      key: String(key),
      overflow: props.overflow ?? overflow,
      padding,
      verticalAlignment: props.verticalAlignment ?? verticalAlignment,
      width: columnWidth,
    }
  })

  const numberOfBorders = widths.length + 1

  const calculateTableWidth = (widths: Column<T>[]) =>
    widths.map((w) => w.width).reduce((a, b) => a + b, 0) + numberOfBorders

  let tableWidth = calculateTableWidth(widths)
  const seen = new Set<string>()

  const reduceColumnWidths = (calcMinWidth: (col: Column<T>) => number) => {
    // If the table is too wide, reduce the width of the largest column as little as possible to fit the table.
    // If the table is still too wide, it will reduce the width of the next largest column and so on
    while (tableWidth > maxWidth) {
      const largestColumn = widths.filter((w) => !seen.has(w.key)).sort((a, b) => b.width - a.width)[0]
      if (!largestColumn) break
      if (seen.has(largestColumn.key)) break

      const minWidth = calcMinWidth(largestColumn)
      const difference = tableWidth - maxWidth
      const newWidth = largestColumn.width - difference < minWidth ? minWidth : largestColumn.width - difference
      largestColumn.width = newWidth
      tableWidth = calculateTableWidth(widths)
      seen.add(largestColumn.key)
    }
  }

  // At most, reduce the width to the length of the column's header plus padding.
  reduceColumnWidths((col) => stripAnsi(String(headings[col.key])).length + col.padding * 2)

  seen.clear()
  // At most, reduce the width to the padding + 3
  reduceColumnWidths((col) => col.padding * 2 + 3)

  // If the table width was provided AND it's greater than the calculated table width, expand the columns to fill the width
  if (width && width > tableWidth) {
    const extraWidth = width - tableWidth
    const extraWidthPerColumn = Math.floor(extraWidth / widths.length)

    for (const w of widths) {
      w.width += extraWidthPerColumn
      // if it's the last column, add all the remaining width
      if (w === widths.at(-1)) {
        w.width += extraWidth - extraWidthPerColumn * widths.length
      }
    }
  }

  return widths
}

export function getHeadings<T extends Record<string, unknown>>(config: Config<T>): Partial<T> {
  const {
    columns,
    headerOptions: {formatter},
  } = config
  const format = (header: string | number | symbol) => {
    if (typeof header !== 'string') return header
    if (!formatter) return header

    if (typeof formatter === 'function') return formatter(header)

    switch (formatter) {
      case 'camelCase': {
        return camelCase(header)
      }

      case 'capitalCase': {
        return capitalCase(header)
      }

      case 'constantCase': {
        return constantCase(header)
      }

      case 'kebabCase': {
        return kebabCase(header)
      }

      case 'pascalCase': {
        return pascalCase(header)
      }

      case 'sentenceCase': {
        return sentenceCase(header)
      }

      case 'snakeCase': {
        return snakeCase(header)
      }

      default: {
        return header
      }
    }
  }

  return Object.fromEntries(
    columns.map((c) => {
      const key = typeof c === 'object' ? c.key : c
      const name = typeof c === 'object' ? (c.name ?? format(key)) : format(c)
      return [key, name]
    }),
  ) as Partial<T>
}

export function maybeStripAnsi<T extends Record<string, unknown>[]>(data: T, noStyle: boolean): T {
  if (!noStyle) return data

  const newData = []

  for (const row in data) {
    if (row in data) {
      const newRow = Object.fromEntries(
        Object.entries(data[row]).map(([key, value]) => [key, typeof value === 'string' ? stripAnsi(value) : value]),
      )

      newData.push(newRow)
    }
  }

  return newData as T
}

function isTruthy(value: string | undefined): boolean {
  return value !== '0' && value !== 'false'
}

/**
 * Determines whether the plain text table should be used.
 *
 * If the OCLIF_TABLE_SKIP_CI_CHECK environment variable is set to a truthy value, the CI check will be skipped.
 *
 * If the CI environment variable is set, the plain text table will be used.
 *
 * @returns {boolean} True if the plain text table should be used, false otherwise.
 */
export function shouldUsePlainTable(): boolean {
  if (env.OCLIF_TABLE_SKIP_CI_CHECK && isTruthy(env.OCLIF_TABLE_SKIP_CI_CHECK)) return false
  // Inspired by https://github.com/sindresorhus/is-in-ci
  if (
    isTruthy(env.CI) &&
    ('CI' in env || 'CONTINUOUS_INTEGRATION' in env || Object.keys(env).some((key) => key.startsWith('CI_')))
  )
    return true
  return false
}
