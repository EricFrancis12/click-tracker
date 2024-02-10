import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../Tooltip';
import { isOverflown } from '../../../utils/utils';

export default function Tab({ name, icon, active, onClick, onClose, toolTip }: {
    name: string,
    icon: IconDefinition,
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
    toolTip?: boolean
}) {
    const overflownRef = useRef<HTMLDivElement>(null);

    return (
        <div className='flex items-end h-full mr-[8px]'>
            <Tooltip
                text={name}
                disabled={!toolTip || !active || !isOverflown(overflownRef)}
            >
                <div ref={overflownRef}
                    onClick={onClick}
                    className={(active ? 'bg-[#ffffff] ' : 'bg-[#4b616d] hover:bg-[#00000070] ')
                        + (active ? ' text-[#394146] ' : ' text-white ')
                        + ' h-[32px] max-w-[245px] text-sm text-ellipsis overflow-hidden cursor-pointer'}
                    style={{
                        userSelect: 'none',
                        padding: '6px 8px 6px 8px',
                        borderRadius: '6px 6px 0 0',
                        whiteSpace: 'nowrap'
                    }}>
                    <FontAwesomeIcon icon={icon} className='mr-[8px]' />
                    <span className='mr-[8px]'>
                        {name}
                    </span>
                    {onClose &&
                        <FontAwesomeIcon icon={faClose} className='cursor-pointer' onClick={onClose} />
                    }
                </div>
            </Tooltip>
        </div>
    )
}
