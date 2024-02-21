import { useState, useEffect } from 'react';
import useWindowResize from '../hooks/useWindowResize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TReportChain } from '../lib/types';

export const CHEVRON_TOGGLE_CLASS = 'CHEVRON_TOGGLE_CLASS';

export default function ChevronToggle({ callback, reportChain }: {
    callback: Function,
    reportChain?: TReportChain
}) {
    const [active, setActive] = useState(false);

    useEffect(() => setActive(false), [reportChain]);
    useWindowResize(() => setActive(false));

    return (
        <span className={CHEVRON_TOGGLE_CLASS + ' flex justify-center items-center w-full h-full cursor-pointer'}>
            <FontAwesomeIcon
                icon={active ? faChevronDown : faChevronRight}
                onClick={e => {
                    setActive(!active);
                    callback(!active);
                }}
            />
        </span>
    )
}
