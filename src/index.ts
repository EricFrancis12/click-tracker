import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { loggedIn } from './server/middleware/auth/auth';

import express, { Request, Response } from 'express';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

import { router as affiliateNetworksRouter } from './server/routes/affiliate-networks/affiliate-networks';
import { router as campaignsRouter } from './server/routes/campaigns/campaigns';
import { router as clicksRouter } from './server/routes/clicks/clicks';
import { router as clkRouter } from './server/routes/clk/clk';
import { router as dataRouter } from './server/routes/data/data';
import { router as flowsRouter } from './server/routes/flows/flows';
import { router as landingPagesRouter } from './server/routes/landing-pages/landing-pages';
import { router as loginRouter } from './server/routes/login/login';
import { router as logoutRouter } from './server/routes/logout/logout';
import { router as offersRouter } from './server/routes/offers/offers';
import { router as postbackRouter } from './server/routes/postback/postback';
import { router as tRouter } from './server/routes/t/t';
import { router as trafficSourcesRouter } from './server/routes/traffic-sources/traffic-sources';

app.use('/affiliate-networks', affiliateNetworksRouter);
app.use('/campaigns', campaignsRouter);
app.use('/clicks', clicksRouter);
app.use('/clk', clkRouter);
app.use('/data', dataRouter);
app.use('/flows', flowsRouter);
app.use('/landing-pages', landingPagesRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/offers', offersRouter);
app.use('/postback', postbackRouter);
app.use('/t', tRouter);
app.use('/traffic-sources', trafficSourcesRouter);

app.get('/', catchAllRoute);
app.get('*', catchAllRoute);

function catchAllRoute(req: Request, res: Response) {
    if (req.path && req.path !== '/') {
        const publicPath = path.resolve(`./src/client/build${req.path}`);
        const buildPath = path.resolve(`./src/client/public${req.path}`);
        if (fs.existsSync(publicPath)) {
            res.sendFile(publicPath);
        } else if (fs.existsSync(buildPath)) {
            res.sendFile(buildPath);
        }
    } else if (loggedIn(req)) {
        res.sendFile(path.resolve('./', 'src', 'client', 'build', 'index.html'));
    } else if (req.headers['Content-Type'] === 'application/json') {
        res.status(403).json({ success: false, message: 'You need to be logged in for that.' });
    } else {
        res.redirect('/login');
    }
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
