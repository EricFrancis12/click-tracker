"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const auth_1 = require("../../middleware/auth/auth");
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const correctUsername = !!process.env.USERNAME && process.env.USERNAME === username;
    const correctPassword = !!process.env.PASSWORD && process.env.PASSWORD === password;
    if (process.env.DISABLE_AUTH === 'true') {
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
