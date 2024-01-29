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
const landingPages_1 = require("../../data/landingPages");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const landingPages = yield (0, landingPages_1.fetchLandingPages)();
    res.json({ landingPages });
}));
router.get('/:landingPage_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const landingPage = yield (0, landingPages_1.fetchLandingPageBy_id)(req.params.landingPage_id);
    res.json({ landingPage });
}));
