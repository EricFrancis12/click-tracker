import type { TToken } from './types';

export const tokensDictionary = {
    'Click ID': {
        name: 'Click ID',
        queryParam: 'click_id',
        value: '{click_id}'
    },
    'Cost': {
        name: 'Cost',
        queryParam: 'cost',
        value: '{cost}'
    },
    'Campaign ID': {
        name: 'Campaign ID',
        queryParam: 'campaign_id',
        value: '{campaign_id}'
    },
    'Campaign Name': {
        name: 'Campaign Name',
        queryParam: 'campaignName',
        value: '{campaignName}'
    },
    'Traffic Source ID': {
        name: 'Traffic Source ID',
        queryParam: 'trafficSource_id',
        value: '{trafficSource_id}'
    },
    'Traffic Source Name': {
        name: 'Traffic Source Name',
        queryParam: 'trafficSourceName',
        value: '{trafficSourceName}'
    },
    'Landing Page ID': {
        name: 'Landing Page ID',
        queryParam: 'landingPage_id',
        value: '{landingPage_id}'
    },
    'Landing Page Name': {
        name: 'Landing Page Name',
        queryParam: 'landingPageName',
        value: '{landingPageName}'
    },
    'Offer ID': {
        name: 'Offer ID',
        queryParam: 'offer_id',
        value: '{offer_id}'
    },
    'Offer Name': {
        name: 'Offer Name',
        queryParam: 'offerName',
        value: '{offerName}'
    },
    'Device Type': {
        name: 'Device Type',
        queryParam: 'deviceType',
        value: '{deviceType}'
    },
    'Device Vendor': {
        name: 'Device Vendor',
        queryParam: 'deviceVendor',
        value: '{deviceVendor}'
    },
    'Device Model': {
        name: 'Device Model',
        queryParam: 'deviceModel',
        value: '{deviceModel}'
    },
    'Browser Name': {
        name: 'Browser Name',
        queryParam: 'browserName',
        value: '{browserName}'
    },
    'Browser Version': {
        name: 'Browser Version',
        queryParam: 'browserVersion',
        value: '{browserVersion}'
    },
    'OS': {
        name: 'OS',
        queryParam: 'os',
        value: '{os}'
    },
    'OS Version': {
        name: 'OS Version',
        queryParam: 'osVersion',
        value: '{osVersion}'
    },
    'Country Name': {
        name: 'Country Name',
        queryParam: 'countryName',
        value: '{countryName}'
    },
    'Region': {
        name: 'Region',
        queryParam: 'region',
        value: '{region}'
    },
    'City': {
        name: 'City',
        queryParam: 'city',
        value: '{city}'
    },
    'ISP': {
        name: 'ISP',
        queryParam: 'isp',
        value: '{isp}'
    },
    'User Agent': {
        name: 'User Agent',
        queryParam: 'userAgent',
        value: '{userAgent}'
    },
    'IP Address': {
        name: 'IP Address',
        queryParam: 'ip',
        value: '{ip}'
    },
    'Language': {
        name: 'Language',
        queryParam: 'language',
        value: '{language}'
    },
    'Connection Type': {
        name: 'Connection Type',
        queryParam: 'connectionType',
        value: '{connectionType}'
    },
    'Mobile Carrier': {
        name: 'Mobile Carrier',
        queryParam: 'mobileCarrier',
        value: '{mobileCarrier}'
    }
};

export const tokensList: TToken[] = Object.values(tokensDictionary);
