"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewClick_id = void 0;
function generateNewClick_id() {
    return `${crypto.randomUUID()}_CL`;
}
exports.generateNewClick_id = generateNewClick_id;
