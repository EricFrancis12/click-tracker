import { nanoid } from 'nanoid';
import type {
    TAffiliateNetwork, TCampaign, TFlow, TFlow_built_in,
    TFlow_saved, TFlow_url, TLandingPage, TOffer,
    TPath,
    TTimeframe, TTrafficSource
} from './types';
import { geos } from './geos';

export function defaultTimeframe(): TTimeframe {
    const sevenDaysMS = 60 * 60 * 24 * 7 * 1000;
    return [new Date(Date.now() - sevenDaysMS), new Date()];
}

export function defaultAffiliateNetwork(): TAffiliateNetwork {
    return ({
        _id: `${nanoid()}_AN`,
        name: '',
        defaultNewOfferString: '',
        tags: []
    });
}

export function defaultCampaign(): TCampaign {
    return ({
        _id: `${nanoid()}_CA`,
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
        _id: `${nanoid()}_FL`,
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
        _id: `${nanoid()}_LP`,
        name: '',
        url: '',
        tags: []
    });
}

export function defaultOffer(): TOffer {
    return ({
        _id: `${nanoid()}_OF`,
        name: '',
        affiliateNetwork_id: '',
        url: '',
        payout: 0,
        tags: []
    });
}

export function defaultTrafficSource(): TTrafficSource {
    return ({
        _id: `${nanoid()}_TS`,
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
