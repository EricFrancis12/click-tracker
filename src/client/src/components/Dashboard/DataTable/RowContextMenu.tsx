import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useActionMenu } from '../../../contexts/ActionMenuContext';
import type {
    TCampaign, TItem, TItemName, TItemName_primary,
    TLandingPage, TMappedDataItem, TOffer, TTimeframe
} from '../../../lib/types';
import { primaryItemNames } from '../../../lib/primaryItemNames';
import { copyTextToClipboard, generateCampaignLinks, mappedDataItemToDataItem } from '../../../utils/utils';

type TMenuOption = {
    text: string,
    validItemNames?: TItemName[],
    disabled?: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>
};

export default function RowContextMenu({ row, activeItem, timeframe, addNewSpawnedTab, report }: {
    row: TMappedDataItem | null,
    activeItem: TItem,
    timeframe: TTimeframe
    addNewSpawnedTab?: Function,
    report?: boolean
}) {
    const { data } = useAuth();
    const { setActionMenu, setCampaignLinksMenu, setDuplicateMenu, setArchiveMenu } = useActionMenu();

    const getUrl = () => {
        const campaign = activeItem.name === 'Campaigns' ? row as TCampaign : null;
        const landingPage = activeItem.name === 'Landing Pages' ? row as TLandingPage : null;
        const offer = activeItem.name === 'Offers' ? row as TOffer : null;
        const trafficSource = campaign?.trafficSource_id
            ? data?.trafficSources?.find(_trafficSource => _trafficSource._id === campaign.trafficSource_id)
            : null;
        return campaign ? generateCampaignLinks({ campaign, trafficSource }).campaignUrl : landingPage?.url ?? offer?.url;
    };

    const menuOptions: TMenuOption[] = [
        {
            text: 'Report',
            disabled: !!report,
            onClick: () => {
                if (addNewSpawnedTab && row) {
                    addNewSpawnedTab({
                        props: {
                            reportItem: mappedDataItemToDataItem(row, activeItem, data),
                            activeItem,
                            timeframe
                        }
                    })
                }
            }
        },
        {
            text: 'Edit',
            validItemNames: primaryItemNames,
            onClick: () => {
                if (row) {
                    setActionMenu({
                        itemName: activeItem.name as TItemName_primary,
                        dataItem: mappedDataItemToDataItem(row, activeItem, data)
                    })
                }
            }
        },
        {
            text: 'Duplicate',
            validItemNames: primaryItemNames,
            onClick: () => {
                if (row) {
                    setDuplicateMenu({
                        itemName: activeItem.name as TItemName_primary,
                        dataItem: mappedDataItemToDataItem(row, activeItem, data)
                    })
                }
            }
        },
        {
            text: 'Archive',
            validItemNames: primaryItemNames,
            onClick: () => {
                if (row) {
                    setArchiveMenu({
                        itemName: activeItem.name as TItemName_primary,
                        dataItem: mappedDataItemToDataItem(row, activeItem, data)
                    })
                }
            }
        },
        {
            text: 'Copy URL',
            validItemNames: ['Campaigns', 'Landing Pages', 'Offers'],
            onClick: () => {
                const url = getUrl();
                if (url) {
                    copyTextToClipboard(url);
                }
            }
        },
        {
            text: 'Preview',
            validItemNames: ['Campaigns', 'Landing Pages', 'Offers'],
            onClick: () => {
                const url = getUrl();
                if (url) {
                    window.open(url, '_blank');
                }
            }
        },
        {
            text: 'Campaign Links',
            validItemNames: ['Campaigns'],
            onClick: () => {
                if (row) {
                    setCampaignLinksMenu(mappedDataItemToDataItem(row, activeItem, data) as TCampaign);
                }
            }
        }
    ];

    return (
        <div
            className='absolute bg-black text-white'
            style={{
                left: row?.x,
                top: row?.y,
                zIndex: 1000
            }}
        >
            {menuOptions.map((menuOption, index) => {
                return (menuOption?.validItemNames && !menuOption?.validItemNames?.includes(activeItem.name)) || menuOption?.disabled
                    ? <React.Fragment key={index} />
                    : <MenuOption key={index} menuOption={menuOption} />
            })}
        </div>
    )
}

const MenuOption = ({ menuOption }: {
    menuOption: TMenuOption
}) => (
    <div
        className='cursor-pointer'
        onClick={menuOption.onClick}
    >
        {menuOption.text}
    </div>
);
