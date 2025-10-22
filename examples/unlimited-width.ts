import {printTable} from '../src/index.js'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'.repeat(
    5,
  )

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
  borderStyle: 'vertical-with-outline',
  columns: ['id', 'name', 'age', 'description'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  maxWidth: 'none',
  titleOptions: {bold: true},
})
