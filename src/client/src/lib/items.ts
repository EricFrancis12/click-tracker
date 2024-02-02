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
    languages: {
        name: 'Languages',
        clickProp: 'language'
    }
};

export const itemsArray: TItem[] = Object.values(itemsDictionary);
