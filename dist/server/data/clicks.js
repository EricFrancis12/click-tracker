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
exports.deleteClickBy_id = exports.updateClick = exports.createNewAndSaveNewClick = exports.fetchClickBy_id = exports.fetchClicks = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchClicks() {
    return __awaiter(this, void 0, void 0, function* () {
        const clicksCollection = db.collection('clicks');
        const dbResults = yield clicksCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch clicks');
        }
        const clicks = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return clicks;
    });
}
exports.fetchClicks = fetchClicks;
function fetchClickBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const clicks = yield fetchClicks();
        return clicks.find((click) => (click === null || click === void 0 ? void 0 : click._id) === _id);
    });
}
exports.fetchClickBy_id = fetchClickBy_id;
function createNewAndSaveNewClick(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.set(click._id, click);
    });
}
exports.createNewAndSaveNewClick = createNewAndSaveNewClick;
function updateClick(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const _click = yield fetchClickBy_id(click._id);
        if (!_click) {
            throw new Error('Unable to update click');
        }
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.set(click._id, click);
    });
}
exports.updateClick = updateClick;
function deleteClickBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _click = yield fetchClickBy_id(_id);
        if (!_click) {
            throw new Error('Unable to delete click');
        }
        const clicksCollection = db.collection('clicks');
        return yield clicksCollection.delete(_id);
    });
}
exports.deleteClickBy_id = deleteClickBy_id;
