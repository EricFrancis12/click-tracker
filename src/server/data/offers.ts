import type { TOffer } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchOffers(): Promise<TOffer[]> {
    const offersCollection = db.collection('offers');
    const dbResults = await offersCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch offers');
    }
    const offers = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return offers;
}

export async function fetchOfferBy_id(_id: string): Promise<TOffer | null> {
    const offers = await fetchOffers();
    return offers.find((offer: TOffer) => offer?._id === _id) ?? null;
}

export async function createNewAndSaveNewOffer(offer: TOffer) {
    const offersCollection = db.collection('offers');
    return await offersCollection.set(offer._id, offer);
}

export async function updateOffer(offer: TOffer) {
    const _offer = await fetchOfferBy_id(offer._id);
    if (!_offer) {
        throw new Error('Unable to update offer');
    }
    const offersCollection = db.collection('offers');
    return await offersCollection.set(offer._id, {
        name: offer.name,
        affiliateNetwork_id: offer.affiliateNetwork_id,
        url: offer.url,
        payout: offer.payout,
        tags: offer.tags
    });
}

export async function deleteOfferBy_id(_id: string) {
    const _offer = await fetchOfferBy_id(_id);
    if (!_offer) {
        throw new Error('Unable to delete offer');
    }
    const offersCollection = db.collection('offers');
    return await offersCollection.delete(_id);
}
