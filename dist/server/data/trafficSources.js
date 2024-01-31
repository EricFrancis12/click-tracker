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
exports.deleteTrafficSourceBy_id = exports.updateTrafficSource = exports.createNewAndSaveNewTrafficSource = exports.fetchTrafficSourceBy_id = exports.fetchTrafficSources = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchTrafficSources() {
    return __awaiter(this, void 0, void 0, function* () {
        const trafficSourcesCollection = db.collection('trafficSources');
        const dbResults = yield trafficSourcesCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch affiliate networks');
        }
        const trafficSources = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return trafficSources;
    });
}
exports.fetchTrafficSources = fetchTrafficSources;
function fetchTrafficSourceBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const trafficSources = yield fetchTrafficSources();
        return trafficSources.find((trafficSource) => (trafficSource === null || trafficSource === void 0 ? void 0 : trafficSource._id) === _id);
    });
}
exports.fetchTrafficSourceBy_id = fetchTrafficSourceBy_id;
function createNewAndSaveNewTrafficSource(trafficSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const trafficSourcesCollection = db.collection('trafficSources');
        return yield trafficSourcesCollection.set(trafficSource._id, trafficSource);
    });
}
exports.createNewAndSaveNewTrafficSource = createNewAndSaveNewTrafficSource;
function updateTrafficSource(trafficSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const _trafficSource = yield fetchTrafficSourceBy_id(trafficSource._id);
        if (!_trafficSource) {
            throw new Error('Unable to update affiliate network');
        }
        const trafficSourcesCollection = db.collection('trafficSources');
        return yield trafficSourcesCollection.set(trafficSource._id, trafficSource);
    });
}
exports.updateTrafficSource = updateTrafficSource;
function deleteTrafficSourceBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _trafficSource = yield fetchTrafficSourceBy_id(_id);
        if (!_trafficSource) {
            throw new Error('Unable to delete affiliate network');
        }
        const trafficSourcesCollection = db.collection('trafficSources');
        return yield trafficSourcesCollection.delete(_id);
    });
}
exports.deleteTrafficSourceBy_id = deleteTrafficSourceBy_id;
