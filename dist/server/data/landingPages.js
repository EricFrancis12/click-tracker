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
exports.deleteLandingPageBy_id = exports.updateLandingPage = exports.createNewAndSaveNewLandingPage = exports.fetchLandingPageBy_id = exports.fetchLandingPages = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchLandingPages() {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPagesCollection = db.collection('landingPages');
        const dbResults = yield landingPagesCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch landing pages');
        }
        const landingPages = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return landingPages;
    });
}
exports.fetchLandingPages = fetchLandingPages;
function fetchLandingPageBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPages = yield fetchLandingPages();
        return landingPages.find((landingPage) => (landingPage === null || landingPage === void 0 ? void 0 : landingPage._id) === _id);
    });
}
exports.fetchLandingPageBy_id = fetchLandingPageBy_id;
function createNewAndSaveNewLandingPage(landingPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const landingPagesCollection = db.collection('landingPages');
        return yield landingPagesCollection.set(landingPage._id, landingPage);
    });
}
exports.createNewAndSaveNewLandingPage = createNewAndSaveNewLandingPage;
function updateLandingPage(landingPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const _landingPage = yield fetchLandingPageBy_id(landingPage._id);
        if (!_landingPage) {
            throw new Error('Unable to update landing page');
        }
        const landingPagesCollection = db.collection('landingPages');
        return yield landingPagesCollection.set(landingPage._id, landingPage);
    });
}
exports.updateLandingPage = updateLandingPage;
function deleteLandingPageBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _landingPage = yield fetchLandingPageBy_id(_id);
        if (!_landingPage) {
            throw new Error('Unable to delete landing page');
        }
        const landingPagesCollection = db.collection('landingPages');
        return yield landingPagesCollection.delete(_id);
    });
}
exports.deleteLandingPageBy_id = deleteLandingPageBy_id;
