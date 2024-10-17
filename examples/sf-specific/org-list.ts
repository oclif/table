import {printTable} from '../../src'
const data = [
  {
    alias: 'devhub',
    connectedStatus: 'Connected',
    defaultMarker: undefined,
    instanceApiVersion: '62.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:44:28 PM',
    instanceUrl: 'https://su0503.my.salesforce.com',
    isDefaultDevHubUsername: false,
    isDefaultUsername: false,
    isDevHub: true,
    lastUsed: '2024-10-09T18:44:31.494Z',
    loginUrl: 'https://login.salesforce.com',
    orgId: '00DB0000000Ih65MAC',
    timestamp: '2022-05-10T19:26:45.436Z',
    type: 'DevHub',
    username: 'md@su-blitz.org',
  },
  {
    alias: 'na40devhub',
    connectedStatus: 'Connected',
    defaultMarker: '🌳',
    instanceApiVersion: '61.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:44:29 PM',
    instanceUrl: 'https://na40-dev-hub.my.salesforce.com',
    isDefaultDevHubUsername: true,
    isDefaultUsername: false,
    isDevHub: true,
    lastUsed: '2024-10-09T18:44:31.495Z',
    loginUrl: 'https://login.salesforce.com',
    orgId: '00D460000019MkyEAE',
    privateKey: '/Users/mdonnalley/secrets/jwt/na40.key',
    type: 'DevHub',
    username: 'admin@integrationtesthubna40.org',
  },
  {
    alias: undefined,
    connectedStatus:
      'Unable to refresh session due to: Error authenticating with the refresh token due to: expired access/refresh token',
    defaultMarker: undefined,
    instanceApiVersion: '62.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:44:28 PM',
    instanceUrl: 'https://cristianalexisdominguez-devhub.my.salesforce.com',
    isDefaultDevHubUsername: false,
    isDefaultUsername: false,
    isDevHub: true,
    lastUsed: '2024-10-09T18:44:29.234Z',
    loginUrl: 'https://cristianalexisdominguez-devhub.my.salesforce.com/',
    orgId: '00DB00000006Mq3MAE',
    type: 'DevHub',
    username: 'cdominguez@gs0-dev-hub-salesforce.com',
  },
  {
    alias: undefined,
    connectedStatus:
      'Unable to refresh session due to: Error authenticating with the refresh token due to: expired access/refresh token',
    defaultMarker: undefined,
    instanceApiVersion: '62.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:44:28 PM',
    instanceUrl: 'https://su0503.my.salesforce.com',
    isDefaultDevHubUsername: false,
    isDefaultUsername: false,
    isDevHub: true,
    lastUsed: '2024-10-09T18:44:29.986Z',
    loginUrl: 'https://login.salesforce.com',
    orgId: '00DB0000000Ih65MAC',
    type: 'DevHub',
    username: 'shetzel@gs0.org',
  },
  {
    alias: undefined,
    connectedStatus: 'Connected',
    defaultMarker: undefined,
    instanceApiVersion: '62.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:44:28 PM',
    instanceUrl: 'https://su0503--sbxgs01.sandbox.my.salesforce.com',
    isDefaultDevHubUsername: false,
    isDefaultUsername: false,
    isDevHub: false,
    isSandbox: true,
    isScratch: false,
    lastUsed: '2024-10-09T18:47:21.186Z',
    loginUrl: 'https://test.salesforce.com',
    orgId: '00D3I0000008poXUAQ',
    tracksSource: false,
    type: 'Sandbox',
    username: 'shetzel@gs0.org.sbxgs01',
  },
  {
    alias: 'ink',
    connectedStatus: 'Active',
    created: '1728401061000',
    createdBy: 'md@su-blitz.org',
    createdDate: '2024-10-08T15:24:21.000+0000',
    createdOrgInstance: 'USA256S',
    defaultMarker: '🍁',
    devHubId: '00DB0000000Ih65MAC',
    devHubOrgId: '00DB0000000Ih65MAC',
    devHubUsername: 'md@su-blitz.org',
    edition: 'Developer',
    expirationDate: '2024-10-09',
    instanceApiVersion: '62.0',
    instanceApiVersionLastRetrieved: '10/9/2024, 12:23:19 PM',
    instanceUrl: 'https://nosoftware-platform-8292-dev-ed.scratch.my.salesforce.com',
    isDefaultDevHubUsername: false,
    isDefaultUsername: true,
    isDevHub: false,
    isExpired: false,
    isSandbox: false,
    isScratch: true,
    lastUsed: '2024-10-09T18:44:31.494Z',
    loginUrl: 'https://nosoftware-platform-8292-dev-ed.scratch.my.salesforce.com',
    namespace: null,
    orgId: '00DO2000004SuOLMA0',
    orgName: 'Company',
    signupUsername: 'test-1yomelh1c0ha@example.com',
    status: 'Active',
    tracksSource: true,
    type: 'Scratch',
    username: 'test-1yomelh1c0ha@example.com',
  },
]

printTable({
  borderStyle: 'vertical-with-outline',
  columns: [
    {
      key: 'defaultMarker',
      name: ' ',
    },
    'type',
    'alias',
    'username',
    {
      key: 'instanceUrl',
      name: 'Instance URL',
    },
    {
      key: 'orgId',
      name: 'Org ID',
    },
    {
      key: 'connectedStatus',
      name: 'Status',
    },
    'namespace',
    {
      key: 'devHubId',
      name: 'Devhub ID',
    },
    {
      key: 'createdDate',
      name: 'Created',
    },
    {
      key: 'expirationDate',
      name: 'Expires',
    },
  ],
  data,
  headerOptions: {
    formatter: 'capitalCase',
  },
  maxWidth: '100%',
  overflow: 'wrap',
  verticalAlignment: 'center',
})