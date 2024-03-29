import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export default function Button({ children, disabled, icon, onClick, text = '', className = '' }: {
    children?: React.ReactNode,
    disabled?: boolean,
    icon?: IconDefinition,
    onClick: React.MouseEventHandler,
    text?: string,
    className?: string
}) {
    return (
        <div className={(className)} style={{ userSelect: 'none' }}>
            <div onClick={e => {
                if (!disabled) {
                    onClick(e);
                }
            }}
                className={(!disabled ? 'cursor-pointer hover:opacity-70 ' : 'opacity-40 ') + ' px-2 py-2'}
                style={{
                    border: 'solid lightgrey 1px',
                    borderRadius: '6px',
                    backgroundImage: 'linear-gradient(0deg,var(--color-gray5),var(--color-white))'
                }}
            >
                {icon &&
                    <FontAwesomeIcon icon={icon} className='mr-[4px]' />
                }
                <span className='mr-[4px]'>
                    {children}
                    {text}
                </span>
            </div >
        </div>
    )
}
