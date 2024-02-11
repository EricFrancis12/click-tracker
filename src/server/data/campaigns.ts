import type { TCampaign } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchCampaigns(): Promise<TCampaign[]> {
    const campaignsCollection = db.collection('campaigns');
    const dbResults = await campaignsCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch campaigns');
    }
    const campaigns = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return campaigns;
}

export async function fetchCampaignBy_id(_id: string): Promise<TCampaign | null> {
    const campaigns = await fetchCampaigns();
    return campaigns.find((campaign: TCampaign) => campaign?._id === _id) ?? null;
}

export async function createNewAndSaveNewCampaign(campaign: TCampaign) {
    const campaignsCollection = db.collection('campaigns');
    return await campaignsCollection.set(campaign._id, campaign);
}

export async function updateCampaign(campaign: TCampaign) {
    const _campaign = await fetchCampaignBy_id(campaign._id);
    if (!_campaign) {
        throw new Error('Unable to update campaign');
    }
    const campaignsCollection = db.collection('campaigns');
    // await campaignsCollection.delete(campaign._id);
    return await campaignsCollection.set(campaign._id, { name: '789' });
}

export async function deleteCampaignBy_id(_id: string) {
    const _campaign = await fetchCampaignBy_id(_id);
    if (!_campaign) {
        throw new Error('Unable to delete campaign');
    }
    const campaignsCollection = db.collection('campaigns');
    return await campaignsCollection.delete(_id);
}
