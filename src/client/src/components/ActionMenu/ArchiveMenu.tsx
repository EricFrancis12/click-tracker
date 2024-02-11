import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useKeypress from '../../hooks/useKeypress';
import useWindowResize from '../../hooks/useWindowResize';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import { Modal, Header } from '../menu-components';
import Button from '../Button';
import type { TActionMenu } from '../../contexts/ActionMenuContext';
import { makeEndpoint } from '../../utils/utils';
import { getSingName } from '../../utils/utils';

export default function ArchiveMenu({ actionMenu, onClose }: {
    actionMenu: TActionMenu,
    onClose: Function
}) {
    const { fetchData } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    function handleDelete() {
        const endpoint = makeEndpoint(actionMenu, 'DELETE');
        if (!endpoint) {
            return;
        }

        setLoading(true);
        fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(resJson => {
                // Getting an up-to-date "data" object when the fetch comes back with no errors, and also close this menu
                fetchData();
                onClose();
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false);
            });
    }

    useKeypress('escape', () => onClose());
    useWindowResize(() => onClose());

    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <Modal>
                <Header
                    title='Confirm Delete'
                    onClose={() => onClose()}
                />
                <div className='max-h-[90vh] w-full p-4 text-center'>
                    <h2 className='my-4'>
                        {`Are you sure you want to delete${actionMenu?.itemName ? ` ${getSingName(actionMenu.itemName)}:` : ':'} ${actionMenu?.dataItem?.name}?`}
                    </h2>
                    <div className='flex justify-center items-center gap-2 w-full'>
                        <Button text='Confirm' onClick={() => handleDelete()} disabled={loading} />
                        <Button text='Cancel' onClick={() => onClose()} disabled={loading} />
                    </div>
                </div>
            </Modal>
        </BlackTransparentOverlay>
    )
}
