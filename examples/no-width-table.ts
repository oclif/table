import {printTable} from '../src/index.js'

const data = [
  {
    actual: 'This is a string of the actual test results. ',
    expected: 'This is a long string of the expected test results. '.repeat(10),
    result: 'Passed',
    test: 'Topic',
  },
]

printTable({
  columns: [ 'test', 'result', 'expected', 'actual' ],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  overflow: 'wrap',
  title: 'Fixed-Width Columns',
  titleOptions: {bold: true},
})
