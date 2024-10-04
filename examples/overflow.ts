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
  title: 'Truncate (end)',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'truncate-start',
  title: 'Truncate (start)',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'truncate-middle',
  title: 'Truncate (middle)',
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
  title: 'Wrap (aligned center)',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'left',
  overflow: 'wrap',
  title: 'Wrap (aligned left)',
  titleOptions: {bold: true},
  verticalAlignment: 'center',
})

printTable({
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'right',
  overflow: 'wrap',
  title: 'Wrap (aligned right)',
  titleOptions: {bold: true},
  verticalAlignment: 'bottom',
})
