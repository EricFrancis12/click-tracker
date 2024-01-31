import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';

export default function Tab({ name, icon, active, onClick, onClose }: {
    name: string,
    icon: IconDefinition,
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
}) {
    return (
        <div className='flex items-end h-full mr-[8px]'>
            <div onClick={onClick}
                className={(active ? 'bg-[#ffffff] ' : 'bg-[#4b616d] hover:bg-[#00000070] ')
                    + (active ? ' text-[#394146] ' : ' text-white ')
                    + ' h-[32px] max-w-[245px] text-sm cursor-pointer'}
                style={{
                    userSelect: 'none',
                    padding: '6px 8px 6px 8px',
                    borderRadius: '6px 6px 0 0',
                }}>
                <FontAwesomeIcon icon={icon} className='mr-[8px]' />
                <span className='mr-[8px]'>
                    {name}
                </span>
                {onClose &&
                    <FontAwesomeIcon icon={faClose} className='cursor-pointer' onClick={onClose} />
                }
            </div>
        </div>
    )
}
