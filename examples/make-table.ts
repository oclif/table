import ansis from 'ansis'
import terminalLink from 'terminal-link'

import {makeTable, TableOptions} from '../src/index.js'

const data = [
  {
    age: 20,
    employed: ansis.bold('true'),
    id: terminalLink('36329', 'https://example.com/36329'),
    name: 'Alice',
  },
  {
    age: 21,
    employed: ansis.bold('true'),
    id: terminalLink('49032', 'https://example.com/49032'),
    name: ansis.dim('Bob'),
  },
  {
    age: 22,
    employed: ansis.bold('false'),
    id: terminalLink('51786', 'https://example.com/51786'),
    name: 'Charlie',
  },
]

const basic: TableOptions<(typeof data)[number]> = {
  borderStyle: 'all',
  columns: ['id', {key: 'name', name: 'First Name'}, 'age', 'employed'],
  data,
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'sentenceCase',
  },
  sort: {
    id: 'desc',
  },
  verticalAlignment: 'center',
}

const table = makeTable(basic)
console.log(table)
