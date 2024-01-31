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
exports.fetchData = void 0;
const affiliateNetworks_1 = require("./affiliateNetworks");
const campaigns_1 = require("./campaigns");
const flows_1 = require("./flows");
const landingPages_1 = require("./landingPages");
const offers_1 = require("./offers");
const trafficSources_1 = require("./trafficSources");
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const affiliateNetworks = (0, affiliateNetworks_1.fetchAffiliateNetworks)();
        const campaigns = (0, campaigns_1.fetchCampaigns)();
        const flows = (0, flows_1.fetchFlows)();
        const landingPages = (0, landingPages_1.fetchLandingPages)();
        const offers = (0, offers_1.fetchOffers)();
        const trafficSources = (0, trafficSources_1.fetchTrafficSources)();
        yield Promise.all([affiliateNetworks, campaigns, flows, landingPages, offers, trafficSources]);
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
