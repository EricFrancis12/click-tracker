"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("./contexts/AuthContext");
const Home_1 = __importDefault(require("./pages/Home"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const NotFound_1 = __importDefault(require("./pages/NotFound"));
function App() {
    return (<AuthContext_1.AuthProvider>
            <react_router_dom_1.BrowserRouter>
                <react_router_dom_1.Routes>
                    <react_router_dom_1.Route path='/' element={<Home_1.default />}/>
                    <react_router_dom_1.Route path='/dashboard' element={<Dashboard_1.default />}/>
                    <react_router_dom_1.Route path='/*' element={<NotFound_1.default />}/>
                </react_router_dom_1.Routes>
            </react_router_dom_1.BrowserRouter>
        </AuthContext_1.AuthProvider>);
}
exports.default = App;
