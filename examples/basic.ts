import ansis from 'ansis'
import terminalLink from 'terminal-link'

import {makeTable} from '../src/index.js'

const data = [
  {
    age: 20,
    bigData: 'a'.repeat(98),
    employed: ansis.bold('true'),
    evenMoreBigData: 'a'.repeat(130),
    id: terminalLink('12345', 'https://example.com/alice'),
    moreBigData: 'a'.repeat(89),
    name: 'Alice',
  },
  {
    age: 21,
    bigData: 'b'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('56789', 'https://example.com/bob'),
    moreBigData: 'b'.repeat(30),
    name: 'Bob',
  },
  {
    age: 22,
    bigData: 'c'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('31786', 'https://example.com/charlie'),
    moreBigData: 'c'.repeat(30),
    name: 'Charlie',
  },
]

makeTable(data, ['id', 'name', 'age', 'employed', 'bigData', 'moreBigData'])
