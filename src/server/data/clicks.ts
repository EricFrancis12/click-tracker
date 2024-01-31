import type { TClick } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchClicks() {
    const clicksCollection = db.collection('clicks');
    const dbResults = await clicksCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch clicks');
    }
    const clicks = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return clicks;
}

export async function fetchClickBy_id(_id: string) {
    const clicks = await fetchClicks();
    return clicks.find((click: TClick) => click?._id === _id);
}

export async function createNewAndSaveNewClick(click: TClick) {
    const clicksCollection = db.collection('clicks');
    return await clicksCollection.set(click._id, click);
}

export async function updateClick(click: TClick) {
    const _click = await fetchClickBy_id(click._id);
    if (!_click) {
        throw new Error('Unable to update click');
    }
    const clicksCollection = db.collection('clicks');
    return await clicksCollection.set(click._id, click);
}

export async function deleteClickBy_id(_id: string) {
    const _click = await fetchClickBy_id(_id);
    if (!_click) {
        throw new Error('Unable to delete click');
    }
    const clicksCollection = db.collection('clicks');
    return await clicksCollection.delete(_id);
}
