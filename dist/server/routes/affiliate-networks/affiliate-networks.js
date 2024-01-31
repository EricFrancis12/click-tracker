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
exports.router = void 0;
const affiliateNetworks_1 = require("../../data/affiliateNetworks");
const auth_1 = __importDefault(require("../../middleware/auth/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const affiliateNetworks = yield (0, affiliateNetworks_1.fetchAffiliateNetworks)();
        res.json({ affiliateNetworks });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.get('/:affiliateNetwork_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const affiliateNetwork = yield (0, affiliateNetworks_1.fetchAffiliateNetworkBy_id)(req.params.affiliateNetwork_id);
        res.json({ affiliateNetwork });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const affiliateNetwork = req.body;
        if (!affiliateNetwork) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, affiliateNetworks_1.createNewAndSaveNewAffiliateNetwork)(affiliateNetwork);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.put('/:affiliateNetwork_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const affiliateNetwork = req.body;
        if (!affiliateNetwork) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, affiliateNetworks_1.updateAffiliateNetwork)(affiliateNetwork);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.delete('/:affiliateNetwork_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, affiliateNetworks_1.deleteAffiliateNetworkBy_id)(req.params.affiliateNetwork_id);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
