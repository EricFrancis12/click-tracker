import BlackTransparentOverlay from '../BlackTransparentOverlay';
import type { TActionMenu } from '../../contexts/ActionMenuContext';

export default function ArchiveMenu({ actionMenu, onClose }: {
    actionMenu: TActionMenu,
    onClose: Function
}) {
    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <div className='bg-white'>
                ArchiveMenu
            </div>
        </BlackTransparentOverlay>
    )
}
