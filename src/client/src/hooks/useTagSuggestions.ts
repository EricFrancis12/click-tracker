import { useAuth } from '../contexts/AuthContext';
import type {
    TItemName_primary, TAffiliateNetwork, TCampaign, TFlow,
    TLandingPage, TOffer, TTrafficSource
} from '../lib/types';
import { removeDupesFromArray } from '../utils/utils';

export default function useTagSuggestions(primaryItemName: TItemName_primary) {
    const { data } = useAuth();

    let result: string[] = [];
    switch (primaryItemName) {
        case 'Affiliate Networks': {
            result = data.affiliateNetworks?.map((affiliateNetwork: TAffiliateNetwork) => (affiliateNetwork.tags ?? [])).flat() ?? [];
            break;
        }
        case 'Campaigns': {
            result = data.campaigns?.map((campaign: TCampaign) => (campaign.tags ?? [])).flat() ?? [];
            break;
        }
        case 'Flows': {
            result = data.flows?.map((flow: TFlow) => (flow.tags ?? [])).flat() ?? [];
            break;
        }
        case 'Landing Pages': {
            result = data.landingPages?.map((landingPage: TLandingPage) => (landingPage.tags ?? [])).flat() ?? [];
            break;
        }
        case 'Offers': {
            result = data.offers?.map((offer: TOffer) => (offer.tags ?? [])).flat() ?? [];
            break;
        }
        case 'Traffic Sources': {
            result = data.trafficSources?.map((trafficSource: TTrafficSource) => (trafficSource.tags ?? [])).flat() ?? [];
            break;
        }
    }
    return removeDupesFromArray(result);
}
