import {printTable} from '../src/index.js'

process.env.CI = 'true'

const data = [
  {
    actualConfidence: '100%',
    actualTools: 'Run 1: sf-deploy-metadata',
    count: '1/1',
    expectedConfidence: '50%',
    expectedTool: 'sf-deploy-metadata',
    model: 'sfdc_ai__DefaultBedrockAnthropicClaude4Sonnet',
    status: 'PASS',
  },
]

printTable({
  borderColor: 'gray',
  columns: [
    {key: 'model', name: 'Model', width: '30%'},
    {key: 'expectedTool', name: 'Expected Tool Invocation', width: '15%'},
    {key: 'actualTools', name: 'Actual Tool Invocations', width: '25%'},
    {key: 'count', name: 'Count', width: '7%'},
    {key: 'expectedConfidence', name: 'Expected Confidence', width: '8%'},
    {key: 'actualConfidence', name: 'Actual Confidence', width: '8%'},
    {key: 'status', name: 'Status', width: '7%'},
  ],
  data,
  headerOptions: {
    color: 'cyanBright',
    formatter: 'capitalCase',
  },
  overflow: 'wrap',
  title: `Run #1`,
  width: process.stdout.columns,
})
