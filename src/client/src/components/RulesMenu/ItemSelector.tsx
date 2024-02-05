import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function ItemSelector({
    currItems,
    setItems,
    itemsList = [],
    maxItems = 100,
    defaultText = 'Select an item'
}: {
    currItems: string[],
    setItems: Function,
    itemsList: string[],
    maxItems?: number,
    defaultText?: string
}) {
    // Filtering out items that are already in currItems, and
    // prepending an empty string to front of array for the 'Select an item' option.
    const filteredItems = ['', ...itemsList.filter(item => !currItems.includes(item))];

    const selectElement = useRef<HTMLSelectElement>(null);
    const inputElement = useRef<HTMLInputElement>(null);

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!inputElement.current?.value) return;

        const newItem = inputElement.current.value;
        if (!currItems.includes(newItem) && currItems.length < maxItems) {
            setItems([...structuredClone(currItems), newItem]);
        }

        inputElement.current.value = '';
    }

    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (!selectElement.current?.value) {
            // Returning early to account for when value is the inserted empty string
            return;
        }

        if (e.target.value && currItems.length < maxItems) {
            const newItem = e.target.value;
            setItems([...structuredClone(currItems), newItem]);
        }
        selectElement.current.value = filteredItems.at(0) ?? '';
    }

    function deleteItem(item: string) {
        const newItems = currItems.filter(_item => _item !== item);
        setItems(newItems);
    }

    return (
        <div className='flex justify-start items-start gap-2 w-full'>
            <div>
                <select ref={selectElement}
                    onChange={e => handleSelectChange(e)}
                >
                    {filteredItems.map((item, index) => (
                        <option key={index} value={index === 0 ? '' : item}>
                            {index === 0 ? defaultText : item}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex flex-wrap justify-start items-center gap-2'>
                {currItems.map((item, index) => (
                    <div key={index}
                        className='flex justify-center items-center gap-1 px-1'
                        style={{ border: 'solid 1px grey', borderRadius: '25px' }}
                    >
                        <span
                            className='flex justify-center items-center px-1'
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {item === '' ? 'Empty Value' : item}
                        </span>
                        {item &&
                            <span onClick={e => deleteItem(item)}
                                className='flex justify-center items-center rounded-full p-1 cursor-pointer hover:bg-gray-500'
                                style={{
                                    height: '16px',
                                    width: '16px',
                                    border: 'solid darkgrey 2px'
                                }}
                            >
                                <FontAwesomeIcon icon={faX} fontSize='8px' />
                            </span>
                        }
                    </div>
                ))}
                <div>
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <input ref={inputElement} className='px-1' />
                    </form>
                </div>
            </div>
        </div >
    )
}
