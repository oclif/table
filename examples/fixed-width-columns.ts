import {printTable} from '../src/index.js'

const data = [
  {
    actual: 'This is a long string of the actual test results. '.repeat(50),
    expected: 'This is a long string of the expected test results. '.repeat(10),
    result: 'Passed',
    test: 'Topic',
  },
]

printTable({
  columns: [
    {key: 'test', width: '10%'},
    {key: 'result', width: '10%'},
    {key: 'expected', width: '40%'},
    {key: 'actual', width: '40%'},
  ],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  overflow: 'wrap',
  title: 'Fixed-Width Columns',
  titleOptions: {bold: true},
  // width: '100%',
})
