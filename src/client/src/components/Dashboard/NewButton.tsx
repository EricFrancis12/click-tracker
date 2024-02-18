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
                const itemName = primaryItemNames.includes(activeItem.name as TItemName_primary)
                    ? activeItem.name
                    : 'Campaigns';
                setActionMenu({
                    itemName: itemName as TItemName_primary
                });
            }}
        />
    )
}
