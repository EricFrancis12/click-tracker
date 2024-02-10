import crypto from 'crypto';
import type {
    TAffiliateNetwork_id, TCampaign_id, TClick_id, TFlow_id,
    TLandingPage_id, TOffer_id, TTrafficSource_id
} from './types';

export function generateNewClick_id(): TClick_id {
    return `${crypto.randomUUID()}_CL`;
}

export function generateNewAffiliateNetwork_id(): TAffiliateNetwork_id {
    return `${crypto.randomUUID()}_AN`;
}

export function generateNewCampaign_id(): TCampaign_id {
    return `${crypto.randomUUID()}_CA`;
}

export function generateNewFlow_id(): TFlow_id {
    return `${crypto.randomUUID()}_FL`;
}

export function generateNewLandingPage_id(): TLandingPage_id {
    return `${crypto.randomUUID()}_LP`;
}

export function generateNewOffer_id(): TOffer_id {
    return `${crypto.randomUUID()}_OF`;
}

export function generateNewTrafficSource_id(): TTrafficSource_id {
    return `${crypto.randomUUID()}_TS`;
}
