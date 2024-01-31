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
exports.deleteFlowBy_id = exports.updateFlow = exports.createNewAndSaveNewFlow = exports.fetchFlowBy_id = exports.fetchFlows = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchFlows() {
    return __awaiter(this, void 0, void 0, function* () {
        const flowsCollection = db.collection('flows');
        const dbResults = yield flowsCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch flows');
        }
        const flows = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return flows;
    });
}
exports.fetchFlows = fetchFlows;
function fetchFlowBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const flows = yield fetchFlows();
        return flows.find((flow) => (flow === null || flow === void 0 ? void 0 : flow._id) === _id);
    });
}
exports.fetchFlowBy_id = fetchFlowBy_id;
function createNewAndSaveNewFlow(flow) {
    return __awaiter(this, void 0, void 0, function* () {
        const flowsCollection = db.collection('flows');
        return yield flowsCollection.set(flow._id, flow);
    });
}
exports.createNewAndSaveNewFlow = createNewAndSaveNewFlow;
function updateFlow(flow) {
    return __awaiter(this, void 0, void 0, function* () {
        const _flow = yield fetchFlowBy_id(flow._id);
        if (!_flow) {
            throw new Error('Unable to update flow');
        }
        const flowsCollection = db.collection('flows');
        return yield flowsCollection.set(flow._id, flow);
    });
}
exports.updateFlow = updateFlow;
function deleteFlowBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _flow = yield fetchFlowBy_id(_id);
        if (!_flow) {
            throw new Error('Unable to delete flow');
        }
        const flowsCollection = db.collection('flows');
        return yield flowsCollection.delete(_id);
    });
}
exports.deleteFlowBy_id = deleteFlowBy_id;
