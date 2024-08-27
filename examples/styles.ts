import ansis from 'ansis'

import {makeTable} from '../src/index.js'
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
  console.log(ansis.bold(borderStyle))
  makeTable({
    align: 'center',
    borderStyle,
    columns: ['id', {key: 'name', name: 'First Name'}, 'age'],
    data,
    headerOptions: {
      formatter: 'capitalCase',
    },
  })
  console.log()
}
