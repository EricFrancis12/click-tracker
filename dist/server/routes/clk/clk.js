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
const utils_1 = require("../../utils/utils");
const clicks_1 = require("../../data/clicks");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let clickRedirectUrl, click;
    const click_id = req.signedCookies.click_id || req.cookies.click_id;
    try {
        if (click_id) {
            click = yield (0, clicks_1.fetchClickBy_id)(click_id);
        }
        clickRedirectUrl = (click === null || click === void 0 ? void 0 : click.clickRedirectUrl) ? click.clickRedirectUrl : null;
        res.redirect(clickRedirectUrl || (0, utils_1.catchAllRedirectUrl)());
        if (click) {
            (0, clicks_1.recordLandingPageClick)({
                click,
                campaign_id: click.campaign_id
            });
        }
    }
    catch (err) {
        console.error(err);
        res.redirect((0, utils_1.catchAllRedirectUrl)());
    }
}));
