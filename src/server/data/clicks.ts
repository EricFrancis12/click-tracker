import type { Request } from 'express';
import type { TCampaign, TCampaign_id, TClick, TClickProp, TClickPropsFromReq, TFlow, TFlow_id, TLandingPage, TLandingPage_id, TOffer, TOffer_id } from '../../client/src/lib/types';
import { fetchCampaignBy_id } from './campaigns';
import { fetchOfferBy_id } from './offers';
import { generateNewClick_id } from '../../client/src/lib/_id';
import { fetchFlowBy_id } from './flows';
import { getLanguageFromReq } from '../utils/utils';
import { fetchIpInfo, getTokensFromUrl } from './data';
import { fetchLandingPageBy_id } from './landingPages';

import CyclicDB from '@cyclic.sh/dynamodb';
import { tokensDictionary } from '../../client/src/lib/tokensList';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchClicks(): Promise<TClick[]> {
    const clicksCollection = db.collection('clicks');
    const dbResults = await clicksCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch clicks');
    }
    const clicks = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return clicks;
}

export async function fetchClickBy_id(_id: string): Promise<TClick | null> {
    const clicks = await fetchClicks();
    return clicks.find((click: TClick) => click?._id === _id) ?? null;
}

export async function createNewAndSaveNewClick(click: TClick) {
    const clicksCollection = db.collection('clicks');
    return await clicksCollection.set(click._id, click);
}

export async function updateClick(click: TClick) {
    const _click = await fetchClickBy_id(click._id);
    if (!_click) {
        throw new Error('Unable to update click');
    }
    const clicksCollection = db.collection('clicks');
    await clicksCollection.delete(click._id);
    return await clicksCollection.set(click._id, click);
}

export async function deleteClickBy_id(_id: string) {
    const _click = await fetchClickBy_id(_id);
    if (!_click) {
        throw new Error('Unable to delete click');
    }
    const clicksCollection = db.collection('clicks');
    return await clicksCollection.delete(_id);
}

export async function makeClickPropsFromReq(req: Request): Promise<TClickPropsFromReq> {
    const ipInfo = await fetchIpInfo(req);
    const geoName = ipInfo?.country ?? null;
    const region = ipInfo?.region ?? null;
    const city = ipInfo?.city ?? null;

    return {
        geoName,
        region,
        city,
        language: getLanguageFromReq(req),
        isp: null,
        mobileCarrier: null,
        connectionType: null,
        deviceModel: null,
        deviceVendor: null,
        deviceType: null,
        screenResolution: null,
        os: null,
        osVersion: null,
        browserName: null,
        browserVersion: null
    };
}

export async function makeNewClickFromReq({
    req,
    campaign,
    campaign_id,
    flow,
    flow_id,
    landingPage,
    landingPage_id,
    offer,
    offer_id,
    directLinkingEnabled,
    clickPropsFromReq
}: {
    req: Request,
    campaign?: TCampaign | null,
    campaign_id?: TCampaign_id,
    flow?: TFlow | null,
    flow_id?: TFlow_id,
    landingPage?: TLandingPage | null,
    landingPage_id?: TLandingPage_id,
    offer?: TOffer | null,
    offer_id?: TOffer_id,
    directLinkingEnabled: boolean,
    clickPropsFromReq?: TClickPropsFromReq
}) {
    if (!campaign) {
        if (!campaign_id) {
            throw new Error('A campaign or campaign_id is required');
        } else {
            campaign = await fetchCampaignBy_id(campaign_id);
            if (!campaign) {
                throw new Error('Unable to find campaign with this _id');
            }
        }
    }

    if (!flow) {
        if (!flow_id) {
            throw new Error('A flow or flow_id is required');
        } else {
            flow = await fetchFlowBy_id(flow_id);
            if (!flow) {
                throw new Error('Unable to find flow with this _id');
            }
        }
    }

    if (!landingPage && landingPage_id) {
        landingPage = await fetchLandingPageBy_id(landingPage_id);
        if (!landingPage) {
            throw new Error('Unable to find landing page with this _id');
        }
    }

    if (!offer && offer_id) {
        offer = await fetchOfferBy_id(offer_id);
        if (!offer) {
            throw new Error('Unable to find offer with this _id');
        }
    }

    const timestamp = Date.now();
    const tokens = getTokensFromUrl(req.url);
    const cost = parseFloat(req.query?.[tokensDictionary.Cost.queryParam] as string ?? 0);

    const ipInfo = clickPropsFromReq ? null : await fetchIpInfo(req);

    const click: TClick = {
        _id: generateNewClick_id(),
        campaign_id: campaign._id,
        trafficSource_id: campaign.trafficSource_id,
        landingPage_id: landingPage?._id || null,
        offer_id: offer?._id || null,
        flow_id: flow._id,
        viewTimestamp: timestamp,
        lpClickTimestamp: directLinkingEnabled ? timestamp : null,
        conversionTimestamp: null,
        cost,
        revenue: 0,
        tokens,
        viewRedirectUrl: (directLinkingEnabled ? offer?.url : landingPage?.url) ?? null,
        clickRedirectUrl: offer?.url ?? null,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        language: clickPropsFromReq?.language ?? getLanguageFromReq(req) ?? undefined,
        geoName: ipInfo?.country ?? clickPropsFromReq?.geoName ?? undefined,
        region: ipInfo?.region ?? clickPropsFromReq?.region ?? undefined,
        city: ipInfo?.city ?? clickPropsFromReq?.city ?? undefined,
        isp: clickPropsFromReq?.isp ?? undefined,
        mobileCarrier: clickPropsFromReq?.mobileCarrier ?? undefined,
        connectionType: clickPropsFromReq?.connectionType ?? undefined,
        deviceModel: clickPropsFromReq?.deviceModel ?? undefined,
        deviceVendor: clickPropsFromReq?.deviceVendor ?? undefined,
        deviceType: clickPropsFromReq?.deviceType ?? undefined,
        screenResolution: clickPropsFromReq?.screenResolution ?? undefined,
        os: clickPropsFromReq?.os ?? undefined,
        osVersion: clickPropsFromReq?.osVersion ?? undefined,
        browserName: clickPropsFromReq?.browserName ?? undefined,
        browserVersion: clickPropsFromReq?.browserVersion ?? undefined
    };
    return click;
}

export async function recordLandingPageClick({ click, campaign, campaign_id }: {
    click: TClick,
    campaign?: TCampaign | null,
    campaign_id?: TCampaign_id
}) {
    if (!campaign && campaign_id) {
        campaign = await fetchCampaignBy_id(campaign_id);
        if (!campaign) {
            throw new Error('Unable to find campaign with this _id');
        }
    } else {
        throw new Error('A campaign or campaign_id is required');
    }

    const clickCopy = structuredClone(click);
    const timestamp = Date.now();
    clickCopy.lpClickTimestamp = timestamp;
    return await updateClick(clickCopy);
}

export async function recordConversion({ click, revenue = 0 }: {
    click: TClick,
    revenue?: number
}) {
    const clickCopy = structuredClone(click);
    const timestamp = Date.now();
    clickCopy.conversionTimestamp = timestamp;
    clickCopy.revenue = (clickCopy.revenue ?? 0) + revenue;
    return await updateClick(clickCopy);
}
