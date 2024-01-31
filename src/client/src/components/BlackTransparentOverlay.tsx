

export default function BlackTransparentOverlay({ layer = 1, className = '', children }: {
    layer: number,
    className: string,
    children: React.ReactNode
}) {
    const zIndex = layer * 1000;

    return (
        <>
            <div className={'absolute opacity-60 bg-black'}
                style={{ top: 0, left: 0, height: '1000vh', width: '1000vw', pointerEvents: 'none', zIndex }}
            />
            <div className={'absolute ' + className}
                style={{ top: 0, left: 0, height: '100vh', width: '100vw', zIndex: zIndex + 10 }}
            >
                {children}
            </div>
        </>
    )
}
