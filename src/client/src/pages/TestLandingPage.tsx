

export default function TestLandingPage() {
    return (
        <div className='flex flex-col justify-start items-center gap-4 w-full mt-8'>
            <h1 className='text-lg font-bold'>
                Test Landing Page
            </h1>
            <a
                href='/clk'
                className='p-2 bg-green-400 hover:bg-green-300 rounded'
                style={{
                    border: 'solid black 1px'
                }}
            >
                Click Here
            </a>
        </div>
    )
}
