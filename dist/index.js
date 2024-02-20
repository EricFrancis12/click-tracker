"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./server/middleware/auth/auth");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
const affiliate_networks_1 = require("./server/routes/affiliate-networks/affiliate-networks");
const campaigns_1 = require("./server/routes/campaigns/campaigns");
const clicks_1 = require("./server/routes/clicks/clicks");
const clk_1 = require("./server/routes/clk/clk");
const data_1 = require("./server/routes/data/data");
const flows_1 = require("./server/routes/flows/flows");
const landing_pages_1 = require("./server/routes/landing-pages/landing-pages");
const login_1 = require("./server/routes/login/login");
const logout_1 = require("./server/routes/logout/logout");
const offers_1 = require("./server/routes/offers/offers");
const postback_1 = require("./server/routes/postback/postback");
const t_1 = require("./server/routes/t/t");
const traffic_sources_1 = require("./server/routes/traffic-sources/traffic-sources");
app.use('/affiliate-networks', affiliate_networks_1.router);
app.use('/campaigns', campaigns_1.router);
app.use('/clicks', clicks_1.router);
app.use('/clk', clk_1.router);
app.use('/data', data_1.router);
app.use('/flows', flows_1.router);
app.use('/landing-pages', landing_pages_1.router);
app.use('/login', login_1.router);
app.use('/logout', logout_1.router);
app.use('/offers', offers_1.router);
app.use('/postback', postback_1.router);
app.use('/t', t_1.router);
app.use('/traffic-sources', traffic_sources_1.router);
app.get('/', catchAllRoute);
app.get('*', catchAllRoute);
function catchAllRoute(req, res) {
    if (req.path && req.path !== '/') {
        const publicPath = path_1.default.resolve(`./src/client/build${req.path}`);
        const buildPath = path_1.default.resolve(`./src/client/public${req.path}`);
        if (fs_1.default.existsSync(publicPath)) {
            res.sendFile(publicPath);
        }
        else if (fs_1.default.existsSync(buildPath)) {
            res.sendFile(buildPath);
        }
    }
    else if ((0, auth_1.loggedIn)(req)) {
        res.sendFile(path_1.default.resolve('./', 'src', 'client', 'build', 'index.html'));
    }
    else if (req.headers['Content-Type'] === 'application/json') {
        res.status(403).json({ success: false, message: 'You need to be logged in for that.' });
    }
    else {
        res.redirect('/login');
    }
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
