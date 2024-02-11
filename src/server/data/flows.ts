import type { TFlow } from '../../client/src/lib/types';
import CyclicDB from '@cyclic.sh/dynamodb';
const db = CyclicDB(process.env.CYCLIC_DB);

export async function fetchFlows(): Promise<TFlow[]> {
    const flowsCollection = db.collection('flows');
    const dbResults = await flowsCollection.filter();
    if (!dbResults) {
        throw new Error('Unable to fetch flows');
    }
    const flows = dbResults.results.map((result: { props?: unknown }) => result?.props);
    return flows;
}

export async function fetchFlowBy_id(_id: string): Promise<TFlow | null> {
    const flows = await fetchFlows();
    return flows.find((flow: TFlow) => flow?._id === _id) ?? null;
}

export async function createNewAndSaveNewFlow(flow: TFlow) {
    const flowsCollection = db.collection('flows');
    return await flowsCollection.set(flow._id, flow);
}

export async function updateFlow(flow: TFlow) {
    const _flow = await fetchFlowBy_id(flow._id);
    if (!_flow) {
        throw new Error('Unable to update flow');
    }
    const flowsCollection = db.collection('flows');
    await flowsCollection.delete(flow._id);
    return await flowsCollection.set(flow._id, flow);
}

export async function deleteFlowBy_id(_id: string) {
    const _flow = await fetchFlowBy_id(_id);
    if (!_flow) {
        throw new Error('Unable to delete flow');
    }
    const flowsCollection = db.collection('flows');
    return await flowsCollection.delete(_id);
}
