import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Input } from './base-components';
import type { TToken } from '../lib/types';
import { MAX_NUM_CUSTOM_TOKENS } from '../lib/constants';

export default function TokensInput({ defaultTokens, setDefaultTokens, customTokens, setCustomTokens }: {
    defaultTokens: TToken[],
    setDefaultTokens: Function,
    customTokens: TToken[],
    setCustomTokens: Function
}) {
    function handleCreateNewToken() {
        if (customTokens.length >= MAX_NUM_CUSTOM_TOKENS) return;
        setCustomTokens([...customTokens, { queryParam: '', value: '', name: '' }]);
    }

    return (
        <div className='flex flex-col justify-center items-start w-full'>
            <div className='flex flex-col justify-start items-start w-full mb-4'>
                <div className='flex justify-between items-center p-1 w-full'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span></span>
                    </div>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span>Query param</span>
                    </div>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span>Token</span>
                    </div>
                </div>
                {defaultTokens.map((token, index) => (
                    <div key={index}
                        className='flex justify-between items-center gap-2 p-2 w-full'
                        style={{ borderTop: 'solid grey 1px' }}
                    >
                        <div className='flex justify-start items-center h-full w-full'>
                            <span>{token.name}</span>
                        </div>
                        <div className='flex justify-center items-center h-full w-full'>
                            <Input
                                name=''
                                placeholder='query parameter'
                                defaultValue={token.queryParam}
                                onChange={e => setDefaultTokens(defaultTokens.map((token, _index) => (
                                    _index !== index ? token : { ...token, queryParam: e.target.value }
                                )))}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full'>
                            <Input
                                name=''
                                placeholder='value'
                                defaultValue={token.value}
                                onChange={e => setDefaultTokens(defaultTokens.map((token, _index) => (
                                    _index !== index ? token : { ...token, value: e.target.value }
                                )))}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col justify-start items-start w-full'>
                <div className='flex justify-between items-center p-1 w-full'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span></span>
                    </div>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span>Query param</span>
                    </div>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span>Token</span>
                    </div>
                    <div className='flex justify-center items-center h-full w-full'>
                        <span>Name</span>
                    </div>
                    <div className='w-[50px]'>
                        <span></span>
                    </div>
                </div>
                {(!customTokens || customTokens?.length === 0) &&
                    <div
                        className='flex justify-center items-center w-full'
                        style={{ borderTop: 'solid grey 1px' }}
                    >
                        <span className='italic text-sm p-2'>
                            No custom tokens...
                        </span>
                    </div>
                }
                {customTokens.map((token, index) => (
                    <div key={index} className='flex justify-between items-center gap-2 p-2 w-full'
                        style={{ borderTop: 'solid grey 1px' }}
                    >
                        <div className='flex justify-start items-center h-full w-full'>
                            <span>{`Custom ${index + 1}`}</span>
                        </div>
                        <div className='flex justify-center items-center h-full w-full'>
                            <Input
                                name=''
                                placeholder='query parameter'
                                defaultValue={token.queryParam}
                                onChange={e => setCustomTokens(customTokens.map((token, _index) => (
                                    _index !== index ? token : { ...token, queryParam: e.target.value }
                                )))}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full'>
                            <Input
                                name=''
                                placeholder='value'
                                defaultValue={token.value}
                                onChange={e => setCustomTokens(customTokens.map((token, _index) => (
                                    _index !== index ? token : { ...token, value: e.target.value }
                                )))}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-full'>
                            <Input
                                name=''
                                placeholder='name'
                                defaultValue={token.name}
                                onChange={e => setCustomTokens(customTokens.map((token, _index) => (
                                    _index !== index ? token : { ...token, name: e.target.value }
                                )))}
                            />
                        </div>
                        <div className='flex justify-center items-center h-full w-[50px]'>
                            <span
                                className='cursor-pointer text-black hover:text-red-500'
                                onClick={e => setCustomTokens(customTokens.filter((token, _index) => _index !== index))}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </span>
                        </div>
                    </div>
                ))}
                <div
                    className='flex justify-center items-center mt-4 p-1 w-full hover:bg-gray-200 cursor-pointer'
                    style={{ border: 'solid black 1px', borderRadius: '6px', userSelect: 'none' }}
                    onClick={e => handleCreateNewToken()}
                >
                    <div className='flex justify-center items-center p-1 w-full'>
                        <span>+ Add Custom Token</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
