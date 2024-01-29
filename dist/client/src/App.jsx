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
const react_1 = require("react");
const logo_svg_1 = require("./logo.svg");
const data_utils_1 = require("./utils/data-utils");
const form_input_1 = __importDefault(require("./components/form-input/form-input"));
require("./App.css");
const defaultFormFields = {
    email: '',
    password: '',
};
const App = () => {
    // react hooks
    const [user, setUser] = (0, react_1.useState)();
    const [formFields, setFormFields] = (0, react_1.useState)(defaultFormFields);
    const { email, password } = formFields;
    const resetFormFields = () => {
        return (setFormFields(defaultFormFields));
    };
    // handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields(Object.assign(Object.assign({}, formFields), { [name]: value }));
    };
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            // make the API call
            const res = yield (0, data_utils_1.getData)('http://localhost:8000/login', email, password);
            setUser(res);
            resetFormFields();
        }
        catch (error) {
            alert('User Sign In Failed');
        }
    });
    const reload = () => {
        setUser(null);
        resetFormFields();
    };
    return (<div className='App-header'>
      <h1>
        {user && `Welcome! ${user.name}`}
      </h1>
      <div className="card">
        <logo_svg_1.ReactComponent className="logo"/>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <form_input_1.default label="Email" type="email" required name="email" value={email} onChange={handleChange}/>
          <form_input_1.default label="Password" type='password' required name='password' value={password} onChange={handleChange}/>
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>Clear</button>
            </span>
          </div>
        </form>
      </div>
    </div>);
};
exports.default = App;
