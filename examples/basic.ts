import ansis from 'ansis'
import terminalLink from 'terminal-link'

import {makeTable} from '../src/index.js'

const data = [
  {
    age: 20,
    bigData: 'a'.repeat(process.stdout.columns - 43),
    employed: ansis.bold('true'),
    id: terminalLink('12345', 'https://example.com/alice'),
    name: 'Alice',
  },
  {
    age: 21,
    bigData: 'b'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('56789', 'https://example.com/bob'),
    name: 'Bob',
  },
  {
    age: 22,
    bigData: 'c'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('31786', 'https://example.com/charlie'),
    name: 'Charlie',
  },
]

makeTable(data, ['id', 'name', 'age', 'employed', 'bigData'])
