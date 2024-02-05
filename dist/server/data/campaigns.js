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
exports.deleteCampaignBy_id = exports.updateCampaign = exports.createNewAndSaveNewCampaign = exports.fetchCampaignBy_id = exports.fetchCampaigns = void 0;
const dynamodb_1 = __importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)(process.env.CYCLIC_DB);
function fetchCampaigns() {
    return __awaiter(this, void 0, void 0, function* () {
        const campaignsCollection = db.collection('campaigns');
        const dbResults = yield campaignsCollection.filter();
        if (!dbResults) {
            throw new Error('Unable to fetch campaigns');
        }
        const campaigns = dbResults.results.map((result) => result === null || result === void 0 ? void 0 : result.props);
        return campaigns;
    });
}
exports.fetchCampaigns = fetchCampaigns;
function fetchCampaignBy_id(_id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const campaigns = yield fetchCampaigns();
        return (_a = campaigns.find((campaign) => (campaign === null || campaign === void 0 ? void 0 : campaign._id) === _id)) !== null && _a !== void 0 ? _a : null;
    });
}
exports.fetchCampaignBy_id = fetchCampaignBy_id;
function createNewAndSaveNewCampaign(campaign) {
    return __awaiter(this, void 0, void 0, function* () {
        const campaignsCollection = db.collection('campaigns');
        return yield campaignsCollection.set(campaign._id, campaign);
    });
}
exports.createNewAndSaveNewCampaign = createNewAndSaveNewCampaign;
function updateCampaign(campaign) {
    return __awaiter(this, void 0, void 0, function* () {
        const _campaign = yield fetchCampaignBy_id(campaign._id);
        if (!_campaign) {
            throw new Error('Unable to update campaign');
        }
        const campaignsCollection = db.collection('campaigns');
        return yield campaignsCollection.set(campaign._id, campaign);
    });
}
exports.updateCampaign = updateCampaign;
function deleteCampaignBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const _campaign = yield fetchCampaignBy_id(_id);
        if (!_campaign) {
            throw new Error('Unable to delete campaign');
        }
        const campaignsCollection = db.collection('campaigns');
        return yield campaignsCollection.delete(_id);
    });
}
exports.deleteCampaignBy_id = deleteCampaignBy_id;
