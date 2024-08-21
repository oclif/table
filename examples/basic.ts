import ansis from 'ansis'
import terminalLink from 'terminal-link'

import {makeTable} from '../src/index.js'

const data = [
  {
    age: 20,
    bigData: 'a'.repeat(200),
    employed: ansis.bold('true'),
    evenMoreBigData: 'a'.repeat(130),
    id: terminalLink('36329', 'https://example.com/alice'),
    moreBigData: 'a'.repeat(89),
    name: 'Alice',
  },
  {
    age: 21,
    bigData: 'b'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('49032', 'https://example.com/bob'),
    moreBigData: 'b'.repeat(30),
    name: 'Bob',
  },
  {
    age: 22,
    bigData: 'c'.repeat(30),
    employed: ansis.bold('true'),
    id: terminalLink('51786', 'https://example.com/charlie'),
    moreBigData: 'c'.repeat(30),
    name: 'Charlie',
  },
]

makeTable(
  data,
  [
    'id',
    {align: 'center', key: 'name', name: 'First Name'},
    'age',
    'employed',
    'bigData',
    // 'moreBigData',
    // 'evenMoreBigData',
  ],
  {
    borderStyle: 'outline',
    headerFormatter: 'capitalCase',
    headerOptions: {
      bold: true,
      color: '#905de8',
    },
    overflow: 'wrap',
  },
)
