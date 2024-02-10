import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import DropdownButton, { DropdownItem } from './DropdownButton';
import type { TItem, TReportChain, TReportChainItem, TReportItem } from '../../../lib/types';
import { itemsArray } from '../../../lib/items';
import { arrayOf } from '../../../utils/utils';
import { MAX_REPORT_CHAIN_LENGTH } from '../../../lib/constants';

export default function ReportChain({ reportChain, setReportChain, reportItem, activeItem, setActiveItem }: {
    reportChain: TReportChain,
    setReportChain: Function,
    reportItem: TReportItem,
    activeItem: TItem,
    setActiveItem: React.Dispatch<React.SetStateAction<TItem>>
}) {
    const { fetchData } = useAuth();

    const arrayOfFalse = reportChain.map(() => false);
    const [dropdownsActive, setDropdownsActive] = useState(arrayOfFalse);

    const dropdownItems = [
        ...itemsArray.filter(item => item.name !== activeItem?.name && item.name !== reportItem.name),
        // Could add more custom items here like Custom 1-10, time periods, referrers, etc.
    ];

    useEffect(() => handleClick(activeItem as TReportChainItem, 0), [activeItem]);

    function handleClick(reportChainItem: TReportChainItem | null, index: number) {
        if (!reportChainItem) return;

        if (index === 0) {
            const newActiveItem = itemsArray.find(item => item.name === reportChainItem?.name);
            if (newActiveItem) {
                setActiveItem(newActiveItem);
                fetchData();
            }
        }

        setDropdownsActive(arrayOfFalse);

        setReportChain((prevReportChain: TReportChain) => {
            const newReportChain = [...prevReportChain];
            newReportChain.splice(
                index,
                MAX_REPORT_CHAIN_LENGTH,
                { ...reportChainItem },
                { name: null },
                ...arrayOf(null, MAX_REPORT_CHAIN_LENGTH)
            );

            while (newReportChain.length > MAX_REPORT_CHAIN_LENGTH) {
                newReportChain.pop();
            }
            return newReportChain;
        });
    }

    function handleSetActive(active: boolean, index: number) {
        setDropdownsActive(prevDropdownsActive => {
            const newDropdownsActive = [...prevDropdownsActive];
            newDropdownsActive.splice(index, 1, active);

            return newDropdownsActive;
        });
    }

    return (
        <div className='flex flex-wrap justify-center items-center'>
            {reportChain.map((chainLink, index) => (
                <div key={index} className='p-1'>
                    <DropdownButton
                        text={!chainLink?.name ? '' : ((index === 0 ? activeItem.name : chainLink?.name) || 'None')}
                        disabled={!chainLink}
                        active={dropdownsActive[index] !== false}
                        setActive={(active: boolean) => handleSetActive(active, index)}
                    >
                        {index !== 0 &&
                            <DropdownItem text={'None'}
                                onClick={e => handleClick({ name: null }, index)}
                            />
                        }
                        {dropdownItems.map((dropdownItem, _index) => {
                            const isPrevChainLink = reportChain.find(chainLink => chainLink?.name === dropdownItem.name) != undefined;
                            return !isPrevChainLink
                                ? (
                                    <DropdownItem key={_index}
                                        text={dropdownItem.name}
                                        onClick={e => handleClick(dropdownItem, index)}
                                    />
                                )
                                : '';
                        })}
                    </DropdownButton>
                </div>
            ))
            }
        </div >
    )
}
