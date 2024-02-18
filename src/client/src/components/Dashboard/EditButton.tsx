import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useActionMenu } from '../../contexts/ActionMenuContext';
import Button from '../Button';
import { primaryItemNames } from '../../lib/primaryItemNames';
import type { TItem, TItemName_primary, TMappedData } from '../../lib/types';
import { mappedDataItemToDataItem } from '../../utils/utils';

export default function EditButton({ activeItem, mappedData }: {
    activeItem: TItem,
    mappedData: TMappedData
}) {
    const { data } = useAuth();
    const { setActionMenu } = useActionMenu();

    return (
        <Button
            text='Edit'
            icon={faPencil}
            disabled={mappedData.length !== 1 || !primaryItemNames.includes(activeItem.name as TItemName_primary)}
            onClick={e => {
                if (mappedData.length < 1 || !primaryItemNames.includes(activeItem.name as TItemName_primary)) {
                    return;
                }
                const dataItem = mappedDataItemToDataItem(mappedData[0], activeItem, data);
                if (!dataItem) {
                    return;
                }
                setActionMenu({
                    itemName: activeItem.name as TItemName_primary,
                    dataItem
                });
            }}
        />
    )
}
