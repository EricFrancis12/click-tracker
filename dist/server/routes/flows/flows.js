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
const flows_1 = require("../../data/flows");
const auth_1 = __importDefault(require("../../middleware/auth/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flows = yield (0, flows_1.fetchFlows)();
        res.json({ flows });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.get('/:flow_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flow = yield (0, flows_1.fetchFlowBy_id)(req.params.flow_id);
        res.json({ flow });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flow = req.body;
        if (!flow) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, flows_1.createNewAndSaveNewFlow)(flow);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.put('/:flow_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flow = req.body;
        if (!flow) {
            res.json({ success: false, message: 'Request body required' });
        }
        yield (0, flows_1.updateFlow)(flow);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
router.delete('/:flow_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, flows_1.deleteFlowBy_id)(req.params.flow_id);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
}));
