import { placeholderClicks } from './placeholder-data';

export async function fetchClicks() {
    return placeholderClicks;
}

export async function fetchClickBy_id(_id: string) {
    return placeholderClicks.find(click => click._id === _id);
}
