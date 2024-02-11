import { Request } from 'express';
import { fetchAffiliateNetworks } from './affiliateNetworks';
import { fetchCampaigns } from './campaigns';
import { fetchFlows } from './flows';
import { fetchLandingPages } from './landingPages';
import { fetchOffers } from './offers';
import { fetchTrafficSources } from './trafficSources';
import { tokensDictionary, tokensList } from '../../client/src/lib/tokensList';
import type { TCampaign, TClick, TLandingPage, TOffer, TToken, TTrafficSource } from '../../client/src/lib/types';

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

export function replaceTokensInUrl({ url, click, campaign, landingPage, offer, trafficSource }: {
    url?: string | null,
    click: TClick,
    campaign?: TCampaign | null,
    landingPage?: TLandingPage | null,
    offer?: TOffer | null,
    trafficSource?: TTrafficSource | null
}) {
    if (!url) return '';

    let result = url.includes('?') ? `${url}&` : `${url}?`;
    tokensList.forEach(token => {
        if (result.includes(token.value)) {
            let replacementValue;
            switch (token.value) {
                case tokensDictionary['Click ID'].value: replacementValue = click._id; break;
                case tokensDictionary['Cost'].value: replacementValue = click.cost; break;
                case tokensDictionary['Campaign ID'].value: replacementValue = click.campaign_id; break;
                case tokensDictionary['Campaign Name'].value: replacementValue = campaign?.name ?? null; break;
                case tokensDictionary['Traffic Source ID'].value: replacementValue = click.trafficSource_id; break;
                case tokensDictionary['Traffic Source Name'].value: replacementValue = trafficSource?.name ?? null; break;
                case tokensDictionary['Landing Page ID'].value: replacementValue = click.landingPage_id; break;
                case tokensDictionary['Landing Page Name'].value: replacementValue = landingPage?.name ?? null; break;
                case tokensDictionary['Offer ID'].value: replacementValue = offer?._id; break;
                case tokensDictionary['Landing Page Name'].value: replacementValue = offer?.name ?? null; break;
                case tokensDictionary['Device Type'].value: replacementValue = click.deviceType ?? null; break;
                case tokensDictionary['Device Vendor'].value: replacementValue = click.deviceVendor ?? null; break;
                case tokensDictionary['Device Model'].value: replacementValue = click.deviceModel ?? null; break;
                case tokensDictionary['Browser Name'].value: replacementValue = click.browserName ?? null; break;
                case tokensDictionary['Browser Version'].value: replacementValue = click.browserVersion ?? null; break;
                case tokensDictionary['OS'].value: replacementValue = click.os ?? null; break;
                case tokensDictionary['OS Version'].value: replacementValue = click.osVersion ?? null; break;
                case tokensDictionary['Country Name'].value: replacementValue = click.geoName ?? null; break;
                case tokensDictionary['Region'].value: replacementValue = click.region ?? null; break;
                case tokensDictionary['City'].value: replacementValue = click.city ?? null; break;
                case tokensDictionary['ISP'].value: replacementValue = click.isp ?? null; break;
                case tokensDictionary['User Agent'].value: replacementValue = click.userAgent ?? null; break;
                case tokensDictionary['IP Address'].value: replacementValue = click.ip ?? null; break;
                case tokensDictionary['Language'].value: replacementValue = click.language ?? null; break;
                case tokensDictionary['Connection Type'].value: replacementValue = click.connectionType ?? null; break;
                case tokensDictionary['Mobile Carrier'].value: replacementValue = click.mobileCarrier ?? null; break;
            }
            if (!replacementValue) return;
            result = result.replace(new RegExp(token.value, 'g'), `${replacementValue}`);
        }
    });
    return result;
}
