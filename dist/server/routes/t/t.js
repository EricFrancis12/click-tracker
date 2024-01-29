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
const data_1 = require("../../data/data");
const utils_1 = require("../../utils/utils");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:campaign_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const campaign = yield (0, data_1.fetchCampaignBy_id)(req.params.campaign_id);
    if (!campaign) {
        return res.redirect((0, utils_1.catchAllRedirectUrl)());
    }
    const click = (0, utils_1.makeNewClickFromReq)({ req, campaign });
    /;
    let flow;
    // Handle based on flow type
    if (campaign.flow.type === 'saved') {
        flow = yield (0, data_1.fetchFlowBy_id)(campaign.flow._id);
    }
    else if (campaign.flow.type === 'built_in') {
        flow = campaign.flow;
    }
    else if (campaign.flow.type === 'url' && campaign.flow.url) {
        res.redirect(campaign.flow.url);
    }
    else {
        res.redirect((0, utils_1.catchAllRedirectUrl)());
    }
    if (flow) {
        if (flow.ruleRoutes) {
            // determine if the request triggers any ruleRoutes
            for (let i = 0; i < ((_a = flow.ruleRoutes) === null || _a === void 0 ? void 0 : _a.length); i++) {
            }
        }
        // if so, the first one triggered gets the redirect
        // if not, the redirect goes to the defaultRoute
        // now that we've chosen a route, use flow.path.active, flow.path.weight to selelct a path
        // if !flow.path.directLinkingEnabled, select a landingPage based on flow.path.landingPaths[i].weight
        // else, select an offer based on flow.path.offers[i].weight
    }
    // log click data in db
}));
