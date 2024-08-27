import {camelCase, capitalCase, constantCase, kebabCase, pascalCase, sentenceCase, snakeCase} from 'change-case'
import {orderBy} from 'natural-orderby'
import stripAnsi from 'strip-ansi'

import {Column, ColumnProps, Config, ScalarDict, Sort} from './types.js'

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

export function sortData<T extends ScalarDict>(data: T[], sort?: Sort<T> | undefined): T[] {
  if (!sort) return data
  const identifiers = Object.keys(sort)
  const orders = Object.values(sort)
  return orderBy(data, identifiers, orders)
}

export const truncate = (value: string, length: number) => `${value.slice(0, length)}...`

// insert new line every x characters
export const wrap = (value: string, position: number, padding: number) => {
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

export function allKeysInCollection<T extends ScalarDict>(data: T[]): (keyof T)[] {
  const keys = new Set<keyof T>()
  for (const row of data) {
    for (const key in row) {
      if (key in row) keys.add(key)
    }
  }

  return [...keys]
}

export function getColumns<T extends ScalarDict>(config: Config<T>): Column<T>[] {
  const {columns, maxWidth, padding} = config

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

export function getHeadings<T extends ScalarDict>(config: Config<T>): Partial<T> {
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
