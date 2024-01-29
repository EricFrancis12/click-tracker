import { placeholderLandingPages } from './placeholder-data';

export async function fetchLandingPages() {
    return placeholderLandingPages;
}

export async function fetchLandingPageBy_id(_id: string) {
    return placeholderLandingPages.find(landingPage => landingPage._id === _id);
}
