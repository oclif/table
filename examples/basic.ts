import ansis from 'ansis'
import terminalLink from 'terminal-link'

import {makeTable} from '../src/index.js'

// Data
const data = [
  {
    aaa: 'a'.repeat(process.stdout.columns - 10),
    age: 20,
    employed: ansis.bold('true'),
    name: 'Alice',
    website: terminalLink('example.com', 'https://example.com'),
  },
  {
    aaa: 'b'.repeat(30),
    age: 21,
    employed: ansis.bold('true'),
    name: 'Bob',
    website: terminalLink('example.com', 'https://example.com'),
  },
  {
    aaa: 'c'.repeat(30),
    age: 22,
    employed: ansis.bold('true'),
    name: 'Charlie',
    website: terminalLink('example.com', 'https://example.com'),
  },
]

// Table
makeTable(data)
