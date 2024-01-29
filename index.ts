import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import path from 'path';

import express from 'express';
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('./', 'client', 'build')));
app.use(express.static(path.resolve('./', 'client', 'public')));

import { router as affiliateNetworksRouter } from './src/server/routes/affiliate-networks/affiliate-networks';
import { router as campaignsRouter } from './src/server/routes/campaigns/campaigns';
import { router as clicksRouter } from './src/server/routes/clicks/clicks';
import { router as clkRouter } from './src/server/routes/clk/clk';
import { router as dataRouter } from './src/server/routes/data/data';
import { router as flowsRouter } from './src/server/routes/flows/flows';
import { router as landingPagesRouter } from './src/server/routes/landing-pages/landing-pages';
import { router as loginRouter } from './src/server/routes/login/login';
import { router as logoutRouter } from './src/server/routes/logout/logout';
import { router as offersRouter } from './src/server/routes/offers/offers';
import { router as postbackRouter } from './src/server/routes/postback/postback';
import { router as tRouter } from './src/server/routes/t/t';
import { router as trafficSourcesRouter } from './src/server/routes/traffic-sources/traffic-sources';

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

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'build', 'index.html'));
});

const port = process.env.PORT || process.env.BACKEND_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
