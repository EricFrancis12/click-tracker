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
exports.getTokensFromUrl = exports.fetchIpInfo = exports.fetchData = void 0;
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
        const affiliateNetworks = yield _affiliateNetworksPromise;
        const campaigns = yield campaignsPromise;
        const flows = yield flowsPromise;
        const landingPages = yield landingPagesPromise;
        const offers = yield offersPromise;
        const trafficSources = yield trafficSourcesPromise;
        return {
            affiliateNetworks,
            campaigns,
            flows,
            landingPages,
            offers,
            trafficSources
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
