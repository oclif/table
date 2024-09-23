import {printTable} from '../src/index.js'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const data = [
  {
    description,
    item: 'Item 1',
    url: 'https://www.example.com/item/1',
  },
  {
    description,
    item: 'Item 2',
    url: 'https://www.example.com/item/2',
  },
  {
    description,
    item: 'Item 3',
    url: 'https://www.example.com/item/3',
  },
]

printTable({
  columns: ['item', 'description', 'url'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'wrap',
  title: 'Horizontal Orientation',
  titleOptions: {bold: true},
})

printTable({
  columns: ['item', 'description', 'url'],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  orientation: 'vertical',
  overflow: 'wrap',
  title: 'Vertical Orientation',
  titleOptions: {bold: true},
})
