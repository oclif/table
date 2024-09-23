import {printTable} from '../src/index.js'

const data = [
  {age: 25, id: '10245', name: 'Bob'},
  {age: 26, id: '10345', name: 'Bill'},
  {age: 30, id: '20245', name: 'Alice'},
  {age: 20, id: '20345', name: 'Amy'},
  {age: 30, id: '30245', name: 'Charlie'},
  {age: 35, id: '30345', name: 'Chris'},
]

printTable({
  columns: ['id', 'name', 'age'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  sort: {age: 'desc'},
  title: 'Sort by Age in Descending Order',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  sort: {age: 'desc', id: 'desc'},
  title: 'Sort by Age in Descending Order and Id in Descending Order',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  sort: {age: (a, b) => (a < b ? -1 : 1)},
  title: 'Sort with Custom Sort Function',
  titleOptions: {bold: true},
})

printTable({
  columns: ['id', 'name', 'age'],
  data,
  filter: (record) => record.age > 25,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  title: 'Filter by Age Greater Than 25',
  titleOptions: {bold: true},
})
