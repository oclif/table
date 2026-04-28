import {printTable} from '../src/index.js'

const data0 = [
  {
    c1: 'first row value',
    c2: 'a string with only normal chars',
  },
  {
    c1: 'second row value',
    c2: 'a string with Japanese chars: ワイド',
  },
  {
    c1: 'third row value',
    c2: 'a string with emoji: 🍁🍁',
  },
  {
    c1: 'fourth row value',
    c2: 'a string with full-width latin: ＡＢＣ.',
  },
]

printTable({
  borderStyle: 'all',
  columns: ['c1', 'c2'],
  data: data0,
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'sentenceCase',
  },
  horizontalAlignment: 'left',
  overflow: 'wrap',
})

const data1 = [
  {
    c1: 'first row value',
    c2: 'a reasonably long string with only normal chars',
  },
  {
    c1: 'second row value',
    c2: 'a ワイド string ワイド with ワイド Japanese ワイド chars ワイド thrown ワイド in',
  },
  {
    c1: 'third row value',
    c2: 'a 🍁🍁 string 🍁🍁 with 🍁🍁 emoji 🍁🍁 thrown 🍁🍁 in',
  },
  {
    c1: 'fourth row value',
    c2: 'a ＡＢＣ string ＡＢＣ with ＡＢＣ full-width ＡＢＣ latin ＡＢＣ chars ＡＢＣ thrown ＡＢＣ in',
  },
]

printTable({
  borderStyle: 'all',
  columns: ['c1', 'c2'],
  data: data1,
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'sentenceCase',
  },
  horizontalAlignment: 'left',
  overflow: 'wrap',
})

const data2 = [
  {
    c1: 'first row value',
    c2: 'a perhaps slightly unreasonably long string with only normal chars. This might be pushing it, who knows.',
  },
  {
    c1: 'second row value',
    c2: 'a string with Japanese ワイド chars ワイド thrown ワイド in',
  },
  {
    c1: 'third row value',
    c2: 'a 🍁🍁 string 🍁🍁 with 🍁🍁 emoji 🍁🍁 thrown 🍁🍁 in',
  },
  {
    c1: 'fourth row value',
    c2: 'a ＡＢＣ string ＡＢＣ with ＡＢＣ full-width ＡＢＣ latin ＡＢＣ chars ＡＢＣ thrown ＡＢＣ in',
  },
]

printTable({
  borderStyle: 'all',
  columns: ['c1', 'c2'],
  data: data2,
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'sentenceCase',
  },
  horizontalAlignment: 'left',
  overflow: 'wrap',
})

const data3 = [
  {
    c1: 'a string with only normal chars',
    'ワイド': 'b',
  },
  {
    c1: 'a string with Japanese chars: ワイド',
    'ワイド': 'b',
  },
  {
    c1: 'a string with emoji: 🍁🍁',
    'ワイド': 'b',
  },
  {
    c1: 'a string with full-width latin: ＡＢＣ.',
    'ワイド': 'b',
  },
]

printTable({
  borderStyle: 'all',
  columns: ['c1', 'ワイド'],
  data: data3,
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'sentenceCase',
  },
  horizontalAlignment: 'left',
  overflow: 'wrap',
})