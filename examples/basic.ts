import ansis from 'ansis'
import {pathToFileURL} from 'node:url'
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
    name: ansis.dim('Bob'),
  },
  {
    age: 22,
    bigData: 'c'.repeat(30),
    employed: ansis.bold('false'),
    id: terminalLink('51786', 'https://example.com/charlie'),
    moreBigData: 'c'.repeat(30),
    name: 'Charlie',
  },
]

const versions = [
  {
    channel: 'nightly',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.57.0/4fefb5b/sf-v2.57.0-4fefb5b-darwin-arm64.tar.gz',
    version: '2.57.0',
  },
  {
    channel: 'latest-rc',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.6/d91d896/sf-v2.56.6-d91d896-darwin-arm64.tar.gz',
    version: '2.56.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.5/458d72d/sf-v2.56.5-458d72d-darwin-arm64.tar.gz',
    version: '2.56.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.4/195c9d4/sf-v2.56.4-195c9d4-darwin-arm64.tar.gz',
    version: '2.56.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.3/bfa46d8/sf-v2.56.3-bfa46d8-darwin-arm64.tar.gz',
    version: '2.56.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.2/7387d8e/sf-v2.56.2-7387d8e-darwin-arm64.tar.gz',
    version: '2.56.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.1/4d35384/sf-v2.56.1-4d35384-darwin-arm64.tar.gz',
    version: '2.56.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.56.0/7586d36/sf-v2.56.0-7586d36-darwin-arm64.tar.gz',
    version: '2.56.0',
  },
  {
    channel: 'latest',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.6/648ad30/sf-v2.55.6-648ad30-darwin-arm64.tar.gz',
    version: '2.55.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.5/28a12a5/sf-v2.55.5-28a12a5-darwin-arm64.tar.gz',
    version: '2.55.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.4/386c6af/sf-v2.55.4-386c6af-darwin-arm64.tar.gz',
    version: '2.55.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.3/ce28d39/sf-v2.55.3-ce28d39-darwin-arm64.tar.gz',
    version: '2.55.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.2/d7150db/sf-v2.55.2-d7150db-darwin-arm64.tar.gz',
    version: '2.55.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.1/e2a3aea/sf-v2.55.1-e2a3aea-darwin-arm64.tar.gz',
    version: '2.55.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.55.0/a8fc43c/sf-v2.55.0-a8fc43c-darwin-arm64.tar.gz',
    version: '2.55.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.6/b1d011f/sf-v2.54.6-b1d011f-darwin-arm64.tar.gz',
    version: '2.54.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.5/922edf1/sf-v2.54.5-922edf1-darwin-arm64.tar.gz',
    version: '2.54.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.4/16d27c6/sf-v2.54.4-16d27c6-darwin-arm64.tar.gz',
    version: '2.54.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.3/f31c4ba/sf-v2.54.3-f31c4ba-darwin-arm64.tar.gz',
    version: '2.54.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.2/af52ccf/sf-v2.54.2-af52ccf-darwin-arm64.tar.gz',
    version: '2.54.2',
  },
  {
    channel: 'qa',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.2-qa.0/a65e59e/sf-v2.54.2-qa.0-a65e59e-darwin-arm64.tar.gz',
    version: '2.54.2-qa.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.1/d62cfbc/sf-v2.54.1-d62cfbc-darwin-arm64.tar.gz',
    version: '2.54.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.54.0/721e552/sf-v2.54.0-721e552-darwin-arm64.tar.gz',
    version: '2.54.0',
  },
  {
    channel: '',
    location: '/Users/mdonnalley/.local/share/sf/client/2.53.6-1d945da',
    version: '2.53.6',
  },
  {
    channel: '',
    location: '/Users/mdonnalley/.local/share/sf/client/2.53.5-2fcd640',
    version: '2.53.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.53.4/f53e72e/sf-v2.53.4-f53e72e-darwin-arm64.tar.gz',
    version: '2.53.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.53.3/07680d1/sf-v2.53.3-07680d1-darwin-arm64.tar.gz',
    version: '2.53.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.53.2/16894a4/sf-v2.53.2-16894a4-darwin-arm64.tar.gz',
    version: '2.53.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.53.1/e0ad1b4/sf-v2.53.1-e0ad1b4-darwin-arm64.tar.gz',
    version: '2.53.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.53.0/a509efa/sf-v2.53.0-a509efa-darwin-arm64.tar.gz',
    version: '2.53.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.6/0707688/sf-v2.52.6-0707688-darwin-arm64.tar.gz',
    version: '2.52.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.5/e831256/sf-v2.52.5-e831256-darwin-arm64.tar.gz',
    version: '2.52.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.4/7277873/sf-v2.52.4-7277873-darwin-arm64.tar.gz',
    version: '2.52.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.3/577fe68/sf-v2.52.3-577fe68-darwin-arm64.tar.gz',
    version: '2.52.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.2/cd139ad/sf-v2.52.2-cd139ad-darwin-arm64.tar.gz',
    version: '2.52.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.1/c7e3062/sf-v2.52.1-c7e3062-darwin-arm64.tar.gz',
    version: '2.52.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.52.0/7d173fa/sf-v2.52.0-7d173fa-darwin-arm64.tar.gz',
    version: '2.52.0',
  },
  {
    channel: '',
    location: '/Users/mdonnalley/.local/share/sf/client/2.51.6-e49d0be',
    version: '2.51.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.5/7df8e72/sf-v2.51.5-7df8e72-darwin-arm64.tar.gz',
    version: '2.51.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.4/8ff4b7e/sf-v2.51.4-8ff4b7e-darwin-arm64.tar.gz',
    version: '2.51.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.3/af4d44c/sf-v2.51.3-af4d44c-darwin-arm64.tar.gz',
    version: '2.51.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.2/c187ba9/sf-v2.51.2-c187ba9-darwin-arm64.tar.gz',
    version: '2.51.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.1/2c26ee3/sf-v2.51.1-2c26ee3-darwin-arm64.tar.gz',
    version: '2.51.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.51.0/5ef92a3/sf-v2.51.0-5ef92a3-darwin-arm64.tar.gz',
    version: '2.51.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.6/6e9d7f7/sf-v2.50.6-6e9d7f7-darwin-arm64.tar.gz',
    version: '2.50.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.5/f8ab084/sf-v2.50.5-f8ab084-darwin-arm64.tar.gz',
    version: '2.50.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.4/dbc29bd/sf-v2.50.4-dbc29bd-darwin-arm64.tar.gz',
    version: '2.50.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.3/6388f50/sf-v2.50.3-6388f50-darwin-arm64.tar.gz',
    version: '2.50.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.2/aa61bfe/sf-v2.50.2-aa61bfe-darwin-arm64.tar.gz',
    version: '2.50.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.1/7de4c5b/sf-v2.50.1-7de4c5b-darwin-arm64.tar.gz',
    version: '2.50.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.50.0/6939e64/sf-v2.50.0-6939e64-darwin-arm64.tar.gz',
    version: '2.50.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.7/e83764e/sf-v2.49.7-e83764e-darwin-arm64.tar.gz',
    version: '2.49.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.6/f1b8b67/sf-v2.49.6-f1b8b67-darwin-arm64.tar.gz',
    version: '2.49.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.5/0d895d8/sf-v2.49.5-0d895d8-darwin-arm64.tar.gz',
    version: '2.49.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.4/7617c72/sf-v2.49.4-7617c72-darwin-arm64.tar.gz',
    version: '2.49.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.3/bcf558d/sf-v2.49.3-bcf558d-darwin-arm64.tar.gz',
    version: '2.49.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.2/0c4fac4/sf-v2.49.2-0c4fac4-darwin-arm64.tar.gz',
    version: '2.49.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.1/493edd4/sf-v2.49.1-493edd4-darwin-arm64.tar.gz',
    version: '2.49.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.49.0/d5a2997/sf-v2.49.0-d5a2997-darwin-arm64.tar.gz',
    version: '2.49.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.6/49b413a/sf-v2.48.6-49b413a-darwin-arm64.tar.gz',
    version: '2.48.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.5/fcba59f/sf-v2.48.5-fcba59f-darwin-arm64.tar.gz',
    version: '2.48.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.4/c3a6b1b/sf-v2.48.4-c3a6b1b-darwin-arm64.tar.gz',
    version: '2.48.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.3/88f5338/sf-v2.48.3-88f5338-darwin-arm64.tar.gz',
    version: '2.48.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.2/d16a3f2/sf-v2.48.2-d16a3f2-darwin-arm64.tar.gz',
    version: '2.48.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.1/2e777ea/sf-v2.48.1-2e777ea-darwin-arm64.tar.gz',
    version: '2.48.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.48.0/e5a4e7e/sf-v2.48.0-e5a4e7e-darwin-arm64.tar.gz',
    version: '2.48.0',
  },
  {
    channel: '',
    location: '/Users/mdonnalley/.local/share/sf/client/2.47.6-6b39a27',
    version: '2.47.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.5/db454ee/sf-v2.47.5-db454ee-darwin-arm64.tar.gz',
    version: '2.47.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.4/1963e43/sf-v2.47.4-1963e43-darwin-arm64.tar.gz',
    version: '2.47.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.3/676b076/sf-v2.47.3-676b076-darwin-arm64.tar.gz',
    version: '2.47.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.2/48bf755/sf-v2.47.2-48bf755-darwin-arm64.tar.gz',
    version: '2.47.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.1/1d95f93/sf-v2.47.1-1d95f93-darwin-arm64.tar.gz',
    version: '2.47.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.1-qa.0/2f787ba/sf-v2.47.1-qa.0-2f787ba-darwin-arm64.tar.gz',
    version: '2.47.1-qa.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.47.0/f592656/sf-v2.47.0-f592656-darwin-arm64.tar.gz',
    version: '2.47.0',
  },
  {
    channel: '',
    location: '/Users/mdonnalley/.local/share/sf/client/2.46.6-191291b',
    version: '2.46.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.5/a4ab13a/sf-v2.46.5-a4ab13a-darwin-arm64.tar.gz',
    version: '2.46.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.5-qa.0/b6df280/sf-v2.46.5-qa.0-b6df280-darwin-arm64.tar.gz',
    version: '2.46.5-qa.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.4/bed8215/sf-v2.46.4-bed8215-darwin-arm64.tar.gz',
    version: '2.46.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.3/e7b5dbf/sf-v2.46.3-e7b5dbf-darwin-arm64.tar.gz',
    version: '2.46.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.2/7830320/sf-v2.46.2-7830320-darwin-arm64.tar.gz',
    version: '2.46.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.1/e5164d8/sf-v2.46.1-e5164d8-darwin-arm64.tar.gz',
    version: '2.46.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.46.0/75fba23/sf-v2.46.0-75fba23-darwin-arm64.tar.gz',
    version: '2.46.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.6/3aaf41e/sf-v2.45.6-3aaf41e-darwin-arm64.tar.gz',
    version: '2.45.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.6-qa.0/8a44643/sf-v2.45.6-qa.0-8a44643-darwin-arm64.tar.gz',
    version: '2.45.6-qa.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.5/14bab0d/sf-v2.45.5-14bab0d-darwin-arm64.tar.gz',
    version: '2.45.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.4/c7a84b9/sf-v2.45.4-c7a84b9-darwin-arm64.tar.gz',
    version: '2.45.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.3/c3be363/sf-v2.45.3-c3be363-darwin-arm64.tar.gz',
    version: '2.45.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.2/8f73f59/sf-v2.45.2-8f73f59-darwin-arm64.tar.gz',
    version: '2.45.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.1/a5cd7a4/sf-v2.45.1-a5cd7a4-darwin-arm64.tar.gz',
    version: '2.45.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.45.0/3bfb796/sf-v2.45.0-3bfb796-darwin-arm64.tar.gz',
    version: '2.45.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.8/c60512e/sf-v2.44.8-c60512e-darwin-arm64.tar.gz',
    version: '2.44.8',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.7/1621d27/sf-v2.44.7-1621d27-darwin-arm64.tar.gz',
    version: '2.44.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.6/2629638/sf-v2.44.6-2629638-darwin-arm64.tar.gz',
    version: '2.44.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.5/ec30740/sf-v2.44.5-ec30740-darwin-arm64.tar.gz',
    version: '2.44.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.4/f9b0a77/sf-v2.44.4-f9b0a77-darwin-arm64.tar.gz',
    version: '2.44.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.3/9ae9e01/sf-v2.44.3-9ae9e01-darwin-arm64.tar.gz',
    version: '2.44.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.2/7b6bef8/sf-v2.44.2-7b6bef8-darwin-arm64.tar.gz',
    version: '2.44.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.1/ead62c6/sf-v2.44.1-ead62c6-darwin-arm64.tar.gz',
    version: '2.44.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.44.0/8c3a306/sf-v2.44.0-8c3a306-darwin-arm64.tar.gz',
    version: '2.44.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.7/085948d/sf-v2.43.7-085948d-darwin-arm64.tar.gz',
    version: '2.43.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.6/4d07a62/sf-v2.43.6-4d07a62-darwin-arm64.tar.gz',
    version: '2.43.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.5/427047d/sf-v2.43.5-427047d-darwin-arm64.tar.gz',
    version: '2.43.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.4/68f8734/sf-v2.43.4-68f8734-darwin-arm64.tar.gz',
    version: '2.43.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.3/5760107/sf-v2.43.3-5760107-darwin-arm64.tar.gz',
    version: '2.43.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.2/4c4b7d2/sf-v2.43.2-4c4b7d2-darwin-arm64.tar.gz',
    version: '2.43.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.1/80f532e/sf-v2.43.1-80f532e-darwin-arm64.tar.gz',
    version: '2.43.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.43.0/4343398/sf-v2.43.0-4343398-darwin-arm64.tar.gz',
    version: '2.43.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.6/2b3c407/sf-v2.42.6-2b3c407-darwin-arm64.tar.gz',
    version: '2.42.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.5/dca3980/sf-v2.42.5-dca3980-darwin-arm64.tar.gz',
    version: '2.42.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.4/cb9df1b/sf-v2.42.4-cb9df1b-darwin-arm64.tar.gz',
    version: '2.42.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.3/32260ff/sf-v2.42.3-32260ff-darwin-arm64.tar.gz',
    version: '2.42.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.2/62f5551/sf-v2.42.2-62f5551-darwin-arm64.tar.gz',
    version: '2.42.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.1/390979e/sf-v2.42.1-390979e-darwin-arm64.tar.gz',
    version: '2.42.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.42.0/2bb5d9c/sf-v2.42.0-2bb5d9c-darwin-arm64.tar.gz',
    version: '2.42.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.8/dd2c629/sf-v2.41.8-dd2c629-darwin-arm64.tar.gz',
    version: '2.41.8',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.7/d619f34/sf-v2.41.7-d619f34-darwin-arm64.tar.gz',
    version: '2.41.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.6/83c295f/sf-v2.41.6-83c295f-darwin-arm64.tar.gz',
    version: '2.41.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.5/a1201cc/sf-v2.41.5-a1201cc-darwin-arm64.tar.gz',
    version: '2.41.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.4/b70b8be/sf-v2.41.4-b70b8be-darwin-arm64.tar.gz',
    version: '2.41.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.3/8f9f567/sf-v2.41.3-8f9f567-darwin-arm64.tar.gz',
    version: '2.41.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.2/377c19f/sf-v2.41.2-377c19f-darwin-arm64.tar.gz',
    version: '2.41.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.1/74faa3e/sf-v2.41.1-74faa3e-darwin-arm64.tar.gz',
    version: '2.41.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.41.0/2c26a8b/sf-v2.41.0-2c26a8b-darwin-arm64.tar.gz',
    version: '2.41.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.7/bde121f/sf-v2.40.7-bde121f-darwin-arm64.tar.gz',
    version: '2.40.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.6/bad44c9/sf-v2.40.6-bad44c9-darwin-arm64.tar.gz',
    version: '2.40.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.5/2aa8b18/sf-v2.40.5-2aa8b18-darwin-arm64.tar.gz',
    version: '2.40.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.4/1a9bfc5/sf-v2.40.4-1a9bfc5-darwin-arm64.tar.gz',
    version: '2.40.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.3/df07b0f/sf-v2.40.3-df07b0f-darwin-arm64.tar.gz',
    version: '2.40.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.2/5f6fc36/sf-v2.40.2-5f6fc36-darwin-arm64.tar.gz',
    version: '2.40.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.1/12b7e00/sf-v2.40.1-12b7e00-darwin-arm64.tar.gz',
    version: '2.40.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.40.0/325135d/sf-v2.40.0-325135d-darwin-arm64.tar.gz',
    version: '2.40.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.6/6819d56/sf-v2.39.6-6819d56-darwin-arm64.tar.gz',
    version: '2.39.6',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.5/2f44101/sf-v2.39.5-2f44101-darwin-arm64.tar.gz',
    version: '2.39.5',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.4/ffeae5d/sf-v2.39.4-ffeae5d-darwin-arm64.tar.gz',
    version: '2.39.4',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.3/85f7b92/sf-v2.39.3-85f7b92-darwin-arm64.tar.gz',
    version: '2.39.3',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.2/868cdaa/sf-v2.39.2-868cdaa-darwin-arm64.tar.gz',
    version: '2.39.2',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.1/72c7df7/sf-v2.39.1-72c7df7-darwin-arm64.tar.gz',
    version: '2.39.1',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.39.0/ce2a137/sf-v2.39.0-ce2a137-darwin-arm64.tar.gz',
    version: '2.39.0',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.38.7/023d2b4/sf-v2.38.7-023d2b4-darwin-arm64.tar.gz',
    version: '2.38.7',
  },
  {
    channel: '',
    location:
      'https://developer.salesforce.com/media/salesforce-cli/sf/versions/2.38.6/1d0ec8e/sf-v2.38.6-1d0ec8e-darwin-arm64.tar.gz',
    version: '2.38.6',
  },
].map((v) => ({
  ...v,
  location: v.location.startsWith('http')
    ? terminalLink(new URL(v.location).pathname.split('/').at(-1) ?? v.location, v.location)
    : v.location,
}))

const deployResult = [
  {
    filePath: 'force-app/main/default/classes/FileUtilities.cls',
    fullName: 'FileUtilities',
    state: 'Changed',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/FileUtilities.cls-meta.xml',
    fullName: 'FileUtilities',
    state: 'Changed',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/FileUtilitiesTest.cls',
    fullName: 'FileUtilitiesTest',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/FileUtilitiesTest.cls-meta.xml',
    fullName: 'FileUtilitiesTest',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/GeocodingService.cls',
    fullName: 'GeocodingService',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/GeocodingService.cls-meta.xml',
    fullName: 'GeocodingService',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/GeocodingServiceTest.cls',
    fullName: 'GeocodingServiceTest',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/GeocodingServiceTest.cls-meta.xml',
    fullName: 'GeocodingServiceTest',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/PagedResult.cls',
    fullName: 'PagedResult',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/PagedResult.cls-meta.xml',
    fullName: 'PagedResult',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/PropertyController.cls',
    fullName: 'PropertyController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/PropertyController.cls-meta.xml',
    fullName: 'PropertyController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/SampleDataController.cls',
    fullName: 'SampleDataController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/SampleDataController.cls-meta.xml',
    fullName: 'SampleDataController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/TestPropertyController.cls',
    fullName: 'TestPropertyController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/TestPropertyController.cls-meta.xml',
    fullName: 'TestPropertyController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/TestSampleDataController.cls',
    fullName: 'TestSampleDataController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/classes/TestSampleDataController.cls-meta.xml',
    fullName: 'TestSampleDataController',
    state: 'Unchanged',
    type: 'ApexClass',
  },
  {
    filePath: 'force-app/main/default/aura/pageTemplate_2_7_3/pageTemplate_2_7_3.cmp',
    fullName: 'pageTemplate_2_7_3',
    state: 'Changed',
    type: 'AuraDefinitionBundle',
  },
  {
    filePath: 'force-app/main/default/aura/pageTemplate_2_7_3/pageTemplate_2_7_3.cmp-meta.xml',
    fullName: 'pageTemplate_2_7_3',
    state: 'Changed',
    type: 'AuraDefinitionBundle',
  },
  {
    filePath: 'force-app/main/default/aura/pageTemplate_2_7_3/pageTemplate_2_7_3.design',
    fullName: 'pageTemplate_2_7_3',
    state: 'Changed',
    type: 'AuraDefinitionBundle',
  },
  {
    filePath: 'force-app/main/default/aura/pageTemplate_2_7_3/pageTemplate_2_7_3.svg',
    fullName: 'pageTemplate_2_7_3',
    state: 'Changed',
    type: 'AuraDefinitionBundle',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/compactLayouts/Broker_Compact.compactLayout-meta.xml',
    fullName: 'Broker__c.Broker_Compact',
    state: 'Unchanged',
    type: 'CompactLayout',
  },
  {
    filePath:
      'force-app/main/default/objects/Property__c/compactLayouts/Property_Compact_Layout.compactLayout-meta.xml',
    fullName: 'Property__c.Property_Compact_Layout',
    state: 'Unchanged',
    type: 'CompactLayout',
  },
  {
    filePath: 'force-app/main/default/contentassets/dreamhouselogosquare.asset',
    fullName: 'dreamhouselogosquare',
    state: 'Unchanged',
    type: 'ContentAsset',
  },
  {
    filePath: 'force-app/main/default/contentassets/dreamhouselogosquare.asset-meta.xml',
    fullName: 'dreamhouselogosquare',
    state: 'Unchanged',
    type: 'ContentAsset',
  },
  {
    filePath: 'force-app/main/default/cspTrustedSites/openStreetMap.cspTrustedSite-meta.xml',
    fullName: 'openStreetMap',
    state: 'Unchanged',
    type: 'CspTrustedSite',
  },
  {
    filePath: 'force-app/main/default/cspTrustedSites/s3_us_west_2_amazonaws_com.cspTrustedSite-meta.xml',
    fullName: 's3_us_west_2_amazonaws_com',
    state: 'Unchanged',
    type: 'CspTrustedSite',
  },
  {
    filePath: 'force-app/main/default/applications/Dreamhouse.app-meta.xml',
    fullName: 'Dreamhouse',
    state: 'Unchanged',
    type: 'CustomApplication',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Broker_Id__c.field-meta.xml',
    fullName: 'Broker__c.Broker_Id__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Email__c.field-meta.xml',
    fullName: 'Broker__c.Email__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Mobile_Phone__c.field-meta.xml',
    fullName: 'Broker__c.Mobile_Phone__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Phone__c.field-meta.xml',
    fullName: 'Broker__c.Phone__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Picture_IMG__c.field-meta.xml',
    fullName: 'Broker__c.Picture_IMG__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Picture__c.field-meta.xml',
    fullName: 'Broker__c.Picture__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/fields/Title__c.field-meta.xml',
    fullName: 'Broker__c.Title__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Address__c.field-meta.xml',
    fullName: 'Property__c.Address__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Assessed_Value__c.field-meta.xml',
    fullName: 'Property__c.Assessed_Value__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Baths__c.field-meta.xml',
    fullName: 'Property__c.Baths__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Beds__c.field-meta.xml',
    fullName: 'Property__c.Beds__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Broker__c.field-meta.xml',
    fullName: 'Property__c.Broker__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/City__c.field-meta.xml',
    fullName: 'Property__c.City__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Date_Agreement__c.field-meta.xml',
    fullName: 'Property__c.Date_Agreement__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Date_Closed__c.field-meta.xml',
    fullName: 'Property__c.Date_Closed__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Date_Contracted__c.field-meta.xml',
    fullName: 'Property__c.Date_Contracted__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Date_Listed__c.field-meta.xml',
    fullName: 'Property__c.Date_Listed__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Date_Pre_Market__c.field-meta.xml',
    fullName: 'Property__c.Date_Pre_Market__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Days_On_Market__c.field-meta.xml',
    fullName: 'Property__c.Days_On_Market__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Description__c.field-meta.xml',
    fullName: 'Property__c.Description__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Location__c.field-meta.xml',
    fullName: 'Property__c.Location__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Picture_IMG__c.field-meta.xml',
    fullName: 'Property__c.Picture_IMG__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Picture__c.field-meta.xml',
    fullName: 'Property__c.Picture__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Price_Sold__c.field-meta.xml',
    fullName: 'Property__c.Price_Sold__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Price__c.field-meta.xml',
    fullName: 'Property__c.Price__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Record_Link__c.field-meta.xml',
    fullName: 'Property__c.Record_Link__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/State__c.field-meta.xml',
    fullName: 'Property__c.State__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Status__c.field-meta.xml',
    fullName: 'Property__c.Status__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Tags__c.field-meta.xml',
    fullName: 'Property__c.Tags__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Thumbnail_IMG__c.field-meta.xml',
    fullName: 'Property__c.Thumbnail_IMG__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Thumbnail__c.field-meta.xml',
    fullName: 'Property__c.Thumbnail__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/fields/Zip__c.field-meta.xml',
    fullName: 'Property__c.Zip__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/TestObject__c/fields/TestField__c.field-meta.xml',
    fullName: 'TestObject__c.TestField__c',
    state: 'Unchanged',
    type: 'CustomField',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/Broker__c.object-meta.xml',
    fullName: 'Broker__c',
    state: 'Unchanged',
    type: 'CustomObject',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/Property__c.object-meta.xml',
    fullName: 'Property__c',
    state: 'Unchanged',
    type: 'CustomObject',
  },
  {
    filePath: 'force-app/main/default/objects/TestObject__c/TestObject__c.object-meta.xml',
    fullName: 'TestObject__c',
    state: 'Unchanged',
    type: 'CustomObject',
  },
  {
    filePath: 'force-app/main/default/tabs/Broker__c.tab-meta.xml',
    fullName: 'Broker__c',
    state: 'Unchanged',
    type: 'CustomTab',
  },
  {
    filePath: 'force-app/main/default/tabs/Property_Explorer.tab-meta.xml',
    fullName: 'Property_Explorer',
    state: 'Unchanged',
    type: 'CustomTab',
  },
  {
    filePath: 'force-app/main/default/tabs/Property_Finder.tab-meta.xml',
    fullName: 'Property_Finder',
    state: 'Unchanged',
    type: 'CustomTab',
  },
  {
    filePath: 'force-app/main/default/tabs/Property__c.tab-meta.xml',
    fullName: 'Property__c',
    state: 'Unchanged',
    type: 'CustomTab',
  },
  {
    filePath: 'force-app/main/default/tabs/Settings.tab-meta.xml',
    fullName: 'Settings',
    state: 'Unchanged',
    type: 'CustomTab',
  },
  {
    filePath: 'force-app/main/default/flexipages/Broker_Record_Page.flexipage-meta.xml',
    fullName: 'Broker_Record_Page',
    state: 'Unchanged',
    type: 'FlexiPage',
  },
  {
    filePath: 'force-app/main/default/flexipages/Property_Explorer.flexipage-meta.xml',
    fullName: 'Property_Explorer',
    state: 'Unchanged',
    type: 'FlexiPage',
  },
  {
    filePath: 'force-app/main/default/flexipages/Property_Finder.flexipage-meta.xml',
    fullName: 'Property_Finder',
    state: 'Unchanged',
    type: 'FlexiPage',
  },
  {
    filePath: 'force-app/main/default/flexipages/Property_Record_Page.flexipage-meta.xml',
    fullName: 'Property_Record_Page',
    state: 'Unchanged',
    type: 'FlexiPage',
  },
  {
    filePath: 'force-app/main/default/flexipages/Settings.flexipage-meta.xml',
    fullName: 'Settings',
    state: 'Unchanged',
    type: 'FlexiPage',
  },
  {
    filePath: 'force-app/main/default/flows/Create_property.flow-meta.xml',
    fullName: 'Create_property',
    state: 'Unchanged',
    type: 'Flow',
  },
  {
    filePath: 'force-app/main/default/layouts/Broker__c-Broker Layout.layout-meta.xml',
    fullName: 'Broker__c-Broker Layout',
    state: 'Unchanged',
    type: 'Layout',
  },
  {
    filePath: 'force-app/main/default/layouts/Property__c-Property Layout.layout-meta.xml',
    fullName: 'Property__c-Property Layout',
    state: 'Unchanged',
    type: 'Layout',
  },
  {
    filePath: 'force-app/main/default/lwc/barcodeScanner/barcodeScanner.html',
    fullName: 'barcodeScanner',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/barcodeScanner/barcodeScanner.js',
    fullName: 'barcodeScanner',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/barcodeScanner/barcodeScanner.js-meta.xml',
    fullName: 'barcodeScanner',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/brokerCard/brokerCard.html',
    fullName: 'brokerCard',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/brokerCard/brokerCard.js',
    fullName: 'brokerCard',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/brokerCard/brokerCard.js-meta.xml',
    fullName: 'brokerCard',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/daysOnMarket/daysOnMarket.css',
    fullName: 'daysOnMarket',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/daysOnMarket/daysOnMarket.html',
    fullName: 'daysOnMarket',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/daysOnMarket/daysOnMarket.js',
    fullName: 'daysOnMarket',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/daysOnMarket/daysOnMarket.js-meta.xml',
    fullName: 'daysOnMarket',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/errorPanel/errorPanel.js',
    fullName: 'errorPanel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/errorPanel/errorPanel.js-meta.xml',
    fullName: 'errorPanel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/errorPanel/templates/inlineMessage.html',
    fullName: 'errorPanel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/errorPanel/templates/noDataIllustration.html',
    fullName: 'errorPanel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/ldsUtils/ldsUtils.js',
    fullName: 'ldsUtils',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/ldsUtils/ldsUtils.js-meta.xml',
    fullName: 'ldsUtils',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/listContactsFromDevice/listContactsFromDevice.html',
    fullName: 'listContactsFromDevice',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/listContactsFromDevice/listContactsFromDevice.js',
    fullName: 'listContactsFromDevice',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/listContactsFromDevice/listContactsFromDevice.js-meta.xml',
    fullName: 'listContactsFromDevice',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/navigateToRecord/navigateToRecord.html',
    fullName: 'navigateToRecord',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/navigateToRecord/navigateToRecord.js',
    fullName: 'navigateToRecord',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/navigateToRecord/navigateToRecord.js-meta.xml',
    fullName: 'navigateToRecord',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/paginator/paginator.html',
    fullName: 'paginator',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/paginator/paginator.js',
    fullName: 'paginator',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/paginator/paginator.js-meta.xml',
    fullName: 'paginator',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyCarousel/propertyCarousel.html',
    fullName: 'propertyCarousel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyCarousel/propertyCarousel.js',
    fullName: 'propertyCarousel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyCarousel/propertyCarousel.js-meta.xml',
    fullName: 'propertyCarousel',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyFilter/propertyFilter.html',
    fullName: 'propertyFilter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyFilter/propertyFilter.js',
    fullName: 'propertyFilter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyFilter/propertyFilter.js-meta.xml',
    fullName: 'propertyFilter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyListMap/propertyListMap.css',
    fullName: 'propertyListMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyListMap/propertyListMap.html',
    fullName: 'propertyListMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyListMap/propertyListMap.js',
    fullName: 'propertyListMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyListMap/propertyListMap.js-meta.xml',
    fullName: 'propertyListMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyLocation/propertyLocation.html',
    fullName: 'propertyLocation',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyLocation/propertyLocation.js',
    fullName: 'propertyLocation',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyLocation/propertyLocation.js-meta.xml',
    fullName: 'propertyLocation',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyMap/propertyMap.html',
    fullName: 'propertyMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyMap/propertyMap.js',
    fullName: 'propertyMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyMap/propertyMap.js-meta.xml',
    fullName: 'propertyMap',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertySummary/propertySummary.html',
    fullName: 'propertySummary',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertySummary/propertySummary.js',
    fullName: 'propertySummary',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertySummary/propertySummary.js-meta.xml',
    fullName: 'propertySummary',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTile/propertyTile.css',
    fullName: 'propertyTile',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTile/propertyTile.html',
    fullName: 'propertyTile',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTile/propertyTile.js',
    fullName: 'propertyTile',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTile/propertyTile.js-meta.xml',
    fullName: 'propertyTile',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTileList/propertyTileList.css',
    fullName: 'propertyTileList',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTileList/propertyTileList.html',
    fullName: 'propertyTileList',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTileList/propertyTileList.js',
    fullName: 'propertyTileList',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/propertyTileList/propertyTileList.js-meta.xml',
    fullName: 'propertyTileList',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/sampleDataImporter/sampleDataImporter.html',
    fullName: 'sampleDataImporter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/sampleDataImporter/sampleDataImporter.js',
    fullName: 'sampleDataImporter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/lwc/sampleDataImporter/sampleDataImporter.js-meta.xml',
    fullName: 'sampleDataImporter',
    state: 'Changed',
    type: 'LightningComponentBundle',
  },
  {
    filePath: 'force-app/main/default/messageChannels/FiltersChange.messageChannel-meta.xml',
    fullName: 'FiltersChange',
    state: 'Unchanged',
    type: 'LightningMessageChannel',
  },
  {
    filePath: 'force-app/main/default/messageChannels/PropertySelected.messageChannel-meta.xml',
    fullName: 'PropertySelected',
    state: 'Unchanged',
    type: 'LightningMessageChannel',
  },
  {
    filePath: 'force-app/main/default/objects/Broker__c/listViews/All.listView-meta.xml',
    fullName: 'Broker__c.All',
    state: 'Unchanged',
    type: 'ListView',
  },
  {
    filePath: 'force-app/main/default/objects/Property__c/listViews/All.listView-meta.xml',
    fullName: 'Property__c.All',
    state: 'Unchanged',
    type: 'ListView',
  },
  {
    filePath: 'force-app/main/default/permissionsets/dreamhouse.permissionset-meta.xml',
    fullName: 'dreamhouse',
    state: 'Unchanged',
    type: 'PermissionSet',
  },
  {
    filePath: 'force-app/main/default/prompts/Property.prompt-meta.xml',
    fullName: 'Property',
    state: 'Changed',
    type: 'Prompt',
  },
  {
    filePath: 'force-app/main/default/prompts/PropertyExplorer.prompt-meta.xml',
    fullName: 'PropertyExplorer',
    state: 'Changed',
    type: 'Prompt',
  },
  {
    filePath: 'force-app/main/default/prompts/PropertyFinder.prompt-meta.xml',
    fullName: 'PropertyFinder',
    state: 'Changed',
    type: 'Prompt',
  },
  {
    filePath: 'force-app/main/default/remoteSiteSettings/nominatim_openstreetmap.remoteSite-meta.xml',
    fullName: 'nominatim_openstreetmap',
    state: 'Unchanged',
    type: 'RemoteSiteSetting',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs.resource-meta.xml',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/images/layers-2x.png',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/images/layers.png',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/images/marker-icon-2x.png',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/images/marker-icon.png',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/images/marker-shadow.png',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/leaflet.css',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/leafletjs/leaflet.js',
    fullName: 'leafletjs',
    state: 'Changed',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_brokers.json',
    fullName: 'sample_data_brokers',
    state: 'Unchanged',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_brokers.resource-meta.xml',
    fullName: 'sample_data_brokers',
    state: 'Unchanged',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_contacts.json',
    fullName: 'sample_data_contacts',
    state: 'Unchanged',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_contacts.resource-meta.xml',
    fullName: 'sample_data_contacts',
    state: 'Unchanged',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_properties.json',
    fullName: 'sample_data_properties',
    state: 'Unchanged',
    type: 'StaticResource',
  },
  {
    filePath: 'force-app/main/default/staticresources/sample_data_properties.resource-meta.xml',
    fullName: 'sample_data_properties',
    state: 'Unchanged',
    type: 'StaticResource',
  },
]

// makeTable({
//   align: 'center',
//   borderStyle: 'horizontal',
//   columns: [
//     'id',
//     {key: 'name', name: 'First Name'},
//     'age',
//     'employed',
//     'bigData',
//     // 'moreBigData',
//     // 'evenMoreBigData',
//   ],
//   data,
//   filter: {
//     // employed: false,
//     // name: /^B/,
//   },
//   headerOptions: {
//     bold: true,
//     color: '#905de8',
//   },
//   overflow: 'wrap',
//   sort: {
//     id: 'desc',
//   },
// })

makeTable({
  borderStyle: 'headers-only-with-underline',
  columns: ['version', 'location', 'channel'],
  data: versions,
  // filter: (row) => /^.+$/.test(row.channel),
  headerOptions: {
    bold: true,
    color: '#905de8',
    formatter: 'capitalCase',
  },
  overflow: 'wrap',
  // sort: {
  //   channel: 'desc',
  // },
})
// console.log()
makeTable({
  align: 'left',
  borderStyle: 'headers-only-with-underline',
  columns: ['state', 'fullName', 'type'],
  data: deployResult,
  filter: (row) => row.state === 'Changed' && row.type.startsWith('A'),
  headerOptions: {
    bold: true,
    color: 'blueBright',
    formatter: 'capitalCase',
  },
  overflow: 'wrap',
  sort: {
    fullName: 'asc',
    type: 'asc',
  },
})
