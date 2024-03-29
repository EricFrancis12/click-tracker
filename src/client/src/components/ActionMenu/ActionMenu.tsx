import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useKeypress from '../../hooks/useKeypress';
import useWindowResize from '../../hooks/useWindowResize';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import ActionMenuLayout from './ActionMenuLayout';
import { Header, Footer } from '../menu-components';
import type { THttpMethod, TMenuData } from '../../lib/types';
import type { TActionMenu } from '../../contexts/ActionMenuContext';
import { getSingName, defaultItemFromItemName, makeEndpoint } from '../../utils/utils';

export default function ActionMenu({ actionMenu, setActionMenu, maxWidth = '900px', layer = 1 }: {
    actionMenu: TActionMenu,
    setActionMenu: React.Dispatch<React.SetStateAction<TActionMenu>>,
    maxWidth?: string,
    layer?: number
}) {
    const { fetchData } = useAuth();

    let title = '';
    let dataItem;
    let method: THttpMethod = 'POST';
    if (actionMenu) {
        // If a .dataItem property was passed in, we know the user clicked the Edit button,
        // and the ActionMenu should be used to edit that item.
        // However, if .dataItem is undefined, we know they clicked the New button,
        // so the ActionMenu should create a new item.
        if (actionMenu?.dataItem) {
            title = `Edit ${getSingName(actionMenu.itemName)}`;
            dataItem = actionMenu.dataItem;
            method = 'PUT';
        } else {
            title = `Create ${getSingName(actionMenu.itemName)}`;
            dataItem = defaultItemFromItemName(actionMenu.itemName);
            method = 'POST';
        }
    }

    const endpoint = makeEndpoint(actionMenu, method);

    const [loading, setLoading] = useState<boolean>(false);
    const [menuData, setMenuData] = useState<TMenuData>(structuredClone(dataItem));

    function handleSave() {
        if (!endpoint || !method) {
            return;
        }

        setLoading(true);
        fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(menuData)
        })
            .then(() => {
                // Getting an up-to-date "data" object when the fetch comes back with no errors, and also close this menu
                fetchData();
                setActionMenu(null);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    }

    useKeypress('escape', () => setActionMenu(null));
    useWindowResize(() => setActionMenu(null));

    return actionMenu &&
        <BlackTransparentOverlay layer={layer} className='flex justify-center items-start p-4'>
            <div
                className='flex flex-col justify-between items-center h-full w-full max-h-[90vh] text-black bg-white'
                style={{
                    maxWidth,
                    borderRadius: '5px'
                }}
            >
                <Header
                    title={title}
                    onClose={() => setActionMenu(null)}
                />
                <ActionMenuLayout
                    itemName={actionMenu.itemName}
                    menuData={menuData}
                    setMenuData={setMenuData}
                    loading={loading}
                />
                <Footer
                    disabled={loading}
                    onClose={() => setActionMenu(null)}
                    onSave={() => handleSave()}
                />
            </div>
        </BlackTransparentOverlay>
}

