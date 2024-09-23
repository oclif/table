import {printTable} from '../src/index.js'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const data = [
  {
    age: 20,
    description,
    id: '36329',
    name: 'Alice',
  },
  {
    age: 21,
    description,
    id: '49032',
    name: 'Bob',
  },
  {
    age: 22,
    description,
    id: '51786',
    name: 'Charlie',
  },
]

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'truncate',
  title: 'Truncate',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'wrap',
  title: 'Wrap',
  titleOptions: {bold: true},
})
