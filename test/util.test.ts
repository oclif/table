import {config, expect} from 'chai'

import {intersperse, sortData, truncate, wrap} from '../src/utils.js'

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

describe('truncate', () => {
  it('should truncate string', () => {
    const value = 'foobar'
    const length = 3
    const expected = 'foo...'
    expect(truncate(value, length)).to.equal(expected)
  })
})

describe('wrap', () => {
  it('should wrap string', () => {
    const value = 'foobar'
    const position = 3
    const padding = 0
    const expected = 'foo\nbar'
    expect(wrap(value, position, padding)).to.deep.equal(expected)
  })

  it('should wrap string with padding', () => {
    const value = 'foobar'
    const position = 3
    const padding = 1
    const expected = 'foo \n bar'
    expect(wrap(value, position, padding)).to.deep.equal(expected)
  })

  it('should wrap string multiple times', () => {
    const value = 'foobarbaz'
    const position = 3
    const padding = 0
    const expected = 'foo\nbar\nbaz'
    expect(wrap(value, position, padding)).to.deep.equal(expected)
  })

  it('should wrap string multiple times with padding', () => {
    const value = 'foobarbaz'
    const position = 3
    const padding = 1
    const expected = 'foo \n bar \n baz'
    expect(wrap(value, position, padding)).to.deep.equal(expected)
  })
})
