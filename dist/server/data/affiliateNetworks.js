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
exports.deleteAffiliateNetworkBy_id = exports.updateAffiliateNetwork = exports.createNewAndSaveNewAffiliateNetwork = exports.fetchAffiliateNetworkBy_id = exports.fetchAffiliateNetworks = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchAffiliateNetworks() {
    return __awaiter(this, void 0, void 0, function* () {
        const affiliateNetworksCollection = db.collection('affiliateNetworks');
        const dbResults = yield affiliateNetworksCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch affiliate networks');
        }
        const affiliateNetworks = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return affiliateNetworks;
    });
}
exports.fetchAffiliateNetworks = fetchAffiliateNetworks;
function fetchAffiliateNetworkBy_id(_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const affiliateNetworks = yield fetchAffiliateNetworks();
        return (_a = affiliateNetworks.find((affiliateNetwork) => (affiliateNetwork === null || affiliateNetwork === void 0 ? void 0 : affiliateNetwork._id) === _id)) !== null && _a !== void 0 ? _a : null;
    });
}
exports.fetchAffiliateNetworkBy_id = fetchAffiliateNetworkBy_id;
function createNewAndSaveNewAffiliateNetwork(affiliateNetwork) {
    return __awaiter(this, void 0, void 0, function* () {
        const affiliateNetworksCollection = db.collection('affiliateNetworks');
        return yield affiliateNetworksCollection.set(affiliateNetwork._id, affiliateNetwork);
    });
}
exports.createNewAndSaveNewAffiliateNetwork = createNewAndSaveNewAffiliateNetwork;
function updateAffiliateNetwork(affiliateNetwork) {
    return __awaiter(this, void 0, void 0, function* () {
        const _affiliateNetwork = yield fetchAffiliateNetworkBy_id(affiliateNetwork._id);
        if (!_affiliateNetwork) {
            throw new Error('Unable to update affiliate network');
        }
        const affiliateNetworksCollection = db.collection('affiliateNetworks');
        return yield affiliateNetworksCollection.set(affiliateNetwork._id, affiliateNetwork);
    });
}
exports.updateAffiliateNetwork = updateAffiliateNetwork;
function deleteAffiliateNetworkBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _affiliateNetwork = yield fetchAffiliateNetworkBy_id(_id);
        if (!_affiliateNetwork) {
            throw new Error('Unable to delete affiliate network');
        }
        const affiliateNetworksCollection = db.collection('affiliateNetworks');
        return yield affiliateNetworksCollection.delete(_id);
    });
}
exports.deleteAffiliateNetworkBy_id = deleteAffiliateNetworkBy_id;
