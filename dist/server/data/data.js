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
exports.fetchTrafficSourceBy_id = exports.fetchTrafficSources = exports.fetchOfferBy_id = exports.fetchOffers = exports.fetchLandingPageBy_id = exports.fetchLandingPages = exports.fetchFlowBy_id = exports.fetchFlows = exports.fetchClickBy_id = exports.fetchClicks = exports.fetchCampaignBy_id = exports.fetchCampaigns = exports.fetchAffiliateNetworkBy_id = exports.fetchAffiliateNetworks = exports.fetchData = void 0;
const placeholder_data_1 = require("./placeholder-data");
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            affiliateNetworks: placeholder_data_1.placeholderAffiliateNetworks,
            campaigns: placeholder_data_1.placeholderCampaigns,
            flows: placeholder_data_1.placeholderFlows,
            landingPages: placeholder_data_1.placeholderLandingPages,
            offers: placeholder_data_1.placeholderOffers,
            trafficSources: placeholder_data_1.placeholderTrafficSources
        };
    });
}
exports.fetchData = fetchData;
function fetchAffiliateNetworks() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderAffiliateNetworks;
    });
}
exports.fetchAffiliateNetworks = fetchAffiliateNetworks;
function fetchAffiliateNetworkBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderAffiliateNetworks.find(affiliateNetwork => affiliateNetwork._id === _id);
    });
}
exports.fetchAffiliateNetworkBy_id = fetchAffiliateNetworkBy_id;
function fetchCampaigns() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderCampaigns;
    });
}
exports.fetchCampaigns = fetchCampaigns;
function fetchCampaignBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderCampaigns.find(campaign => campaign._id === _id);
    });
}
exports.fetchCampaignBy_id = fetchCampaignBy_id;
function fetchClicks() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderClicks;
    });
}
exports.fetchClicks = fetchClicks;
function fetchClickBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderClicks.find(click => click._id === _id);
    });
}
exports.fetchClickBy_id = fetchClickBy_id;
function fetchFlows() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderFlows;
    });
}
exports.fetchFlows = fetchFlows;
function fetchFlowBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderFlows.find(flow => flow._id === _id);
    });
}
exports.fetchFlowBy_id = fetchFlowBy_id;
function fetchLandingPages() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderLandingPages;
    });
}
exports.fetchLandingPages = fetchLandingPages;
function fetchLandingPageBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderLandingPages.find(landingPage => landingPage._id === _id);
    });
}
exports.fetchLandingPageBy_id = fetchLandingPageBy_id;
function fetchOffers() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderOffers;
    });
}
exports.fetchOffers = fetchOffers;
function fetchOfferBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderOffers.find(offer => offer._id === _id);
    });
}
exports.fetchOfferBy_id = fetchOfferBy_id;
function fetchTrafficSources() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderTrafficSources;
    });
}
exports.fetchTrafficSources = fetchTrafficSources;
function fetchTrafficSourceBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderTrafficSources.find(trafficSource => trafficSource._id === _id);
    });
}
exports.fetchTrafficSourceBy_id = fetchTrafficSourceBy_id;
