import {printTables, TableOptions} from '../src/index.js'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const employees = [
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

const stocks = [
  {
    name: 'Apple',
    price: 200,
    ticker: 'AAPL',
  },
  {
    name: 'Alphabet',
    price: 150,
    ticker: 'GOOGL',
  },
  {
    name: 'Microsoft',
    price: 400,
    ticker: 'MSFT',
  },
]

const projects = [
  {
    description,
    id: '1',
    name: 'Project 1',
    status: 'active',
  },
  {
    description,
    id: '2',
    name: 'Project 2',
    status: 'inactive',
  },
  {
    description,
    id: '3',
    name: 'Project 3',
    status: 'active',
  },
]

// Occasionally, if you have two maxWidths that add up to 100% they will stack vertically instead of horizontally.
// At first I thought this might be when the window has an odd number of pixels, but it seems to be more random than that.

const employeesTable: TableOptions<(typeof employees)[number]> = {
  columns: ['id', 'name', 'age', 'description'],
  data: employees,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  maxWidth: '50%',
  overflow: 'truncate',
  title: 'Employees',
  titleOptions: {
    bold: true,
    color: 'green',
  },
}

const stocksTable: TableOptions<(typeof stocks)[number]> = {
  columns: ['ticker', 'name', 'price'],
  data: stocks,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  maxWidth: '50%',
  overflow: 'truncate',
  title: 'Stocks',
  titleOptions: {
    bold: true,
    color: 'magenta',
  },
}

const projectsTable: TableOptions<(typeof projects)[number]> = {
  columns: ['id', 'name', 'status', 'description'],
  data: projects,
  headerOptions: {
    formatter: 'capitalCase',
  },
  horizontalAlignment: 'center',
  overflow: 'truncate',
  title: 'Projects',
  titleOptions: {
    bold: true,
    color: 'cyan',
  },
}

printTables([employeesTable, stocksTable, projectsTable], {
  alignItems: 'center',
  columnGap: 1,
  margin: 1,
  rowGap: 1,
})
