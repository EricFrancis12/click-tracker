import AffiliateNetworkLayout from './layouts/AffiliateNetworkLayout';
import CampaignMenuLayout from './layouts/CampaignMenuLayout';
import FlowLayout from './layouts/FlowLayout';
import LandingPageLayout from './layouts/LandingPageLayout';
import OfferLayout from './layouts/OfferLayout';
import TrafficSourceLayout from './layouts/TrafficSourceLayout';
import type { TItemName, TMenuData } from '../../lib/types';

export default function ActionMenuLayout({ itemName, menuData, setMenuData, loading }: {
    itemName: TItemName,
    menuData: TMenuData,
    setMenuData: Function,
    loading: boolean
}) {
    let MenuLayout = ({ menuData, setMenuData, loading }: {
        menuData: TMenuData,
        setMenuData: Function,
        loading: boolean
    }) => (<></>);
    switch (itemName) {
        case 'Affiliate Networks': MenuLayout = AffiliateNetworkLayout; break;
        case 'Campaigns': MenuLayout = CampaignMenuLayout; break;
        case 'Flows': MenuLayout = FlowLayout; break;
        case 'Landing Pages': MenuLayout = LandingPageLayout; break;
        case 'Offers': MenuLayout = OfferLayout; break;
        case 'Traffic Sources': MenuLayout = TrafficSourceLayout; break;
    }

    return (
        <MenuLayout
            menuData={menuData}
            setMenuData={setMenuData}
            loading={loading}
        />
    )
}
