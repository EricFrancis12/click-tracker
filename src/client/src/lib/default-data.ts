import {
    generateNewAffiliateNetwork_id, generateNewCampaign_id, generateNewFlow_id,
    generateNewLandingPage_id, generateNewOffer_id, generateNewTrafficSource_id
} from './_id';
import type {
    TAffiliateNetwork, TCampaign, TFlow, TFlow_built_in,
    TFlow_saved, TFlow_url, TLandingPage, TOffer,
    TPath,
    TTimeframe, TTrafficSource
} from './types';
import { geos } from './geos';

export function defaultAffiliateNetwork(): TAffiliateNetwork {
    return ({
        _id: generateNewAffiliateNetwork_id(),
        name: '',
        defaultNewOfferString: '',
        tags: []
    });
}

export function defaultCampaign(): TCampaign {
    return ({
        _id: generateNewCampaign_id(),
        name: '',
        trafficSource_id: '',
        landingPageRotation: 'random',
        offerRotation: 'random',
        flow: {
            _id: 'BUILT_IN_FL',
            type: 'built_in',
            defaultRoute: {
                active: true,
                paths: [defaultPath()]
            },
            ruleRoutes: []
        },
        geoName: geos[0].name,
        tags: []
    });
}

export function defaultFlow(): TFlow {
    // This is the default flow that is pulled up inside FlowBuilder.tsx
    return defaultFlow_built_in();
}

export function defaultFlow_saved(): TFlow_saved {
    return ({
        _id: generateNewFlow_id(),
        type: 'saved',
        name: '',
        defaultRoute: {
            active: true,
            paths: []
        },
        ruleRoutes: [],
        tags: []
    });
}

export function defaultFlow_built_in(): TFlow_built_in {
    return ({
        _id: 'BUILT_IN_FL',
        type: 'built_in',
        defaultRoute: {
            active: true,
            paths: []
        },
        ruleRoutes: [],
        tags: []
    });
}

export function defaultFlow_url(): TFlow_url {
    return ({
        _id: 'URL_FL',
        type: 'url',
        url: ''
    });
}

export function defaultPath(): TPath {
    return ({
        weight: 100,
        landingPages: [],
        offers: [],
        active: true,
        directLinkingEnabled: false
    });
}

export function defaultLandingPage(): TLandingPage {
    return ({
        _id: generateNewLandingPage_id(),
        name: '',
        url: '',
        tags: []
    });
}

export function defaultOffer(): TOffer {
    return ({
        _id: generateNewOffer_id(),
        name: '',
        affiliateNetwork_id: '',
        url: '',
        payout: 0,
        tags: []
    });
}

export function defaultTrafficSource(): TTrafficSource {
    return ({
        _id: generateNewTrafficSource_id(),
        name: '',
        postbackUrl: '',
        defaultTokens: [
            {
                name: 'External ID',
                queryParam: 'external_id',
                value: ''
            },
            {
                name: 'Cost',
                queryParam: 'cost',
                value: ''
            }
        ],
        customTokens: [],
        tags: []
    });
}

export const defaultTimeframe: TTimeframe = [new Date(), new Date()];
