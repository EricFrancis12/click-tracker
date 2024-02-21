

export default function Dropdown({ children, ref, id, isHovered = true }: {
    children?: React.ReactNode,
    ref?: React.MutableRefObject<HTMLDivElement>,
    id?: string,
    isHovered?: boolean
}) {
    return (
        <div className='absolute w-auto bg-white rounded overflow-hidden'
            ref={ref}
            id={id}
            style={{
                display: isHovered ? 'block' : 'none',
                border: 'solid black 1px',
                zIndex: 999
            }}
        >
            {children}
        </div>
    )
}
