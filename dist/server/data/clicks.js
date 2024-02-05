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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordConversion = exports.recordLandingPageClick = exports.makeNewClickFromReq = exports.makeClickPropsFromReq = exports.deleteClickBy_id = exports.updateClick = exports.createNewAndSaveNewClick = exports.fetchClickBy_id = exports.fetchClicks = void 0;
const campaigns_1 = require("./campaigns");
const offers_1 = require("./offers");
const _id_1 = require("../../client/src/lib/_id");
const flows_1 = require("./flows");
const utils_1 = require("../utils/utils");
const data_1 = require("./data");
const landingPages_1 = require("./landingPages");
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const tokensList_1 = require("../../client/src/lib/tokensList");
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchClicks() {
    return __awaiter(this, void 0, void 0, function* () {
        const clicksCollection = db.collection('clicks');
        const dbResults = yield clicksCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch clicks');
        }
        const clicks = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return clicks;
    });
}
exports.fetchClicks = fetchClicks;
function fetchClickBy_id(_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const clicks = yield fetchClicks();
        return (_a = clicks.find((click) => (click === null || click === void 0 ? void 0 : click._id) === _id)) !== null && _a !== void 0 ? _a : null;
    });
}
exports.fetchClickBy_id = fetchClickBy_id;
function createNewAndSaveNewClick(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.set(click._id, click);
    });
}
exports.createNewAndSaveNewClick = createNewAndSaveNewClick;
function updateClick(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const _click = yield fetchClickBy_id(click._id);
        if (!_click) {
            throw new Error('Unable to update click');
        }
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.set(click._id, click);
    });
}
exports.updateClick = updateClick;
function deleteClickBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _click = yield fetchClickBy_id(_id);
        if (!_click) {
            throw new Error('Unable to delete click');
        }
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.delete(_id);
    });
}
exports.deleteClickBy_id = deleteClickBy_id;
function makeClickPropsFromReq(req) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const ipInfo = yield (0, data_1.fetchIpInfo)(req);
        const geoName = (_a = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.country) !== null && _a !== void 0 ? _a : null;
        const region = (_b = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.region) !== null && _b !== void 0 ? _b : null;
        const city = (_c = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.city) !== null && _c !== void 0 ? _c : null;
        return {
            geoName,
            region,
            city,
            language: (0, utils_1.getLanguageFromReq)(req),
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
    });
}
exports.makeClickPropsFromReq = makeClickPropsFromReq;
function makeNewClickFromReq({ req, campaign, campaign_id, flow, flow_id, landingPage, landingPage_id, offer, offer_id, directLinkingEnabled, clickPropsFromReq }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    return __awaiter(this, void 0, void 0, function* () {
        if (!campaign && campaign_id) {
            campaign = yield (0, campaigns_1.fetchCampaignBy_id)(campaign_id);
            if (!campaign) {
                throw new Error('Unable to find campaign with this _id');
            }
        }
        else {
            throw new Error('A campaign or campaign_id is required');
        }
        if (!flow && flow_id) {
            flow = yield (0, flows_1.fetchFlowBy_id)(flow_id);
            if (!flow) {
                throw new Error('Unable to find flow with this _id');
            }
        }
        else {
            throw new Error('A flow or flow_id is required');
        }
        if (!landingPage && landingPage_id) {
            landingPage = yield (0, landingPages_1.fetchLandingPageBy_id)(landingPage_id);
            if (!landingPage) {
                throw new Error('Unable to find landing page with this _id');
            }
        }
        if (!offer && offer_id) {
            offer = yield (0, offers_1.fetchOfferBy_id)(offer_id);
            if (!offer) {
                throw new Error('Unable to find offer with this _id');
            }
        }
        const timestamp = Date.now();
        const tokens = (0, data_1.getTokensFromUrl)(req.url);
        const cost = parseFloat((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a[tokensList_1.tokensDictionary.Cost.queryParam]) !== null && _b !== void 0 ? _b : 0);
        const ipInfo = clickPropsFromReq ? null : yield (0, data_1.fetchIpInfo)(req);
        const click = {
            _id: (0, _id_1.generateNewClick_id)(),
            campaign_id: campaign._id,
            trafficSource_id: campaign.trafficSource_id,
            landingPage_id: (landingPage === null || landingPage === void 0 ? void 0 : landingPage._id) || null,
            offer_id: (offer === null || offer === void 0 ? void 0 : offer._id) || null,
            flow_id: flow._id,
            viewTimestamp: timestamp,
            lpClickTimestamp: directLinkingEnabled ? timestamp : null,
            conversionTimestamp: null,
            cost,
            revenue: 0,
            tokens,
            viewRedirectUrl: (_c = (directLinkingEnabled ? offer === null || offer === void 0 ? void 0 : offer.url : landingPage === null || landingPage === void 0 ? void 0 : landingPage.url)) !== null && _c !== void 0 ? _c : null,
            clickRedirectUrl: (_d = offer === null || offer === void 0 ? void 0 : offer.url) !== null && _d !== void 0 ? _d : null,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            language: (_f = (_e = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.language) !== null && _e !== void 0 ? _e : (0, utils_1.getLanguageFromReq)(req)) !== null && _f !== void 0 ? _f : undefined,
            geoName: (_h = (_g = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.country) !== null && _g !== void 0 ? _g : clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.geoName) !== null && _h !== void 0 ? _h : undefined,
            region: (_k = (_j = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.region) !== null && _j !== void 0 ? _j : clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.region) !== null && _k !== void 0 ? _k : undefined,
            city: (_m = (_l = ipInfo === null || ipInfo === void 0 ? void 0 : ipInfo.city) !== null && _l !== void 0 ? _l : clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.city) !== null && _m !== void 0 ? _m : undefined,
            isp: (_o = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.isp) !== null && _o !== void 0 ? _o : undefined,
            mobileCarrier: (_p = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.mobileCarrier) !== null && _p !== void 0 ? _p : undefined,
            connectionType: (_q = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.connectionType) !== null && _q !== void 0 ? _q : undefined,
            deviceModel: (_r = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.deviceModel) !== null && _r !== void 0 ? _r : undefined,
            deviceVendor: (_s = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.deviceVendor) !== null && _s !== void 0 ? _s : undefined,
            deviceType: (_t = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.deviceType) !== null && _t !== void 0 ? _t : undefined,
            screenResolution: (_u = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.screenResolution) !== null && _u !== void 0 ? _u : undefined,
            os: (_v = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.os) !== null && _v !== void 0 ? _v : undefined,
            osVersion: (_w = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.osVersion) !== null && _w !== void 0 ? _w : undefined,
            browserName: (_x = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.browserName) !== null && _x !== void 0 ? _x : undefined,
            browserVersion: (_y = clickPropsFromReq === null || clickPropsFromReq === void 0 ? void 0 : clickPropsFromReq.browserVersion) !== null && _y !== void 0 ? _y : undefined
        };
        return click;
    });
}
exports.makeNewClickFromReq = makeNewClickFromReq;
function recordLandingPageClick({ click, campaign, campaign_id }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!campaign && campaign_id) {
            campaign = yield (0, campaigns_1.fetchCampaignBy_id)(campaign_id);
            if (!campaign) {
                throw new Error('Unable to find campaign with this _id');
            }
        }
        else {
            throw new Error('A campaign or campaign_id is required');
        }
        const clickCopy = structuredClone(click);
        const timestamp = Date.now();
        clickCopy.lpClickTimestamp = timestamp;
        return yield updateClick(clickCopy);
    });
}
exports.recordLandingPageClick = recordLandingPageClick;
function recordConversion({ click, revenue = 0 }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const clickCopy = structuredClone(click);
        const timestamp = Date.now();
        clickCopy.conversionTimestamp = timestamp;
        clickCopy.revenue = ((_a = clickCopy.revenue) !== null && _a !== void 0 ? _a : 0) + revenue;
        return yield updateClick(clickCopy);
    });
}
exports.recordConversion = recordConversion;
