import {
    placeholderAffiliateNetworks, placeholderCampaigns, placeholderClicks, placeholderFlows,
    placeholderLandingPages, placeholderOffers, placeholderTrafficSources
} from './placeholder-data';

export async function fetchData() {
    return {
        affiliateNetworks: placeholderAffiliateNetworks,
        campaigns: placeholderCampaigns,
        flows: placeholderFlows,
        landingPages: placeholderLandingPages,
        offers: placeholderOffers,
        trafficSources: placeholderTrafficSources
    };
}
