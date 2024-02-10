import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useActionMenu } from '../../../contexts/ActionMenuContext';
import DropdownButton, { DropdownItem } from './DropdownButton';
import { faFire, faCopy, faArchive, faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TCampaign, TItem, TItemName_primary, TMappedData } from '../../../lib/types';
import { mappedDataItemToDataItem } from '../../../utils/utils';

type TPopupMenuName = 'Duplicate' | 'Archive' | 'Copy URL' | 'Preview' | 'Get Links';
type TDropdownOption = {
    name: TPopupMenuName,
    icon: IconDefinition,
    active: boolean,
    onClick: React.MouseEventHandler<HTMLElement>
};

export default function ActionsDropdown({ mappedData, activeItem }: {
    mappedData: TMappedData,
    activeItem: TItem
}) {
    const { data } = useAuth();
    const { campaignLinksMenu, setCampaignLinksMenu, duplicateMenu, setDuplicateMenu, archiveMenu, setArchiveMenu } = useActionMenu();

    const [active, setActive] = useState<boolean>(false);

    const dropdownOptions: TDropdownOption[] = [
        {
            name: 'Duplicate',
            icon: faCopy,
            active: mappedData.length === 1,
            onClick: () => {
                if (mappedData?.length > 0) {
                    setDuplicateMenu({
                        itemName: activeItem.name as TItemName_primary,
                        dataItem: mappedDataItemToDataItem(mappedData[0], activeItem, data)
                    })
                }
            }
        },
        {
            name: 'Archive',
            icon: faArchive,
            active: true,
            onClick: () => {
                if (mappedData?.length > 0) {
                    setArchiveMenu({
                        itemName: activeItem.name as TItemName_primary,
                        dataItem: mappedDataItemToDataItem(mappedData[0], activeItem, data)
                    })
                }
            }
        },
        {
            name: 'Get Links',
            icon: faLink,
            active: activeItem.name === 'Campaigns',
            onClick: () => {
                if (mappedData?.length > 0) {
                    setCampaignLinksMenu(mappedData[0] as TCampaign);
                }
            }
        }
    ];

    useEffect(() => setActive(false), [campaignLinksMenu, duplicateMenu, archiveMenu]);

    return (
        <>
            <DropdownButton
                icon={faFire}
                disabled={mappedData.length === 0}
                active={active}
                setActive={setActive}
                text='Actions'
            >
                {dropdownOptions.map((option, index) => {
                    return option.active === true && mappedData.length > 0
                        ? (
                            <DropdownItem key={index} icon={option.icon} onClick={option.onClick}>
                                <span>{option.name}</span>
                            </DropdownItem>
                        )
                        : ''
                })}
            </DropdownButton>
        </>
    )
}
