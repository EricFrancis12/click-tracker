import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export function Modal({ children, maxWidth = '500px' }: {
    children: React.ReactNode,
    maxWidth?: string | number
}) {
    return (
        <div
            className='w-full text-black bg-white'
            style={{
                borderRadius: '5px',
                maxWidth
            }}
        >
            {children}
        </div>
    )
}

export function Header({ title, onClose }: {
    title: string,
    onClose: React.MouseEventHandler<HTMLSpanElement>
}) {
    return (
        <div
            className='flex justify-between items-center w-full p-4 px-6 bg-[#314a77]'
            style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
        >
            <div className='flex justify-center items-center'>
                <div className='flex justify-center items-center'>
                    {title}
                </div>
            </div>
            <div className='flex gap-4 justify-center items-center'>
                {/* Starter code for "Read Guide" button: */}
                {/* <div className='flex justify-center items-center'>
                    <span className='cursor-pointer'>
                        <span className='mr-[4px]'>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                        <span>
                            Read Guide
                        </span>
                    </span>
                </div> */}
                <div className='flex justify-center items-center'>
                    <span className='cursor-pointer' onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export function Footer({ onClose, onSave, disabled }: {
    onClose: React.MouseEventHandler<Element>,
    onSave?: React.MouseEventHandler<Element>,
    disabled?: boolean
}) {
    return (
        <div
            className='flex justify-end items-center w-full p-4 px-6'
            style={{ borderTop: 'solid 1px grey' }}
        >
            <span className='mr-[4px]'>
                <Button icon={faTimes} text='Cancel' onClick={onClose} />
            </span>
            {onSave &&
                <span>
                    <Button icon={faCheck} text='Save' disabled={disabled} onClick={onSave} />
                </span>
            }
        </div>
    )
}
