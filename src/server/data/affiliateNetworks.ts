import type { TAffiliateNetwork, TAffiliateNetwork_id } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchAffiliateNetworks() {
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    const dbResults = await affiliateNetworksCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch affiliate networks');
    }
    const affiliateNetworks = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return affiliateNetworks;
}

export async function fetchAffiliateNetworkBy_id(_id: string) {
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    const dbResults = await affiliateNetworksCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch affiliate network');
    }
    const affiliateNetworks = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return affiliateNetworks.find((affiliateNetwork: TAffiliateNetwork) => affiliateNetwork?._id === _id);
}

export async function createNewAndSaveNewAffiliateNetwork(affiliateNetwork: TAffiliateNetwork) {
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    return await affiliateNetworksCollection.set(affiliateNetwork._id, affiliateNetwork);
}

export async function updateAffiliateNetwork(affiliateNetwork: TAffiliateNetwork) {
    const _affiliateNetwork = await fetchAffiliateNetworkBy_id(affiliateNetwork._id);
    if (!_affiliateNetwork) {
        throw new Error('Unable to update affiliate network');
    }
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    return await affiliateNetworksCollection.set(affiliateNetwork._id, affiliateNetwork);
}

export async function deleteAffiliateNetworkBy_id(_id: TAffiliateNetwork_id) {
    const _affiliateNetwork = await fetchAffiliateNetworkBy_id(_id);
    if (!_affiliateNetwork) {
        throw new Error('Unable to delete affiliate network');
    }
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    return await affiliateNetworksCollection.delete(_id);
}
