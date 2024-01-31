import Spinner from './Spinner';

export function LoadingWrapper({ loading, children }: {
    loading: boolean,
    children?: React.ReactNode
}) {
    return (
        <div className={(loading ? 'relative' : '')
            + ' flex flex-col md:flex-row justify-start items-start overflow-y-scroll'}
            style={{
                height: 'inherit'
            }}
        >
            {loading &&
                <div className='absolute flex justify-center items-center h-full w-full'>
                    <Spinner />
                </div>
            }
            {children}
        </div>
    )
}