import type { TCampaign, TClick } from '../../client/src/lib/types';
import type { Request } from 'express';
import { generateNewClick_id } from '../../client/src/lib/_id';

export function catchAllRedirectUrl() {
    if (process.env.CATCH_ALL_REDIRECT_URL) {
        return process.env.CATCH_ALL_REDIRECT_URL;
    }
    return 'https://bing.com';
}

export function makeNewClickFromReq({ req, campaign }: {
    req: Request,
    campaign: TCampaign
}) {
    // const click: TClick = {
    //     _id: generateNewClick_id(),
    //     campaign_id: campaign._id,
    //     trafficSource_id: campaign.trafficSource_id,
    //     landingPage_id: 
    // };
    // return click;
}

// trafficSource_id: TTrafficSource_id,
// landingPage_id: TLandingPage_id | TLandingPage_id_direct_linking,
// offer_id: TOffer_id | null,
// flow_id: TFlow_id,
// viewTimestamp: number,
// lpClickTimestamp: number | null,
// conversionTimestamp: number | null,
// cost: number,
// revenue: number,
// tokens: {
//     key: string,
//     value: string
// }[],
// viewRedirectUrl: string,
// clickRedirectUrl: string | null,
// ip?: string | null,
// userAgent?: string | null,
// language?: string | null,
// country?: string | null,
// region?: string | null,
// city?: string | null,
// isp?: string | null,
// mobileCarrier?: string | null,
// connectionType?: string | null,
// deviceModel?: string | null,
// deviceVendor?: string | null,
// deviceType?: string | null,
// screenResolution?: string | null,
// os?: string | null,
// osVersion?: string | null,
// browserName?: string | null,
// browserVersion?: string | null