import {printTable, TableOptions} from '../src/index.js'

const data = [
  {
    arguments: 'defaultDevHub: true\ndirectory: /workspace',
    model: 'OpenAI GPT35Turbo',
    response: '',
    tool: 'sf-get-username',
  },
  {
    arguments: 'defaultDevHub: true\ndirectory: /Users/username/salesforce-projects',
    model: 'OpenAI GPT4OmniMini',
    response: '',
    tool: 'sf-get-username',
  },
  {
    arguments: 'directory: /Users/antml\n defaultDevHub: true',
    model: 'Anthropic Claude 4 Sonnet',
    response: "I'll help you find your default dev hub username. Let me check your Salesforce configuration.",
    tool: 'sf-get-username',
  },
]

const basic: TableOptions<(typeof data)[number]> = {
  borderStyle: 'all',
  columns: ['model', 'response', 'tool', 'arguments'],
  data,
  overflow: 'wrap',
  title: 'Multiline Table',
  verticalAlignment: 'center',
}

printTable(basic)
