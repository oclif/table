import {printTable} from '../src/index.js'
import {BORDER_STYLES} from '../src/skeletons.js'

const data = [
  {
    age: 20,
    id: '36329',
    name: 'Alice',
  },
  {
    age: 21,
    id: '49032',
    name: 'Bob',
  },
  {
    age: 22,
    id: '51786',
    name: 'Charlie',
  },
]

for (const borderStyle of BORDER_STYLES) {
  printTable({
    borderStyle,
    columns: ['id', {key: 'name', name: 'First Name'}, 'age'],
    data,
    headerOptions: {
      formatter: 'capitalCase',
    },
    horizontalAlignment: 'center',
    title: borderStyle,
    titleOptions: {bold: true},
  })
  console.log()
}

printTable({
  borderStyle: 'all',
  columns: ['id', {key: 'name', name: 'First Name'}, 'age'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  title: 'Remove style with "noStyle: true"',
  titleOptions: {bold: true},
  noStyle: true,
})
