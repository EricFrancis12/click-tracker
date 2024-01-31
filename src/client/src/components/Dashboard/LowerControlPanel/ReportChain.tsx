import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import DropdownButton, { DropdownItem } from './DropdownButton';
import type { TItem, TReportChain, TReportChainItem } from '../../../lib/types';
import { itemsArray } from '../../../lib/items';
import { arrayOf } from '../../../utils/utils';
import { MAX_REPORT_CHAIN_LENGTH } from '../../../lib/constants';

export default function ReportChain({ reportChain, setReportChain, reportItem, activeItem, setActiveItem }: {
    reportChain: TReportChain,
    setReportChain: Function,
    reportItem: TItem,
    activeItem: TItem,
    setActiveItem: Function
}) {
    // const { fetchData } = useAuth();

    // const DEFAULT_DROPDOWNS_ACTIVE = reportChain.map(() => false);
    // const [dropdownsActive, setDropdownsActive] = useState(DEFAULT_DROPDOWNS_ACTIVE);

    // const dropdownItems = [
    //     ...itemsArray.filter(item => item.name !== activeItem?.name && item.name !== reportItem.name),
    //     // add more custom items here like Custom 1-10, time periods, referrers, etc.
    // ];

    // useEffect(() => handleClick(activeItem, 0), [activeItem]);

    // function handleClick(item: TReportChainItem, index: number) {
    //     if (index === 0) {
    //         setActiveItem(item);
    //         fetchData();
    //     }

    //     setDropdownsActive(DEFAULT_DROPDOWNS_ACTIVE);

    //     setReportChain(prevReportChain => {
    //         const newReportChain = [...prevReportChain];
    //         newReportChain.splice(index, MAX_REPORT_CHAIN_LENGTH, ...[
    //             { ...item, disabled: false },
    //             { name: null, disabled: item?.name ? false : true },
    //             ...arrayOf({ name: null, disabled: true }, MAX_REPORT_CHAIN_LENGTH)
    //         ]);

    //         while (newReportChain.length > MAX_REPORT_CHAIN_LENGTH) {
    //             newReportChain.pop();
    //         }

    //         return newReportChain;
    //     });
    // }

    // function handleSetActive(active: boolean, index: number) {
    //     setDropdownsActive(prevDropdownsActive => {
    //         const newDropdownsActive = [...prevDropdownsActive];
    //         newDropdownsActive.splice(index, 1, active);

    //         return newDropdownsActive;
    //     });
    // }

    return (
        <div className='flex flex-wrap justify-center items-center'>
            {/* {reportChain.map((chainLink, index) => (
                <div key={index} className='p-1'>
                    <DropdownButton
                        text={chainLink.disabled ? '' : ((index === 0 ? activeItem.name : chainLink.name) || 'None')}
                        disabled={chainLink.disabled}
                        active={dropdownsActive[index] !== false}
                        setActive={(active: boolean) => handleSetActive(active, index)}
                    >
                        {index !== 0 &&
                            <DropdownItem text={'None'}
                                onClick={e => handleClick({ ...chainLink, hidden: true }, index)}
                            />
                        }
                        {dropdownItems.map((dropdownItem, _index) => {
                            const isPrevChainLink = reportChain.find(chainLink => chainLink?.name === dropdownItem.name) !== undefined;
                            return !isPrevChainLink
                                ? (
                                    <DropdownItem key={_index} text={dropdownItem.name}
                                        onClick={e => handleClick(dropdownItem, index)}
                                    />
                                )
                                : ''
                        })}
                    </DropdownButton>
                </div>
            ))
            } */}
        </div >
    )
}
