import {config, expect} from 'chai'

import {getColumnWidth, intersperse, sortData} from '../src/utils.js'

config.truncateThreshold = 0

describe('intersperse', () => {
  it('should intersperse elements', () => {
    const elements = [1, 2, 3]
    const expected = [1, 'foo', 2, 'foo', 3]
    expect(intersperse(() => 'foo', elements)).to.deep.equal(expected)
  })
})

describe('sortData', () => {
  it('should sort data in ascending order', () => {
    const data = [
      {age: 25, name: 'Bob'},
      {age: 30, name: 'Alice'},
      {age: 35, name: 'Charlie'},
    ]
    const sort = {name: 'asc'} as Record<'name', 'asc'>
    const expected = [
      {age: 30, name: 'Alice'},
      {age: 25, name: 'Bob'},
      {age: 35, name: 'Charlie'},
    ]
    expect(sortData(data, sort)).to.deep.equal(expected)
  })

  it('should sort data in descending order', () => {
    const data = [
      {age: 25, name: 'Bob'},
      {age: 30, name: 'Alice'},
      {age: 35, name: 'Charlie'},
    ]
    const sort = {name: 'desc'} as Record<'name', 'desc'>
    const expected = [
      {age: 35, name: 'Charlie'},
      {age: 25, name: 'Bob'},
      {age: 30, name: 'Alice'},
    ]
    expect(sortData(data, sort)).to.deep.equal(expected)
  })

  it('should sort data by multiple columns', () => {
    const data = [
      {age: 25, name: 'Bob'},
      {age: 26, name: 'Bill'},
      {age: 30, name: 'Alice'},
      {age: 20, name: 'Amy'},
      {age: 30, name: 'Charlie'},
      {age: 35, name: 'Chris'},
    ]
    const sort = {age: 'desc', name: 'asc'} as Record<'age' | 'name', 'desc' | 'asc'>
    const expected = [
      {age: 35, name: 'Chris'},
      {age: 30, name: 'Alice'},
      {age: 30, name: 'Charlie'},
      {age: 26, name: 'Bill'},
      {age: 25, name: 'Bob'},
      {age: 20, name: 'Amy'},
    ]
    expect(sortData(data, sort)).to.deep.equal(expected)
  })
})

describe('should get the correct column width', () => {
  it('should return the value of OCLIF_TABLE_COLUMN_OVERRIDE', () => {
    process.env.OCLIF_TABLE_COLUMN_OVERRIDE = '100'
    expect(getColumnWidth()).to.equal(100)
    delete process.env.OCLIF_TABLE_COLUMN_OVERRIDE
  })

  it('should return the value of process.stdout.columns', () => {
    if (process.env.CI && !process.stdout.columns) {
      // In GHA process.stdout.columns is undefined
      expect(getColumnWidth()).to.equal(80)
    } else {
      const currentColumns = process.stdout.columns
      expect(getColumnWidth()).to.equal(currentColumns)
    }
  })

  it('should return the default value of 80', () => {
    const backupColumns = process.stdout.columns
    process.stdout.columns = 0
    expect(getColumnWidth()).to.equal(80)
    process.stdout.columns = backupColumns
  })
})
