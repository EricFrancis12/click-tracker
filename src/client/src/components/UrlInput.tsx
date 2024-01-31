import { useRef, useEffect } from 'react';
import { tokensList } from '../lib/tokensList';
import { traverseParentsForRef } from '../utils/utils';

export default function UrlInput({ text = 'URL', placeholder, value, defaultValue, onChange }: {
    text?: string,
    placeholder?: string,
    value: string,
    defaultValue?: string,
    onChange: Function
}) {
    const insertionPoint = useRef(value?.length ?? 0);
    const ref = useRef<HTMLDivElement>(null);

    const availableTokens = tokensList.map(token => ({
        ...token,
        active: value.includes(token.value)
    }));

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const target = e.target as HTMLTextAreaElement;
        onChange(target.value);
    }

    function handleSelect(e: React.MouseEvent<HTMLTextAreaElement>) {
        const target = e.target as HTMLTextAreaElement;
        insertionPoint.current = target.selectionEnd;
    }

    function handleTokenClick(tokenValue: string) {
        if (!onChange) return;
        if (value.includes(tokenValue)) return;

        const valueLeftOfInsertionPoint = value.substring(0, insertionPoint.current);
        const valueRightOfInsertionPoint = value.substring(insertionPoint.current, value.length);
        const newValue = `${valueLeftOfInsertionPoint}${tokenValue}${valueRightOfInsertionPoint}`;
        onChange(newValue);
    }

    useEffect(() => {
        document.addEventListener('click', handleGlobalClick);

        return () => document.removeEventListener('click', handleGlobalClick);

        function handleGlobalClick(e: MouseEvent) {
            if (traverseParentsForRef(e.target as HTMLElement, ref)) return;
            insertionPoint.current = value?.length ?? 0;
        }
    });

    return (
        <div ref={ref}
            className='flex flex-col justify-start items-start w-full'
        >
            <span>
                {text}
            </span>
            <div className='w-full'>
                <textarea
                    placeholder={placeholder ? placeholder : text}
                    className='w-full min-h-[150px] px-2 py-1 bg-white'
                    style={{
                        border: 'solid 1px grey',
                        borderRadius: '5px'
                    }}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    onSelect={handleSelect}
                />
            </div>
            <div className='flex flex-wrap justify-start items-center gap-2 h-full mt-2 text-sm'>
                <div className='italic'>
                    Available Tokens:
                </div>
                {availableTokens.map((token, index) => (
                    <div key={index}
                        className={(token.active ? 'bg-gray-300' : 'bg-green-500')
                            + ' flex justify-center items-center h-full px-2 cursor-pointer'}
                        style={{ borderRadius: '25px' }}
                        onClick={e => handleTokenClick(token.value)}
                    >
                        {token.value}
                    </div>
                ))}
            </div>
        </div>
    )
}
