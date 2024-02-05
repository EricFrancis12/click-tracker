import { Request } from 'express';
import { fetchAffiliateNetworks } from './affiliateNetworks';
import { fetchCampaigns } from './campaigns';
import { fetchFlows } from './flows';
import { fetchLandingPages } from './landingPages';
import { fetchOffers } from './offers';
import { fetchTrafficSources } from './trafficSources';
import { TToken, TTrafficSource } from '../../client/src/lib/types';
import { tokensDictionary, tokensList } from '../../client/src/lib/tokensList';

export async function fetchData() {
    const _affiliateNetworksPromise = fetchAffiliateNetworks();
    const campaignsPromise = fetchCampaigns();
    const flowsPromise = fetchFlows();
    const landingPagesPromise = fetchLandingPages();
    const offersPromise = fetchOffers();
    const trafficSourcesPromise = fetchTrafficSources();

    const affiliateNetworks = await _affiliateNetworksPromise;
    const campaigns = await campaignsPromise;
    const flows = await flowsPromise;
    const landingPages = await landingPagesPromise;
    const offers = await offersPromise;
    const trafficSources = await trafficSourcesPromise;

    return {
        affiliateNetworks,
        campaigns,
        flows,
        landingPages,
        offers,
        trafficSources
    };
}

export async function fetchIpInfo(req: Request) {
    if (!process.env.IP_INFO_TOKEN) {
        return null;
    }

    try {
        const res = await fetch(`https://ipinfo.io/${req.ip}?token=${process.env.IP_INFO_TOKEN}`)
        const ipInfo = await res.json();

        // example ipInfo: {
        //   "ip": "999.99.999.99",
        //   "hostname": "mobile-999-99-999-99.mobile.att.net",
        //   "city": "Atlanta",
        //   "region": "Georgia",
        //   "country": "US",
        //   "loc": "99.9999,-99.9999",
        //   "org": "AS99999 AT&T Mobility LLC",
        //   "postal": "99999",
        //   "timezone": "America/New_York"
        // }

        if (ipInfo) {
            return {
                country: ipInfo.country ?? null,
                region: ipInfo.region ?? null,
                city: ipInfo.city ?? null
            };
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function getTokensFromUrl(
    url: string,
    trafficSource?: TTrafficSource
): TToken[] {
    const queryString = url.includes('?')
        ? url.split('?').at(-1)
        : '';

    const params = queryString?.split('&') ?? [];
    return params
        .filter(param => {
            const queryParam = param.split('=').at(0);
            const isInTokensList = !!tokensList.find(token => token.queryParam === queryParam);
            const isNotClick_idToken = queryParam !== tokensDictionary['Click ID'].queryParam;
            const isNotCostToken = queryParam !== tokensDictionary.Cost.queryParam;
            const isInTrafficSourceCustomTokens = !!trafficSource?.customTokens?.find(token => token.queryParam === queryParam);
            return (isInTokensList && isNotClick_idToken && isNotCostToken) || isInTrafficSourceCustomTokens;
        })
        .map(param => {
            const [queryParam, value] = param.split('=');
            return {
                queryParam,
                value
            };
        });
}
