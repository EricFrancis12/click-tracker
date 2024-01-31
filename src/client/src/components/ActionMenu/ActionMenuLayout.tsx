import { useState } from 'react';
import AffiliateNetworkLayout from './menuLayouts/AffiliateNetworkLayout';
import CampaignMenuLayout from './menuLayouts/CampaignMenuLayout';
import FlowLayout from './menuLayouts/FlowLayout';
import LandingPageLayout from './menuLayouts/LandingPageLayout';
import OfferLayout from './menuLayouts/OfferLayout';
import TrafficSourceLayout from './menuLayouts/TrafficSourceLayout';
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
