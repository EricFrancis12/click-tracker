import React, { useState, useContext } from 'react';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import CampaignLinksMenu from '../components/ActionMenu/CampaignLinksMenu';
import DuplicateMenu from '../components/ActionMenu/DuplicateMenu';
import ArchiveMenu from '../components/ActionMenu/ArchiveMenu';
import {
    TItemName_primary, TAffiliateNetwork, TCampaign, TFlow,
    TLandingPage, TOffer, TTrafficSource
} from '../lib/types';

export type TActionMenu = null | {
    itemName: TItemName_primary,
    dataItem?: TAffiliateNetwork | TCampaign | TFlow | TLandingPage | TOffer | TTrafficSource
};
export type TCampaignLinksMenu = null | TCampaign;
export type TActionMenuContext = {
    actionMenu: TActionMenu,
    setActionMenu: React.Dispatch<React.SetStateAction<TActionMenu>>,
    actionMenu_2: TActionMenu,
    setActionMenu_2: React.Dispatch<React.SetStateAction<TActionMenu>>,
    campaignLinksMenu: TCampaignLinksMenu,
    setCampaignLinksMenu: React.Dispatch<React.SetStateAction<TCampaignLinksMenu>>,
    duplicateMenu: TActionMenu,
    setDuplicateMenu: React.Dispatch<React.SetStateAction<TActionMenu>>,
    archiveMenu: TActionMenu,
    setArchiveMenu: React.Dispatch<React.SetStateAction<TActionMenu>>
};

const ActionMenuContext = React.createContext<TActionMenuContext | null>(null);

export function useActionMenu() {
    const context = useContext(ActionMenuContext);
    if (!context) {
        throw new Error('useActionMenu must be used within a ActionMenuContext provider');
    }
    return context;
}

export function ActionMenuProvider({ children }: {
    children: React.ReactNode
}) {
    const [actionMenu, setActionMenu] = useState<TActionMenu>(null);
    const [actionMenu_2, setActionMenu_2] = useState<TActionMenu>(null);
    const [campaignLinksMenu, setCampaignLinksMenu] = useState<TCampaignLinksMenu>(null);
    const [duplicateMenu, setDuplicateMenu] = useState<TActionMenu>(null);
    const [archiveMenu, setArchiveMenu] = useState<TActionMenu>(null);

    const value = {
        actionMenu,
        setActionMenu,
        actionMenu_2,
        setActionMenu_2,
        campaignLinksMenu,
        setCampaignLinksMenu,
        duplicateMenu,
        setDuplicateMenu,
        archiveMenu,
        setArchiveMenu
    };

    return (
        <ActionMenuContext.Provider value={value}>
            {actionMenu &&
                <ActionMenu actionMenu={actionMenu} setActionMenu={setActionMenu} />
            }
            {actionMenu_2 &&
                <ActionMenu actionMenu={actionMenu_2} setActionMenu={setActionMenu_2} layer={2} maxWidth='750px' />
            }
            {campaignLinksMenu &&
                <CampaignLinksMenu campaign={campaignLinksMenu} onClose={() => setCampaignLinksMenu(null)} />
            }
            {duplicateMenu &&
                <DuplicateMenu actionMenu={duplicateMenu} onClose={() => setDuplicateMenu(null)} />
            }
            {archiveMenu &&
                <ArchiveMenu actionMenu={archiveMenu} onClose={() => setArchiveMenu(null)} />
            }
            {children}
        </ActionMenuContext.Provider>
    )
}
