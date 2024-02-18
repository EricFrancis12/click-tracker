import type {
    TAffiliateNetwork, TLandingPage, TOffer, TCampaign, TFlow_built_in, TFlow_saved, TFlow_url,
    TRoute_default, TRoute_rule, TRule, TPath, TTrafficSource, TClick
} from './types';
import { TData } from '../contexts/AuthContext';
import { geos } from './geos';

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
        landingPages: [
            {
                _id: placeholderLandingPages[0]._id,
                weight: 100
            }
        ],
        offers: [
            {
                _id: placeholderOffers[0]._id,
                weight: 75
            }
        ],
        active: true,
        directLinkingEnabled: false
    },
    {
        weight: 50,
        landingPages: [
            {
                _id: placeholderLandingPages[1]._id,
                weight: 100
            }
        ],
        offers: [
            {
                _id: placeholderOffers[1]._id,
                weight: 100
            }
        ],
        active: true,
        directLinkingEnabled: true
    },
];

export const placeholderRules: TRule[] = [
    {
        name: 'Language',
        itemName: 'Affiliate Networks',
        clickProp: 'language',
        equals: true,
        data: []
    },
    {
        name: 'City',
        itemName: 'Campaigns',
        clickProp: 'city',
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
        rules: placeholderRules,
        logicalRelation: 'and'
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
                queryParam: '{zone}',
                value: '123456'
            },
            {
                name: 'target',
                queryParam: '{target}',
                value: '456789'
            }
        ],
        customTokens: [],
        tags: ['0', '1', '2', '3']
    }
];

export const placeholderCampaigns: TCampaign[] = [
    {
        _id: 'PLACEHOLDER-CAMPAIGN-0_CA',
        name: 'US | Men | age 25-34 | remarketing',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: ['0', '1', '2', '3'],
        geoName: geos[1].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-1_CA',
        name: 'Africa modile test',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-2_CA',
        name: 'Lead Magnet campaign 1',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-3_CA',
        name: 'Lead Magnet campaign 2',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-4_CA',
        name: 'Aniversary sale',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-5_CA',
        name: 'Performance Test',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-6_CA',
        name: 'Tier 2 Geos Experiment',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-7_CA',
        name: 'Beta Testing Campaign',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-8_CA',
        name: 'Test Campaign A',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-9_CA',
        name: 'Test Campaign B',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    },
    {
        _id: 'PLACEHOLDER-CAMPAIGN-10_CA',
        name: 'Orange button split test',
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: placeholderFlows[1],
        tags: [],
        geoName: geos[2].name
    }
];

export const placeholderClicks: TClick[] = [
    {
        _id: `0_CL`,
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
                queryParam: placeholderTrafficSources[0].defaultTokens[0].queryParam,
                value: placeholderTrafficSources[0].defaultTokens[0].value
            },
            {
                queryParam: placeholderTrafficSources[0].defaultTokens[1].queryParam,
                value: placeholderTrafficSources[0].defaultTokens[1].value
            }
        ],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `1_CL`,
        campaign_id: placeholderCampaigns[0]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 0.90,
        revenue: 4.56,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `2_CL`,
        campaign_id: placeholderCampaigns[1]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 0.90,
        revenue: 4.56,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `3_CL`,
        campaign_id: placeholderCampaigns[2]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `4_CL`,
        campaign_id: placeholderCampaigns[3]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `5_CL`,
        campaign_id: placeholderCampaigns[4]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `6_CL`,
        campaign_id: placeholderCampaigns[5]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `7_CL`,
        campaign_id: placeholderCampaigns[6]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 6.23,
        revenue: 1.55,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `8_CL`,
        campaign_id: placeholderCampaigns[7]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `9_CL`,
        campaign_id: placeholderCampaigns[8]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `10_CL`,
        campaign_id: placeholderCampaigns[9]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 6.23,
        revenue: 1.55,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
    {
        _id: `11_CL`,
        campaign_id: placeholderCampaigns[10]._id,
        trafficSource_id: placeholderTrafficSources[0]._id,
        landingPage_id: placeholderLandingPages[0]._id,
        offer_id: placeholderOffers[0]._id,
        flow_id: placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: Date.now(),
        cost: 1.95,
        revenue: 2.14,
        tokens: [],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    },
];

export const placeholderData: TData = {
    affiliateNetworks: placeholderAffiliateNetworks,
    campaigns: placeholderCampaigns,
    flows: placeholderFlows,
    landingPages: placeholderLandingPages,
    offers: placeholderOffers,
    trafficSources: placeholderTrafficSources
};
