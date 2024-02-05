import type { TAffiliateNetwork } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchAffiliateNetworks(): Promise<TAffiliateNetwork[]> {
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    const dbResults = await affiliateNetworksCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch affiliate networks');
    }
    const affiliateNetworks = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return affiliateNetworks;
}

export async function fetchAffiliateNetworkBy_id(_id: string): Promise<TAffiliateNetwork | null> {
    const affiliateNetworks = await fetchAffiliateNetworks();
    return affiliateNetworks.find((affiliateNetwork: TAffiliateNetwork) => affiliateNetwork?._id === _id) ?? null;
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

export async function deleteAffiliateNetworkBy_id(_id: string) {
    const _affiliateNetwork = await fetchAffiliateNetworkBy_id(_id);
    if (!_affiliateNetwork) {
        throw new Error('Unable to delete affiliate network');
    }
    const affiliateNetworksCollection = db.collection('affiliateNetworks');
    return await affiliateNetworksCollection.delete(_id);
}
