import BlackTransparentOverlay from '../BlackTransparentOverlay';
import { Modal, Header } from '../menu-components';
import Button from '../Button';
import type { TActionMenu } from '../../contexts/ActionMenuContext';

export default function DuplicateMenu({ actionMenu, onClose }: {
    actionMenu: TActionMenu,
    onClose: Function
}) {
    console.log('Duplicate menu not yet implimented');

    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <Modal>
                <Header
                    title='Duplicate'
                    onClose={() => onClose()}
                />
                <div className='max-h-[90vh] w-full p-4 text-center'>
                    <h2 className='my-4'>
                        Duplicate is not yet implimented.
                    </h2>
                    <div className='flex justify-center items-center gap-2 w-full'>
                        <Button text='Okay' onClick={() => onClose()} />
                    </div>
                </div>
            </Modal>
        </BlackTransparentOverlay>
    )
}
