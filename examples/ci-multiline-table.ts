import {printTable} from '../src/index.js'

process.env.CI = 'true'

const data = [
  {
    chat:
      'user: My current OS is macos. I am working in a workspace with the following folders: /Users/sf-dev/dreamhouse-lwc My org alias is dreamhouse. This is the structure of /Users/sf-dev/dreamhouse-lwc: package.xml force-app/main/default/applications force-app/main/default/aura force-app/main/default/aura/pageTemplate_2_7_3 force-app/main/default/classes force-app/main/default/contentassets force-app/main/default/cspTrustedSites force-app/main/default/flexipages force-app/main/default/flows force-app/main/default/layouts force-app/main/default/lwc force-app/main/default/messageChannels force-app/main/default/objects force-app/main/default/permissionsets force-app/main/default/prompts force-app/main/default/remoteSiteSettings force-app/main/default/staticresources force-app/main/default/tabs\n' +
      '\n' +
      `assistant: I can see you're working with a Salesforce project in the dreamhouse-lwc workspace with the "dreamhouse" org alias. This looks like a typical Salesforce DX project structure with various metadata types including Lightning Web Components, Apex classes, flows, and other standard Salesforce metadata.\n` +
      '\n' +
      'How can I help you with your Salesforce development work today? I can assist with tasks like:\n' +
      '\n' +
      '- Deploying or retrieving metadata\n' +
      '- Running Apex tests\n' +
      '- Querying your org\n' +
      '- Managing permission sets\n' +
      '- Suggesting Salesforce CLI commands\n' +
      '- And more!\n' +
      '\n' +
      'What would you like to do?\n' +
      '\n' +
      'user: Deploy the Lightning Web Components in force-app/main/default/lwc to the dreamhouse org.\n' +
      '\n' +
      "assistant: I'll deploy the Lightning Web Components from the force-app/main/default/lwc directory to your dreamhouse org.",
    model: 'sfdc_ai__DefaultBedrockAnthropicClaude4Sonnet',
    tools:
      'Generation 1: No tool invoked\n' +
      '\n' +
      'Generation 2: sf-deploy-metadata\n' +
      '  - directory: /Users/sf-dev/dreamhouse-lwc\n' +
      '  - sourceDir: force-app/main/default/lwc\n' +
      '  - usernameOrAlias: dreamhouse',
  },
]

printTable({
  borderColor: 'gray',
  columns: [
    {key: 'model', width: '30%'},
    {key: 'chat', width: '40%'},
    {key: 'tools', name: 'Tool Invocations', width: '30%'},
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
