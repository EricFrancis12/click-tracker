"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeholderClicks = exports.placeholderCampaigns = exports.placeholderTrafficSources = exports.placeholderFlows = exports.placeholderRuleRoutes = exports.placeholderDefaultRoute = exports.placeholderRules = exports.placeholderPaths = exports.placeholderOffers = exports.placeholderLandingPages = exports.placeholderAffiliateNetworks = void 0;
const geos_1 = require("../../client/src/lib/geos");
exports.placeholderAffiliateNetworks = [
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
exports.placeholderLandingPages = [
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
exports.placeholderOffers = [
    {
        _id: `PLACEHOLDER-OFFER-0_${exports.placeholderAffiliateNetworks[0]._id}_OF`,
        name: 'Demo Offer 0',
        affiliateNetwork_id: exports.placeholderAffiliateNetworks[0]._id,
        url: 'https://demooffer0.xyz',
        payout: 6,
        tags: ['0', '1', '2', '3']
    },
    {
        _id: `$'PLACEHOLDER-OFFER-1_${exports.placeholderAffiliateNetworks[1]._id}_OF`,
        name: 'Demo Offer 1',
        affiliateNetwork_id: exports.placeholderAffiliateNetworks[1]._id,
        url: 'https://demooffer1.xyz',
        payout: 1.75,
        tags: ['0', '1', '2', '3']
    }
];
exports.placeholderPaths = [
    {
        weight: 100,
        landingPages: {
            _id: exports.placeholderLandingPages[0]._id,
            weight: 100
        },
        offers: {
            _id: exports.placeholderOffers[0]._id,
            weight: 75
        },
        active: true,
        directLinkingEnabled: false
    },
    {
        weight: 50,
        landingPages: {
            _id: exports.placeholderLandingPages[1]._id,
            weight: 100
        },
        offers: {
            _id: exports.placeholderOffers[1]._id,
            weight: 100
        },
        active: true,
        directLinkingEnabled: true
    },
];
exports.placeholderRules = [
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
exports.placeholderDefaultRoute = {
    active: true,
    paths: exports.placeholderPaths,
    rules: null
};
exports.placeholderRuleRoutes = [
    {
        active: true,
        paths: exports.placeholderPaths,
        rules: exports.placeholderRules
    }
];
exports.placeholderFlows = [
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
        defaultRoute: exports.placeholderDefaultRoute,
        ruleRoutes: exports.placeholderRuleRoutes,
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
exports.placeholderTrafficSources = [
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
exports.placeholderCampaigns = [
    {
        _id: 'PLACEHOLDER-CAMPAIGN-0_CA',
        name: 'PLACEHOLDER-CAMPAIGN-0',
        trafficSource_id: exports.placeholderTrafficSources[0]._id,
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: exports.placeholderFlows[0],
        tags: ['0', '1', '2', '3'],
        geo: geos_1.geos[0].name
    }
];
exports.placeholderClicks = [
    {
        _id: `12345_CL`,
        campaign_id: exports.placeholderCampaigns[0]._id,
        trafficSource_id: exports.placeholderTrafficSources[0]._id,
        landingPage_id: exports.placeholderLandingPages[0]._id,
        offer_id: exports.placeholderOffers[0]._id,
        flow_id: exports.placeholderFlows[0]._id,
        viewTimestamp: Date.now(),
        lpClickTimestamp: Date.now(),
        conversionTimestamp: null,
        cost: 0.45,
        revenue: 0,
        tokens: [
            {
                key: exports.placeholderTrafficSources[0].defaultTokens[0].key,
                value: exports.placeholderTrafficSources[0].defaultTokens[0].value
            },
            {
                key: exports.placeholderTrafficSources[0].defaultTokens[1].key,
                value: exports.placeholderTrafficSources[0].defaultTokens[1].value
            }
        ],
        viewRedirectUrl: 'https://demoredirecturl.xyz',
        clickRedirectUrl: 'https://demoredirecturl.xyz'
    }
];
