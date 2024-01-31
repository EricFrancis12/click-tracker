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
const landingPages_1 = require("../../data/landingPages");
const auth_1 = __importDefault(require("../../middleware/auth/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landingPages = yield (0, landingPages_1.fetchLandingPages)();
        res.json({ landingPages });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.get('/:landingPage_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landingPage = yield (0, landingPages_1.fetchLandingPageBy_id)(req.params.landingPage_id);
        res.json({ landingPage });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landingPage = req.body;
        if (!landingPage) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, landingPages_1.createNewAndSaveNewLandingPage)(landingPage);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.put('/:landingPage_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const landingPage = req.body;
        if (!landingPage) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, landingPages_1.updateLandingPage)(landingPage);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.delete('/:landingPage_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, landingPages_1.deleteLandingPageBy_id)(req.params.landingPage_id);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
