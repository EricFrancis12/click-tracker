import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useActionMenu } from '../../contexts/ActionMenuContext';
import Button from '../Button';
import { primaryItemNames } from '../../lib/primaryItemNames';
import type { TItem, TItemName_primary } from '../../lib/types';

export default function NewButton({ activeItem }: {
    activeItem: TItem
}) {
    const { setActionMenu } = useActionMenu();

    return (
        <Button
            text='New'
            icon={faPlus}
            onClick={e => {
                if (!primaryItemNames.includes(activeItem.name as TItemName_primary)) {
                    throw new Error('New item must be a primary item.');
                }
                setActionMenu({
                    itemName: activeItem.name as TItemName_primary
                });
            }}
        />
    )
}
