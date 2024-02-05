import type { TLandingPage } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchLandingPages(): Promise<TLandingPage[]> {
    const landingPagesCollection = db.collection('landingPages');
    const dbResults = await landingPagesCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch landing pages');
    }
    const landingPages = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return landingPages;
}

export async function fetchLandingPageBy_id(_id: string): Promise<TLandingPage | null> {
    const landingPages = await fetchLandingPages();
    return landingPages.find((landingPage: TLandingPage) => landingPage?._id === _id) ?? null;
}

export async function createNewAndSaveNewLandingPage(landingPage: TLandingPage) {
    const landingPagesCollection = db.collection('landingPages');
    return await landingPagesCollection.set(landingPage._id, landingPage);
}

export async function updateLandingPage(landingPage: TLandingPage) {
    const _landingPage = await fetchLandingPageBy_id(landingPage._id);
    if (!_landingPage) {
        throw new Error('Unable to update landing page');
    }
    const landingPagesCollection = db.collection('landingPages');
    return await landingPagesCollection.set(landingPage._id, landingPage);
}

export async function deleteLandingPageBy_id(_id: string) {
    const _landingPage = await fetchLandingPageBy_id(_id);
    if (!_landingPage) {
        throw new Error('Unable to delete landing page');
    }
    const landingPagesCollection = db.collection('landingPages');
    return await landingPagesCollection.delete(_id);
}
