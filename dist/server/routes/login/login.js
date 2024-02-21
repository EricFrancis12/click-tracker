"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const auth_1 = require("../../middleware/auth/auth");
router.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve('./', 'src', 'client', 'build', 'index.html'));
});
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const correctUsername = !!process.env.USERNAME && process.env.USERNAME === username;
    const correctPassword = !!process.env.PASSWORD && process.env.PASSWORD === password;
    if (process.env.DISABLE_AUTH === 'true') {
        (0, auth_1.login)('AUTH_DISABLED_BY_ENV_VAR');
        res.status(200).json({ success: true });
    }
    else if (correctUsername && correctPassword && !!req.ip) {
        (0, auth_1.login)(req.ip);
        res.status(200).json({ success: true });
    }
    else {
        res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }
});
