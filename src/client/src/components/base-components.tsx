

export function Wrapper({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col justify-start items-start w-full'>
            {children}
        </div>
    )
}

export function Input({ name = '', placeholder = '', defaultValue, onChange }: {
    name: string,
    placeholder?: string,
    defaultValue: string | number | readonly string[] | undefined,
    onChange: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <Wrapper>
            <span>
                {name}
            </span>
            <input
                type='text'
                placeholder={placeholder}
                className='w-full px-2 py-1'
                style={{
                    border: 'solid 1px grey',
                    borderRadius: '6px'
                }}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </Wrapper>
    )
}

export function Select({ name = '', defaultValue, onChange, children }: {
    name: string,
    defaultValue?: string | number | readonly string[] | undefined,
    onChange: React.ChangeEventHandler<HTMLSelectElement>,
    children: React.ReactNode
}) {
    return (
        <Wrapper>
            <span>
                {name}
            </span>
            <select
                className='w-full px-2 py-1'
                style={{
                    border: 'solid 1px grey',
                    borderRadius: '6px'
                }}
                onChange={onChange}
                defaultValue={defaultValue}
            >
                {children}
            </select>
        </Wrapper>
    )
}

export function AddNewButton({ name = '', onClick }: {
    name: string,
    onClick: React.MouseEventHandler<HTMLDivElement>
}) {
    return (
        <div
            className='flex justify-center items-center w-full p-2 cursor-pointer'
            style={{
                border: 'solid 1px grey',
                borderRadius: '5px'
            }}
            onClick={onClick}
        >
            <span>
                {'+ Add New ' + name}
            </span>
        </div>
    )
}
