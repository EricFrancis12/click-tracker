

export default function Dropdown({ children, ref, id, isHovered = true }: {
    children?: React.ReactNode,
    ref?: React.MutableRefObject<HTMLDivElement>,
    id?: string,
    isHovered?: boolean
}) {
    return (
        <div className='absolute w-auto bg-white'
            ref={ref}
            id={id}
            style={{
                display: isHovered ? 'block' : 'none',
                zIndex: 999
            }}
        >
            {children}
        </div>
    )
}
