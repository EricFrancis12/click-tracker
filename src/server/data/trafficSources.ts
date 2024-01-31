import type { TTrafficSource } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchTrafficSources() {
    const trafficSourcesCollection = db.collection('trafficSources');
    const dbResults = await trafficSourcesCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch affiliate networks');
    }
    const trafficSources = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return trafficSources;
}

export async function fetchTrafficSourceBy_id(_id: string) {
    const trafficSources = await fetchTrafficSources();
    return trafficSources.find((trafficSource: TTrafficSource) => trafficSource?._id === _id);
}

export async function createNewAndSaveNewTrafficSource(trafficSource: TTrafficSource) {
    const trafficSourcesCollection = db.collection('trafficSources');
    return await trafficSourcesCollection.set(trafficSource._id, trafficSource);
}

export async function updateTrafficSource(trafficSource: TTrafficSource) {
    const _trafficSource = await fetchTrafficSourceBy_id(trafficSource._id);
    if (!_trafficSource) {
        throw new Error('Unable to update affiliate network');
    }
    const trafficSourcesCollection = db.collection('trafficSources');
    return await trafficSourcesCollection.set(trafficSource._id, trafficSource);
}

export async function deleteTrafficSourceBy_id(_id: string) {
    const _trafficSource = await fetchTrafficSourceBy_id(_id);
    if (!_trafficSource) {
        throw new Error('Unable to delete affiliate network');
    }
    const trafficSourcesCollection = db.collection('trafficSources');
    return await trafficSourcesCollection.delete(_id);
}
