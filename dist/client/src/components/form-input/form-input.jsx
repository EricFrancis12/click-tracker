"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./form-input.css");
const FormInput = (_a) => {
    var { label } = _a, otherProps = __rest(_a, ["label"]);
    function handleClick(e) {
        fetch('http://localhost:3001/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ hi: 'there' })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
    return (<>
            {/* <div className='group'>
        <input {...otherProps} />
        {
            label &&
            <div className='form-input-label'>
                {label}
            </div>
        }
    </div> */}
            <div>
                <button onClick={handleClick}>
                    Send Post
                </button>
            </div>
        </>);
};
exports.default = FormInput;
