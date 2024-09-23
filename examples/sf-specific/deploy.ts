import {TableProps, printTable} from '../../src'

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

const deploy: TableProps<(typeof deployResult)[number]> = {
  borderStyle: 'vertical',
  columns: [
    'state',
    'fullName',
    'type',
    {
      key: 'filePath',
      name: 'Path',
      overflow: 'truncate',
    },
  ],
  data: deployResult,
  filter: (row) => row.state === 'Changed' && row.type.startsWith('A'),
  headerOptions: {
    color: 'white',
    formatter: 'capitalCase',
    inverse: true,
  },
  maxWidth: '100%',
  overflow: 'truncate',
  padding: 1,
  sort: {
    fullName: 'asc',
    type: 'asc',
  },
  verticalAlignment: 'center',
}

printTable(deploy)
