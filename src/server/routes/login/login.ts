import path from 'path';

import { Router } from 'express';
const router = Router();

import { login } from '../../middleware/auth/auth';

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./', 'src', 'client', 'build', 'index.html'));
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const correctUsername = !!process.env.USERNAME && process.env.USERNAME === username;
    const correctPassword = !!process.env.PASSWORD && process.env.PASSWORD === password;

    if (process.env.DISABLE_AUTH === 'true') {
        login('AUTH_DISABLED_BY_ENV_VAR');
        res.status(200).json({ success: true });
    } else if (correctUsername && correctPassword && !!req.ip) {
        login(req.ip);
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }
});

export { router };
