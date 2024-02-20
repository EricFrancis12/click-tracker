"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceTokensInUrl = exports.getTokensFromUrl = exports.fetchIpInfo = exports.fetchData = void 0;
const affiliateNetworks_1 = require("./affiliateNetworks");
const campaigns_1 = require("./campaigns");
const flows_1 = require("./flows");
const landingPages_1 = require("./landingPages");
const offers_1 = require("./offers");
const trafficSources_1 = require("./trafficSources");
const tokensList_1 = require("../../client/src/lib/tokensList");
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const _affiliateNetworksPromise = (0, affiliateNetworks_1.fetchAffiliateNetworks)();
        const campaignsPromise = (0, campaigns_1.fetchCampaigns)();
        const flowsPromise = (0, flows_1.fetchFlows)();
        const landingPagesPromise = (0, landingPages_1.fetchLandingPages)();
        const offersPromise = (0, offers_1.fetchOffers)();
        const trafficSourcesPromise = (0, trafficSources_1.fetchTrafficSources)();
        const affiliateNetworks = yield _affiliateNetworksPromise.catch(err => console.error('Error fetching affiliate networks.'));
        const campaigns = yield campaignsPromise.catch(err => console.error('Error fetching campaigns.'));
        const flows = yield flowsPromise.catch(err => console.error('Error fetching flows.'));
        const landingPages = yield landingPagesPromise.catch(err => console.error('Error fetching landing pages.'));
        const offers = yield offersPromise.catch(err => console.error('Error fetching offers.'));
        const trafficSources = yield trafficSourcesPromise.catch(err => console.error('Error fetching traffic sources.'));
        return {
            affiliateNetworks: affiliateNetworks !== null && affiliateNetworks !== void 0 ? affiliateNetworks : [],
            campaigns: campaigns !== null && campaigns !== void 0 ? campaigns : [],
            flows: flows !== null && flows !== void 0 ? flows : [],
            landingPages: landingPages !== null && landingPages !== void 0 ? landingPages : [],
            offers: offers !== null && offers !== void 0 ? offers : [],
            trafficSources: trafficSources !== null && trafficSources !== void 0 ? trafficSources : []
        };
    });
}
exports.fetchData = fetchData;
function fetchIpInfo(req) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.IP_INFO_TOKEN) {
            return null;
        }
        try {
            const res = yield fetch(`https://ipinfo.io/${req.ip}?token=${process.env.IP_INFO_TOKEN}`);
            const ipInfo = yield res.json();
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
                    country: (_a = ipInfo.country) !== null && _a !== void 0 ? _a : null,
                    region: (_b = ipInfo.region) !== null && _b !== void 0 ? _b : null,
                    city: (_c = ipInfo.city) !== null && _c !== void 0 ? _c : null
                };
            }
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.fetchIpInfo = fetchIpInfo;
function getTokensFromUrl(url, trafficSource) {
    var _a;
    const queryString = url.includes('?')
        ? url.split('?').at(-1)
        : '';
    const params = (_a = queryString === null || queryString === void 0 ? void 0 : queryString.split('&')) !== null && _a !== void 0 ? _a : [];
    return params
        .filter(param => {
        var _a;
        const queryParam = param.split('=').at(0);
        const isInTokensList = !!tokensList_1.tokensList.find(token => token.queryParam === queryParam);
        const isNotClick_idToken = queryParam !== tokensList_1.tokensDictionary['Click ID'].queryParam;
        const isNotCostToken = queryParam !== tokensList_1.tokensDictionary.Cost.queryParam;
        const isInTrafficSourceCustomTokens = !!((_a = trafficSource === null || trafficSource === void 0 ? void 0 : trafficSource.customTokens) === null || _a === void 0 ? void 0 : _a.find(token => token.queryParam === queryParam));
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
exports.getTokensFromUrl = getTokensFromUrl;
function replaceTokensInUrl({ url, click, campaign, landingPage, offer, trafficSource }) {
    if (!url)
        return '';
    let result = url.includes('?') ? `${url}&` : `${url}?`;
    tokensList_1.tokensList.forEach(token => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        if (result.includes(token.value)) {
            let replacementValue;
            switch (token.value) {
                case tokensList_1.tokensDictionary['Click ID'].value:
                    replacementValue = click._id;
                    break;
                case tokensList_1.tokensDictionary['Cost'].value:
                    replacementValue = click.cost;
                    break;
                case tokensList_1.tokensDictionary['Campaign ID'].value:
                    replacementValue = click.campaign_id;
                    break;
                case tokensList_1.tokensDictionary['Campaign Name'].value:
                    replacementValue = (_a = campaign === null || campaign === void 0 ? void 0 : campaign.name) !== null && _a !== void 0 ? _a : null;
                    break;
                case tokensList_1.tokensDictionary['Traffic Source ID'].value:
                    replacementValue = click.trafficSource_id;
                    break;
                case tokensList_1.tokensDictionary['Traffic Source Name'].value:
                    replacementValue = (_b = trafficSource === null || trafficSource === void 0 ? void 0 : trafficSource.name) !== null && _b !== void 0 ? _b : null;
                    break;
                case tokensList_1.tokensDictionary['Landing Page ID'].value:
                    replacementValue = click.landingPage_id;
                    break;
                case tokensList_1.tokensDictionary['Landing Page Name'].value:
                    replacementValue = (_c = landingPage === null || landingPage === void 0 ? void 0 : landingPage.name) !== null && _c !== void 0 ? _c : null;
                    break;
                case tokensList_1.tokensDictionary['Offer ID'].value:
                    replacementValue = offer === null || offer === void 0 ? void 0 : offer._id;
                    break;
                case tokensList_1.tokensDictionary['Landing Page Name'].value:
                    replacementValue = (_d = offer === null || offer === void 0 ? void 0 : offer.name) !== null && _d !== void 0 ? _d : null;
                    break;
                case tokensList_1.tokensDictionary['Device Type'].value:
                    replacementValue = (_e = click.deviceType) !== null && _e !== void 0 ? _e : null;
                    break;
                case tokensList_1.tokensDictionary['Device Vendor'].value:
                    replacementValue = (_f = click.deviceVendor) !== null && _f !== void 0 ? _f : null;
                    break;
                case tokensList_1.tokensDictionary['Device Model'].value:
                    replacementValue = (_g = click.deviceModel) !== null && _g !== void 0 ? _g : null;
                    break;
                case tokensList_1.tokensDictionary['Browser Name'].value:
                    replacementValue = (_h = click.browserName) !== null && _h !== void 0 ? _h : null;
                    break;
                case tokensList_1.tokensDictionary['Browser Version'].value:
                    replacementValue = (_j = click.browserVersion) !== null && _j !== void 0 ? _j : null;
                    break;
                case tokensList_1.tokensDictionary['OS'].value:
                    replacementValue = (_k = click.os) !== null && _k !== void 0 ? _k : null;
                    break;
                case tokensList_1.tokensDictionary['OS Version'].value:
                    replacementValue = (_l = click.osVersion) !== null && _l !== void 0 ? _l : null;
                    break;
                case tokensList_1.tokensDictionary['Country Name'].value:
                    replacementValue = (_m = click.geoName) !== null && _m !== void 0 ? _m : null;
                    break;
                case tokensList_1.tokensDictionary['Region'].value:
                    replacementValue = (_o = click.region) !== null && _o !== void 0 ? _o : null;
                    break;
                case tokensList_1.tokensDictionary['City'].value:
                    replacementValue = (_p = click.city) !== null && _p !== void 0 ? _p : null;
                    break;
                case tokensList_1.tokensDictionary['ISP'].value:
                    replacementValue = (_q = click.isp) !== null && _q !== void 0 ? _q : null;
                    break;
                case tokensList_1.tokensDictionary['User Agent'].value:
                    replacementValue = (_r = click.userAgent) !== null && _r !== void 0 ? _r : null;
                    break;
                case tokensList_1.tokensDictionary['IP Address'].value:
                    replacementValue = (_s = click.ip) !== null && _s !== void 0 ? _s : null;
                    break;
                case tokensList_1.tokensDictionary['Language'].value:
                    replacementValue = (_t = click.language) !== null && _t !== void 0 ? _t : null;
                    break;
                case tokensList_1.tokensDictionary['Connection Type'].value:
                    replacementValue = (_u = click.connectionType) !== null && _u !== void 0 ? _u : null;
                    break;
                case tokensList_1.tokensDictionary['Mobile Carrier'].value:
                    replacementValue = (_v = click.mobileCarrier) !== null && _v !== void 0 ? _v : null;
                    break;
            }
            if (!replacementValue)
                return;
            result = result.replace(new RegExp(token.value, 'g'), `${replacementValue}`);
        }
    });
    return result;
}
exports.replaceTokensInUrl = replaceTokensInUrl;
