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
const offers_1 = require("../../data/offers");
const auth_1 = __importDefault(require("../../middleware/auth/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield (0, offers_1.fetchOffers)();
        res.json({ offers });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.get('/:offer_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield (0, offers_1.fetchOfferBy_id)(req.params.offer_id);
        res.json({ offer });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = req.body;
        if (!offer) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, offers_1.createNewAndSaveNewOffer)(offer);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.put('/:offer_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = req.body;
        if (!offer) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, offers_1.updateOffer)(offer);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.delete('/:offer_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, offers_1.deleteOfferBy_id)(req.params.offer_id);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
