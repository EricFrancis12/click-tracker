import { useState } from 'react';

export default function App() {
    const [endpoint, setEndpoint] = useState<string>('');
    const [method, setMethod] = useState<string>('');

    const placeholderAffiliateNetwork = {
        _id: 'PLACEHOLDER-AFFILIATE-NETWORK-0_AN',
        name: 'PLACEHOLDER-AFFILIATE-NETWORK-0',
        defaultNewOfferString: '123',
        tags: ['0', '1', '2', '3']
    };

    function handleButtonClick() {
        fetch(endpoint, {
            headers: method.toUpperCase() === 'GET' ? undefined : {
                'Content-Type': 'application/json'
            },
            method,
            body: method.toUpperCase() === 'GET' ? undefined : JSON.stringify(placeholderAffiliateNetwork)
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='flex justify-start items-center gap-2 p-2'>
                <div>
                    <h2>Endpoint</h2>
                    <input
                        value={endpoint}
                        onChange={e => setEndpoint(e.target.value)}
                    />
                </div>
                <div>
                    <h2>Method</h2>
                    <input
                        value={method}
                        onChange={e => setMethod(e.target.value)}
                    />
                </div>
                <button onClick={e => handleButtonClick()}>
                    Click
                </button>
            </div>
        </div>
    )
}
