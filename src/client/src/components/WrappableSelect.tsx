import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function WrappableSelect({
    array = [],
    value,
    name = ((a: any) => a.name),
    matchBy = ((a: any) => a),
    onChange
}: {
    array: any[],
    value: any,
    name?: Function,
    matchBy?: any,
    onChange: Function
}) {
    const foundIndex = array.map(matchBy).indexOf(matchBy(value));

    const [activeIndex, setActiveIndex] = useState(foundIndex !== -1 ? foundIndex : 0);
    const [selectOpen, setSelectOpen] = useState(false);

    function handleSelectClick() {
        setSelectOpen(!selectOpen);
    }

    function handleOptionClick(index: number) {
        if (index === activeIndex) return;
        setActiveIndex(index);
        if (onChange) onChange(array[index]);
    }

    useEffect(() => {
        function handleGlobalClick() {
            if (handleGlobalClick.ignoreNext === true) {
                handleGlobalClick.ignoreNext = false;
                return;
            }
            setSelectOpen(false);
        }

        if (selectOpen === true) {
            handleGlobalClick.ignoreNext = true;
            document.addEventListener('click', handleGlobalClick);
        }

        return () => document.removeEventListener('click', handleGlobalClick);
    }, [selectOpen]);

    return (
        <div
            className='relative max-w-none md:max-w-[160px] p-1 cursor-pointer'
            style={{
                border: 'solid 1px grey',
                borderRadius: '6px'
            }}
            onClick={e => handleSelectClick()}
        >
            <div className='flex justify-between items-center gap-2'>
                <div
                    className='overflow-hidden text-ellipsis px-2'
                    style={{
                        whiteSpace: 'nowrap'
                    }}
                >
                    {name(value) != null ? name(value) : 'Select An Option'}
                </div>
                <span style={{ pointerEvents: 'none' }}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            {selectOpen &&
                <div
                    className='absolute bg-white'
                    style={{
                        top: '100%',
                        left: 0,
                        border: 'solid 1px grey',
                        borderRadius: '6px',
                        zIndex: 100
                    }}
                >
                    {array?.map((dataItem, index) => (
                        <div key={index}
                            className={(index === activeIndex ? 'bg-green-400' : 'hover:bg-green-200') + ' px-2 py-1'}
                            style={{ whiteSpace: 'nowrap' }}
                            onClick={e => handleOptionClick(index)}
                        >
                            {name(dataItem)}
                        </div>
                    ))}
                </div>
            }
        </div >
    )
}
