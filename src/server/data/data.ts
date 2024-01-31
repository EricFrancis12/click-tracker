import { fetchAffiliateNetworks } from './affiliateNetworks';
import { fetchCampaigns } from './campaigns';
import { fetchFlows } from './flows';
import { fetchLandingPages } from './landingPages';
import { fetchOffers } from './offers';
import { fetchTrafficSources } from './trafficSources';

export async function fetchData() {
    const affiliateNetworks = fetchAffiliateNetworks();
    const campaigns = fetchCampaigns();
    const flows = fetchFlows();
    const landingPages = fetchLandingPages();
    const offers = fetchOffers();
    const trafficSources = fetchTrafficSources();

    await Promise.all([affiliateNetworks, campaigns, flows, landingPages, offers, trafficSources]);

    return {
        affiliateNetworks,
        campaigns,
        flows,
        landingPages,
        offers,
        trafficSources
    };
}
