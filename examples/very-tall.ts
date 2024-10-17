import {printTable} from '../src/index.js'

const height = 100_000
const data = Array.from({length: height}, (_, i) => ({age: i, name: `Foo ${i}`}))

printTable({
  columns: ['name', 'age'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  title: 'Very Tall',
  titleOptions: {bold: true},
})
