import { useState } from 'react';
import DropdownButton, { DropdownItem } from './DropdownButton';
import {
    faFire, faCopy, faArchive, faClone,
    faExternalLinkSquareAlt, faLink, IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { TCampaign, TItem, TMappedData } from '../../../lib/types';
import CampaignLinksMenu from '../../CampaignLinksMenu';

type TPopupMenu = null | {
    name: TPopupMenuName,
    Component: typeof CampaignLinksMenu
}
type TPopupMenuName = 'Duplicate' | 'Archive' | 'Copy URL' | 'Preview' | 'Get Links';

type TDropdownOption = {
    name: TPopupMenuName,
    icon: IconDefinition,
    active: boolean,
    onClick: React.MouseEventHandler<HTMLElement>
}

export default function ActionsDropdown({ mappedData, activeItem }: {
    mappedData: TMappedData,
    activeItem: TItem
}) {
    const [active, setActive] = useState(false);
    const [popupMenu, setPopupMenu] = useState<TPopupMenu>(null);

    const dropdownOptions: TDropdownOption[] = [
        { name: 'Duplicate', icon: faCopy, active: mappedData.length === 1, onClick: () => console.log('Duplicate Item not yet implimented') },
        { name: 'Archive', icon: faArchive, active: true, onClick: () => console.log('Archive not yet implimented') },
        { name: 'Copy URL', icon: faClone, active: mappedData.length === 1, onClick: () => console.log('Copy Url not yet implimented') },
        { name: 'Preview', icon: faExternalLinkSquareAlt, active: mappedData.length === 1, onClick: () => console.log('Preview not yet implimented') },
        { name: 'Get Links', icon: faLink, active: activeItem.name === 'Campaigns', onClick: () => setPopupMenu({ name: 'Get Links', Component: CampaignLinksMenu }) }
    ];

    return (
        <>
            {popupMenu &&
                <popupMenu.Component
                    campaign={mappedData[0] as TCampaign}
                    onClose={() => setPopupMenu(null)}
                />
            }
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
