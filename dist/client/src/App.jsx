"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("./contexts/AuthContext");
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Login_1 = __importDefault(require("./pages/Login"));
const TestLandingPage_1 = __importDefault(require("./pages/TestLandingPage"));
const NotFound_1 = __importDefault(require("./pages/NotFound"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
            <react_router_dom_1.Routes>
                <react_router_dom_1.Route path='/' element={<AuthContext_1.AuthProvider><react_router_dom_1.Navigate to='/dashboard'/></AuthContext_1.AuthProvider>}/>
                <react_router_dom_1.Route path='/dashboard' element={<AuthContext_1.AuthProvider><Dashboard_1.default /></AuthContext_1.AuthProvider>}/>
                <react_router_dom_1.Route path='/login' element={<Login_1.default />}/>
                <react_router_dom_1.Route path='/lp'>
                    <react_router_dom_1.Route path='test' element={<TestLandingPage_1.default />}/>
                </react_router_dom_1.Route>
                <react_router_dom_1.Route path='/*' element={<NotFound_1.default />}/>
            </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
