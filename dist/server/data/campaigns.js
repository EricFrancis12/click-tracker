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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCampaignBy_id = exports.fetchCampaigns = void 0;
const placeholder_data_1 = require("./placeholder-data");
function fetchCampaigns() {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderCampaigns;
    });
}
exports.fetchCampaigns = fetchCampaigns;
function fetchCampaignBy_id(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return placeholder_data_1.placeholderCampaigns.find(campaign => campaign._id === _id);
    });
}
exports.fetchCampaignBy_id = fetchCampaignBy_id;
