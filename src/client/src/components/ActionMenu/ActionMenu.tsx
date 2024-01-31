import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import Button from '../Button';
import ActionMenuLayout from './ActionMenuLayout';
import type { TActionMenu } from '../../contexts/ActionMenuContext';
import { getSingName, defaultItemFromItemName } from '../../utils/utils';
import { TMenuData } from '../../lib/types';

export default function ActionMenu({ actionMenu, setActionMenu }: {
    actionMenu: TActionMenu,
    setActionMenu: Function
}) {
    let title = '';
    let dataItem;
    let endpoint = ''
    if (actionMenu) {
        // If a .dataItem property was passed in, we know the user clicked the Edit button,
        // and the ActionMenu should be used to edit that item.
        // However, if .dataItem is undefined, we know they clicked the New button,
        // so the ActionMenu should create a new item.
        if (actionMenu?.dataItem) {
            title = `Edit ${getSingName(actionMenu.itemName)}`;
            dataItem = actionMenu.dataItem;
        } else {
            title = `Create ${getSingName(actionMenu.itemName)}`;
            dataItem = defaultItemFromItemName(actionMenu.itemName);
        }
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [menuData, setMenuData] = useState<TMenuData>(structuredClone(dataItem));

    return actionMenu &&
        <BlackTransparentOverlay layer={1} className='flex justify-center items-start p-4'>
            <div
                className='flex flex-col justify-between items-center h-full w-full text-black bg-white'
                style={{
                    borderRadius: '5px'
                }}
            >
                <Header
                    title={title}
                    onClose={() => setActionMenu(null)}
                />
                <ActionMenuLayout
                    itemName={actionMenu.itemName}
                    menuData={menuData}
                    setMenuData={setMenuData}
                    loading={loading}
                />
                <Footer
                    disabled={loading}
                    onClose={() => setActionMenu(null)}
                    onSave={() => console.log('Save not yet implimented')}
                />
            </div>
        </BlackTransparentOverlay>
}

const Header = ({ title, onClose }: {
    title: string,
    onClose: React.MouseEventHandler<HTMLSpanElement>
}) => (
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
            <div className='flex justify-center items-center'>
                <span className='cursor-pointer'>
                    <span className='mr-[4px]'>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </span>
                    <span>
                        Read Guide
                    </span>
                </span>
            </div>
            <div className='flex justify-center items-center'>
                <span className='cursor-pointer' onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </div>
        </div>
    </div>
);

const Footer = ({ onClose, onSave, disabled }: {
    onClose: React.MouseEventHandler<Element>,
    onSave: React.MouseEventHandler<Element>,
    disabled?: boolean
}) => (
    <div
        className='flex justify-end items-center w-full p-4 px-6'
        style={{ borderTop: 'solid 1px grey' }}
    >
        <span className='mr-[4px]'>
            <Button icon={faTimes} text='Cancel' onClick={onClose} />
        </span>
        <span>
            <Button icon={faCheck} text='Save' disabled={disabled} onClick={onSave} />
        </span>
    </div>
);
