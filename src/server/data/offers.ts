import { placeholderOffers } from './placeholder-data';

export async function fetchOffers() {
    return placeholderOffers;
}

export async function fetchOfferBy_id(_id: string) {
    return placeholderOffers.find(offer => offer._id === _id);
}
