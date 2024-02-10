import type { TItem } from './types';

export const itemsDictionary: { [key: string]: TItem } = {
    affiliateNetworks: {
        name: 'Affiliate Networks',
        clickProp: 'affiliateNetwork_id',
        dataProp: 'affiliateNetworks'
    },
    campaigns: {
        name: 'Campaigns',
        clickProp: 'campaign_id',
        dataProp: 'campaigns'
    },
    flows: {
        name: 'Flows',
        clickProp: 'flow_id',
        dataProp: 'flows'
    },
    landingPages: {
        name: 'Landing Pages',
        clickProp: 'landingPage_id',
        dataProp: 'landingPages'
    },
    offers: {
        name: 'Offers',
        clickProp: 'offer_id',
        dataProp: 'offers'
    },
    trafficSources: {
        name: 'Traffic Sources',
        clickProp: 'trafficSource_id',
        dataProp: 'trafficSources'
    },
    countries: {
        name: 'Countries',
        clickProp: 'geoName'
    },
    cities: {
        name: 'Cities',
        clickProp: 'city'
    },
    regions: {
        name: 'States / Regions',
        clickProp: 'region'
    },
    languages: {
        name: 'Languages',
        clickProp: 'language'
    },
    isp: {
        name: 'ISP',
        clickProp: 'isp'
    },
    mobileCarriers: {
        name: 'Mobile Carriers',
        clickProp: 'mobileCarrier'
    },
    connectionTypes: {
        name: 'Connection Types',
        clickProp: 'connectionType'
    },
    deviceModels: {
        name: 'Device Models',
        clickProp: 'deviceModel'
    },
    deviceVendors: {
        name: 'Device Vendors',
        clickProp: 'deviceVendor'
    },
    deviceTypes: {
        name: 'Device Types',
        clickProp: 'deviceType'
    },
    screenResolutions: {
        name: 'Screen Resolutions',
        clickProp: 'screenResolution'
    },
    os: {
        name: 'OS',
        clickProp: 'os'
    },
    osVersions: {
        name: 'OS Versions',
        clickProp: 'osVersion'
    },
    browserNames: {
        name: 'Browser Names',
        clickProp: 'browserName'
    },
    browserVersions: {
        name: 'Browser Versions',
        clickProp: 'browserVersion'
    }
};

export const itemsArray: TItem[] = Object.values(itemsDictionary);
