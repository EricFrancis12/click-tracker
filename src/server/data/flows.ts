import { placeholderFlows } from './placeholder-data';

export async function fetchFlows() {
    return placeholderFlows;
}

export async function fetchFlowBy_id(_id: string) {
    return placeholderFlows.find(flow => flow._id === _id);
}
