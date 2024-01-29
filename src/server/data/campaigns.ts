import { placeholderCampaigns } from './placeholder-data';

export async function fetchCampaigns() {
    return placeholderCampaigns;
}

export async function fetchCampaignBy_id(_id: string) {
    return placeholderCampaigns.find(campaign => campaign._id === _id);
}
