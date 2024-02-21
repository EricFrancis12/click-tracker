import React, { useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Dropdown from '../../Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { traverseParentsForId } from '../../../utils/utils';

export default function DropdownButton({ children, disabled, active, setActive,
    icon, text, onClick, className, id: _id }: {
        children: React.ReactNode,
        disabled?: boolean,
        active: boolean,
        setActive: Function,
        icon?: IconDefinition,
        text: string,
        onClick?: Function,
        className?: string,
        id?: string
    }) {
    const id = useRef(_id || nanoid());

    useEffect(() => {
        if (!active) return;

        if (onClick) {
            onClick(false);
        } else if (setActive) {
            setActive(false);
        }
    }, [disabled]);

    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);

        function handleGlobalClick(e: MouseEvent) {
            if (setActive && !traverseParentsForId(e.target as HTMLElement, id.current)) setActive(false);
        }
    }, []);

    return (
        <div id={id.current}
            className={' relative whitespace-nowrap ' + (className || ' ') + (!disabled ? 'cursor-pointer ' : ' ')}
        >
            <div
                className={(!disabled ? 'hover:opacity-70 ' : 'opacity-40 ') + 'flex justify-between px-2 py-2'}
                style={{
                    minWidth: '100px',
                    border: 'solid lightgrey 1px',
                    borderRadius: '6px',
                    backgroundImage: 'linear-gradient(0deg,var(--color-gray5),var(--color-white))'
                }}
                onClick={!disabled ? (onClick ?? setActive ? (e => setActive(!active)) : undefined) : undefined}
            >
                <span>
                    {icon &&
                        <FontAwesomeIcon icon={icon} className='mr-[4px]' />
                    }
                    <span className='mr-[4px]'>
                        {text ?? ''}
                    </span>
                </span>
                <span>
                    <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} />
                </span>
            </div>
            {(active && !disabled) &&
                <Dropdown>
                    {children}
                </Dropdown>
            }
        </div>
    )
}

export function DropdownItem({ children, text, icon, onClick }: {
    children?: React.ReactNode,
    text?: string,
    icon?: IconDefinition,
    onClick: React.MouseEventHandler
}) {
    return (
        <div
            className='p-1 hover:bg-blue-300'
            style={{ outline: 'solid grey 1px' }}
            onClick={onClick}
        >
            {icon &&
                <FontAwesomeIcon icon={icon} className='mr-[4px]' />
            }
            {children || text}
        </div>
    )
}
