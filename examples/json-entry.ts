import {ux} from '@oclif/core'

import {makeTable} from '../src/index.js'

const data = [
  {
    data: ux.colorizeJson({
      function: {
        input: {
          objectApiName: 'Account',
          recordName: 'Acme',
        },
        name: 'Willie',
        output: {
          additionalContext: [
            {
              description: 'engineer',
              id: null,
              name: 'Willie',
              schema: null,
              type: 'JSON',
            },
          ],
        },
      },
    }),
  },
  {
    data: ux.colorizeJson({
      function: {
        input: {
          objectApiName: 'Account',
          recordName: 'Acme',
        },
        name: 'Mike',
        output: {
          additionalContext: [
            {
              description: 'engineer',
              id: null,
              name: 'Mike',
              schema: null,
              type: 'JSON',
            },
          ],
        },
      },
    }),
  },
]

const trimmedTable = makeTable({
  data,
  horizontalAlignment: 'left',
  overflow: 'wrap',
  title: 'Employees',
  trimWhitespace: true,
})
console.log(trimmedTable)

const table = makeTable({
  data,
  horizontalAlignment: 'left',
  overflow: 'wrap',
  title: 'Employees',
  trimWhitespace: false,
})
console.log(table)
