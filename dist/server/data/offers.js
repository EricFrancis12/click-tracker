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
exports.deleteOfferBy_id = exports.updateOffer = exports.createNewAndSaveNewOffer = exports.fetchOfferBy_id = exports.fetchOffers = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchOffers() {
    return __awaiter(this, void 0, void 0, function* () {
        const offersCollection = db.collection('offers');
        const dbResults = yield offersCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch offers');
        }
        const offers = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return offers;
    });
}
exports.fetchOffers = fetchOffers;
function fetchOfferBy_id(_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const offers = yield fetchOffers();
        return (_a = offers.find((offer) => (offer === null || offer === void 0 ? void 0 : offer._id) === _id)) !== null && _a !== void 0 ? _a : null;
    });
}
exports.fetchOfferBy_id = fetchOfferBy_id;
function createNewAndSaveNewOffer(offer) {
    return __awaiter(this, void 0, void 0, function* () {
        const offersCollection = db.collection('offers');
        return yield offersCollection.set(offer._id, offer);
    });
}
exports.createNewAndSaveNewOffer = createNewAndSaveNewOffer;
function updateOffer(offer) {
    return __awaiter(this, void 0, void 0, function* () {
        const _offer = yield fetchOfferBy_id(offer._id);
        if (!_offer) {
            throw new Error('Unable to update offer');
        }
        const offersCollection = db.collection('offers');
        yield offersCollection.delete(offer._id);
        return yield offersCollection.set(offer._id, offer);
    });
}
exports.updateOffer = updateOffer;
function deleteOfferBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _offer = yield fetchOfferBy_id(_id);
        if (!_offer) {
            throw new Error('Unable to delete offer');
        }
        const offersCollection = db.collection('offers');
        return yield offersCollection.delete(_id);
    });
}
exports.deleteOfferBy_id = deleteOfferBy_id;
