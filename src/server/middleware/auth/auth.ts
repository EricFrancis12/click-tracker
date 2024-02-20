import { Request, Response, NextFunction } from 'express';

export let loggedInIp: string | null = null;

export default async function auth(req: Request, res: Response, next: NextFunction) {
    if (loggedIn(req) || process.env.DISABLE_AUTH === 'true') {
        next();
        return;
    }

    if (req.headers['Content-Type'] === 'application/json') {
        res.status(403).json({ success: false, message: 'You need to be logged in for that.' });
    } else {
        res.redirect('/login');
    }
}

export function loggedIn(req: Request) {
    return !!req.ip && !!loggedInIp && req.ip === loggedInIp;
}

export function login(ipAddress: string) {
    loggedInIp = ipAddress
}

export function logout() {
    loggedInIp = null;
}
