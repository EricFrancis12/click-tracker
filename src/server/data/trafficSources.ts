import { placeholderTrafficSources } from './placeholder-data';

export async function fetchTrafficSources() {
    return placeholderTrafficSources;
}

export async function fetchTrafficSourceBy_id(_id: string) {
    return placeholderTrafficSources.find(trafficSource => trafficSource._id === _id);
}
