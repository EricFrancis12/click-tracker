import { useState } from 'react';

export default function Checkbox({ checked: _checked, onValueChange }: {
    checked: boolean,
    onValueChange?: Function
}) {
    const [checked, setChecked] = useState(_checked ?? false);

    return (
        <span className='flex justify-center items-center w-full h-full cursor-pointer'>
            <input onChange={e => {
                setChecked(!checked);
                if (onValueChange) onValueChange(!checked);
            }}
                type='checkbox'
                checked={_checked ?? checked}
                data-checked={_checked ?? checked}
            />
        </span>
    )
}
