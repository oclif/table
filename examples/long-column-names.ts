import {printTable} from '../src/index.js'

const height = 10
const data = Array.from({length: height}, (_, i) => ({age: i, name: `Foo ${i}`}))

printTable({
  columns: [
    {key: 'name', name: 'Name'.repeat(100)},
    {key: 'age', name: 'Age'.repeat(100)},
  ],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  title: 'Long Column Names',
  titleOptions: {bold: true},
})
