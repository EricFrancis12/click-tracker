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
exports.router = void 0;
const utils_1 = require("../../../client/src/utils/utils");
const clicks_1 = require("../../data/clicks");
const data_1 = require("../../data/data");
const flows_1 = require("../../data/flows");
const utils_2 = require("../../utils/utils");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:campaign_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        if (!req.params.campaign_id) {
            return res.redirect((0, utils_2.catchAllRedirectUrl)());
        }
        const data = yield (0, data_1.fetchData)();
        const campaign = (_a = data.campaigns.find(_campaign => _campaign._id === req.params.campaign_id)) !== null && _a !== void 0 ? _a : null;
        if (!campaign) {
            return res.redirect((0, utils_2.catchAllRedirectUrl)());
        }
        const clickPropsFromReq = yield (0, clicks_1.makeClickPropsFromReq)(req);
        let directLinkingEnabled = false;
        let flow, route, path, landingPage, offer, viewRedirectUrl, clickRedirectUrl;
        if (campaign.flow.type === 'url' && campaign.flow.url) {
            flow = campaign.flow;
            landingPage = null;
            offer = null;
            viewRedirectUrl = campaign.flow.url;
        }
        else {
            if (campaign.flow.type === 'saved' && campaign.flow._id) {
                flow = yield (0, flows_1.fetchFlowBy_id)(campaign.flow._id);
                if (!flow) {
                    viewRedirectUrl = (0, utils_2.catchAllRedirectUrl)();
                }
            }
            else if (campaign.flow.type === 'built_in') {
                flow = campaign.flow;
            }
            if ((flow === null || flow === void 0 ? void 0 : flow.ruleRoutes) && flow.ruleRoutes.length > 0) {
                for (let i = 0; i < flow.ruleRoutes.length; i++) {
                    const ruleRoute = flow.ruleRoutes[i];
                    if (!ruleRoute.active) {
                        continue;
                    }
                    if ((0, utils_2.clickTriggersRuleRoute)(clickPropsFromReq, ruleRoute)) {
                        route = ruleRoute;
                        break;
                    }
                    if (i === flow.ruleRoutes.length - 1) {
                        route = flow.defaultRoute;
                    }
                }
            }
            if (route) {
                path = (0, utils_1.weightedRandomlySelectItem)(route.paths);
            }
            if (path) {
                if (!path.directLinkingEnabled) {
                    directLinkingEnabled = false;
                    const selectedLandingPage_id = (0, utils_1.weightedRandomlySelectItem)(path.landingPages)._id;
                    const selectedOffer_id = (0, utils_1.weightedRandomlySelectItem)(path.offers)._id;
                    landingPage = data.landingPages.find(landingPage => landingPage._id === selectedLandingPage_id);
                    offer = data.offers.find(offer => offer._id === selectedOffer_id);
                    viewRedirectUrl = (_b = landingPage === null || landingPage === void 0 ? void 0 : landingPage.url) !== null && _b !== void 0 ? _b : null;
                    clickRedirectUrl = (_c = offer === null || offer === void 0 ? void 0 : offer.url) !== null && _c !== void 0 ? _c : null;
                }
                else {
                    directLinkingEnabled = true;
                    const selectedOffer_id = (0, utils_1.weightedRandomlySelectItem)(path.offers)._id;
                    landingPage = null;
                    offer = data.offers.find(offer => offer._id === selectedOffer_id);
                    viewRedirectUrl = (_d = offer === null || offer === void 0 ? void 0 : offer.url) !== null && _d !== void 0 ? _d : null;
                    clickRedirectUrl = (_e = offer === null || offer === void 0 ? void 0 : offer.url) !== null && _e !== void 0 ? _e : null;
                }
            }
            const click = yield (0, clicks_1.makeNewClickFromReq)({
                req,
                campaign,
                flow,
                landingPage,
                offer,
                directLinkingEnabled,
                clickPropsFromReq
            });
            if (click === null || click === void 0 ? void 0 : click._id) {
                res.cookie('click_id', click._id, { httpOnly: true });
            }
            res.redirect(viewRedirectUrl !== null && viewRedirectUrl !== void 0 ? viewRedirectUrl : (0, utils_2.catchAllRedirectUrl)());
            if (campaign && flow) {
                (0, clicks_1.createNewAndSaveNewClick)(click);
            }
        }
    }
    catch (err) {
        console.error(err);
        return res.redirect((0, utils_2.catchAllRedirectUrl)());
    }
}));
