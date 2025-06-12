import {printTable} from '../src/index.js'

const data = [
  {
    actual: 'This is a string of the actual test results. ',
    expected: 'This is a long string of the expected test results. ',
    result: 'Passed',
    test: 'Topic',
  },
]

process.stdout.columns = 0
printTable({
  columns: ['test', 'result', 'expected', 'actual'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  noStyle: true,
  overflow: 'wrap',
  title: 'process.stdout.columns is 0',
  titleOptions: {bold: true},
})

// @ts-expect-error for testing
process.stdout.columns = undefined
printTable({
  columns: ['test', 'result', 'expected', 'actual'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  noStyle: true,
  overflow: 'wrap',
  title: 'process.stdout.columns is undefined',
  titleOptions: {bold: true},
})
