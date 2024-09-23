import {camelCase, capitalCase, constantCase, kebabCase, pascalCase, sentenceCase, snakeCase} from 'change-case'
import {orderBy} from 'natural-orderby'
import stripAnsi from 'strip-ansi'

import {Column, ColumnProps, Config, Sort} from './types.js'

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

export function getColumns<T extends Record<string, unknown>>(config: Config<T>, headings: Partial<T>): Column<T>[] {
  const {columns, horizontalAlignment, maxWidth, overflow, verticalAlignment} = config

  const widths: Column<T>[] = columns.map((propsOrKey) => {
    const props: ColumnProps<keyof T> = typeof propsOrKey === 'object' ? propsOrKey : {key: propsOrKey}
    const {key} = props
    const padding = props.padding ?? config.padding

    // Get the width of each cell in the column
    const data = config.data.map((data) => {
      const value = data[key]

      if (value === undefined || value === null) return 0
      return stripAnsi(String(value).replaceAll('​', ' ')).length
    })

    const header = String(headings[key]).length
    const width = Math.max(...data, header) + padding * 2

    return {
      column: key,
      horizontalAlignment: props.horizontalAlignment ?? horizontalAlignment,
      key: String(key),
      overflow: props.overflow ?? overflow,
      padding,
      verticalAlignment: props.verticalAlignment ?? verticalAlignment,
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
    const header = String(headings[largestColumn.key]).length
    // The minimum width of a column is the width of the header plus padding on both sides
    const minWidth = header + largestColumn.padding * 2
    const difference = tableWidth - maxWidth
    const newWidth = largestColumn.width - difference < minWidth ? minWidth : largestColumn.width - difference
    largestColumn.width = newWidth
    tableWidth = calculateTableWidth(widths)
    if (seen.has(largestColumn.key)) break
    seen.add(largestColumn.key)
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
