import React, { useState, useContext } from 'react';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import {
    TItemName_primary, TAffiliateNetwork, TCampaign, TFlow,
    TLandingPage, TOffer, TTrafficSource
} from '../lib/types';

export type TActionMenu = null | {
    itemName: TItemName_primary,
    dataItem?: TAffiliateNetwork | TCampaign | TFlow | TLandingPage | TOffer | TTrafficSource
};
export type TActionMenuContext = {
    actionMenu: TActionMenu,
    setActionMenu: React.Dispatch<React.SetStateAction<TActionMenu>>
};

const ActionMenuContext = React.createContext<TActionMenuContext | null>(null);

export function useActionMenu() {
    const context = useContext(ActionMenuContext);
    if (!context) {
        throw new Error('useActionMenu must be used within a ActionMenuContext provider')
    }
    return context;
}

export function ActionMenuProvider({ children }: {
    children: React.ReactNode
}) {
    const [actionMenu, setActionMenu] = useState<TActionMenu>(null);

    const value = {
        actionMenu,
        setActionMenu
    };

    return (
        <ActionMenuContext.Provider value={value}>
            {actionMenu &&
                <ActionMenu actionMenu={actionMenu} setActionMenu={setActionMenu} />
            }
            {children}
        </ActionMenuContext.Provider>
    )
}
