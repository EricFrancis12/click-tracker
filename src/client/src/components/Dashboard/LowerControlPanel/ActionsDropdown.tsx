import { useState } from 'react';
import DropdownButton, { DropdownItem } from './DropdownButton';
import { faFire, faCopy, faArchive, faClone, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { TMappedData } from '../../../lib/types';

export default function ActionsDropdown({ mappedData }: {
    mappedData: TMappedData
}) {
    const [active, setActive] = useState(false);

    const dropdownOptions = [
        { name: 'Duplicate', icon: faCopy, active: mappedData.length === 1, onClick: () => console.log('Duplicate Item not yet implimented') },
        { name: 'Archive', icon: faArchive, active: true, onClick: () => console.log('Archive not yet implimented') },
        { name: 'Copy URL', icon: faClone, active: mappedData.length === 1, onClick: () => console.log('Copy Url not yet implimented') },
        { name: 'Preview', icon: faExternalLinkSquareAlt, active: mappedData.length === 1, onClick: () => console.log('Preview not yet implimented') }
    ];

    return (
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
    )
}
