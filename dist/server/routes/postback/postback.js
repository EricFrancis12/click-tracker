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
const clicks_1 = require("../../data/clicks");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:click_id', postback);
router.post('/:click_id', postback);
function postback(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        res.json({});
        try {
            const click = yield (0, clicks_1.fetchClickBy_id)(req.params.click_id);
            if (!click) {
                return;
            }
            const revenue = parseFloat((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.payout) !== null && _b !== void 0 ? _b : 0);
            (0, clicks_1.recordConversion)({ click, revenue });
        }
        catch (err) {
            console.error(err);
        }
    });
}
