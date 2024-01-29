import type {
    TAffiliateNetwork, TLandingPage, TOffer, TCampaign, TFlow_built_in, TFlow_saved, TFlow_url,
    TRoute_default, TRoute_rule, TRule, TPath, TTrafficSource, TClick
} from '../../client/src/lib/types';
import { geos } from '../../client/src/lib/geos';

export const placeholderAffiliateNetworks: TAffiliateNetwork[] = [
    {
        _id: 'PLACEHOLDER-AFFILIATE-NETWORK-0_AN',
        name: 'PLACEHOLDER-AFFILIATE-NETWORK-0',
        defaultNewOfferString: '123',
        tags: ['0', '1', '2', '3']
    },
    {
        _id: 'PLACEHOLDER-AFFILIATE-NETWORK-1_AN',
        name: 'PLACEHOLDER-AFFILIATE-NETWORK-1',
        defaultNewOfferString: '456',
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderLandingPages: TLandingPage[] = [
    {
        _id: 'PLACEHOLDER-LANDING-PAGE-0_LP',
        name: 'PLACEHOLDER-LANDING-PAGE-0',
        url: 'https://demolandingpage0.xyz',
        tags: ['0', '1', '2', '3']
    },
    {
        _id: 'PLACEHOLDER-LANDING-PAGE-1_LP',
        name: 'PLACEHOLDER-LANDING-PAGE-1',
        url: 'https://demolandingpage1.xyz',
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderOffers: TOffer[] = [
    {
        _id: `PLACEHOLDER-OFFER-0_${placeholderAffiliateNetworks[0]._id}_OF`,
        name: 'Demo Offer 0',
        affiliateNetwork_id: placeholderAffiliateNetworks[0]._id,
        url: 'https://demooffer0.xyz',
        payout: 6,
        tags: ['0', '1', '2', '3']
    },
    {
        _id: `$'PLACEHOLDER-OFFER-1_${placeholderAffiliateNetworks[1]._id}_OF`,
        name: 'Demo Offer 1',
        affiliateNetwork_id: placeholderAffiliateNetworks[1]._id,
        url: 'https://demooffer1.xyz',
        payout: 1.75,
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderPaths: TPath[] = [
    {
        weight: 100,
        landingPages: {
            _id: placeholderLandingPages[0]._id,
            weight: 100
        },
        offers: {
            _id: placeholderOffers[0]._id,
            weight: 75
        },
        active: true,
        directLinkingEnabled: false
    },
    {
        weight: 50,
        landingPages: {
            _id: placeholderLandingPages[1]._id,
            weight: 100
        },
        offers: {
            _id: placeholderOffers[1]._id,
            weight: 100
        },
        active: true,
        directLinkingEnabled: true
    },
];

export const placeholderRules: TRule[] = [
    {
        name: 'Language',
        itemName: 'Affiliate Networks',
        clickprop: 'language',
        equals: true,
        data: []
    },
    {
        name: 'City',
        itemName: 'Campaigns',
        clickprop: 'city',
        equals: false,
        data: []
    }
];

export const placeholderDefaultRoute: TRoute_default = {
    active: true,
    paths: placeholderPaths,
    rules: null
};

export const placeholderRuleRoutes: TRoute_rule[] = [
    {
        active: true,
        paths: placeholderPaths,
        rules: placeholderRules
    }
];

export const placeholderFlows: (TFlow_built_in | TFlow_saved | TFlow_url)[] = [
    {
        _id: 'PLACEHOLDER-FLOW-0_FL',
        name: 'PLACEHOLDER-FLOW-0',
        type: 'saved',
        tags: ['0', '1', '2', '3']
    },
    {
        _id: 'BUILT_IN_FL',
        name: 'BUILT_IN_FL',
        type: 'built_in',
        defaultRoute: placeholderDefaultRoute,
        ruleRoutes: placeholderRuleRoutes,
        tags: ['0', '1', '2', '3']
    },
    {
        _id: 'URL_FL',
        name: 'URL_FL',
        type: 'url',
        url: 'https://demotargeturl.xyz',
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderTrafficSources: TTrafficSource[] = [
    {
        _id: 'PLACEHOLDER-TRAFFIC-SOURCE-0_TS',
        name: 'PLACEHOLDER-TRAFFIC-SOURCE-0',
        postbackUrl: 'https://demopostbackurl.xyz',
        defaultTokens: [
            {
                name: 'zone',
                key: '{zone}',
                value: '123456'
            },
            {
                name: 'target',
                key: '{target}',
                value: '456789'
            }
        ],
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderCampaigns: TCampaign[] = [
    {
        _id: 'PLACEHOLDER-CAMPAIGN-0_CA',
        name: 'PLACEHOLDER-CAMPAIGN-0',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[0],
        tags: ['0', '1', '2', '3'],
        geo: geos[0].name
    }
];

export const placeholderClicks: TClick[] = [
    {
        _id: `12345_CL`,
        campaign_id: placeholderCampaigns[0]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: null,
        cost: 0.45,
        revenue: 0,
        tokens: [
            {
                key: placeholderTrafficSources[0].defaultTokens[0].key,
                value: placeholderTrafficSources[0].defaultTokens[0].value
            },
            {
                key: placeholderTrafficSources[0].defaultTokens[1].key,
                value: placeholderTrafficSources[0].defaultTokens[1].value
            }
        ],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    }
];