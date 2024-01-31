import type { TItem } from './types';

export const itemsDictionary: { [key: string]: TItem } = {
    campaigns: {
        name: 'Campaigns',
        clickProp: 'campaign_id',
        dataProp: 'campaigns'
    },
    offers: {
        name: 'Offers',
        clickProp: 'offer_id',
        dataProp: 'offers'
    },
    landingPages: {
        name: 'Landing Pages',
        clickProp: 'landingPage_id',
        dataProp: 'landingPages'
    }
};

export const itemsArray: TItem[] = Object.values(itemsDictionary);
