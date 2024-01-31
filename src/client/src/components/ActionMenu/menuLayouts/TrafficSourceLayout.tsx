import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input } from '../../baseComponents';
import UrlInput from '../../UrlInput';
import TagsInput from '../../TagsInput';
import TokensInput from '../../TokensInput';
import { TMenuData, TToken } from '../../../lib/types';

export default function TrafficSourceLayout({ menuData, setMenuData, loading }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const tagSuggestions = useTagSuggestions('Traffic Sources');

    function handleDefaultTokensInputChange(newDefaultTokens: TToken) {
        setMenuData({
            ...menuData,
            defaultTokens: newDefaultTokens
        });
    }

    function handleCustomTokensInputChange(newCustomTokens: TToken) {
        setMenuData({
            ...menuData,
            customTokens: newCustomTokens
        });
    }

    return (
        <>
            {menuData && 'postbackUrl' in menuData &&
                <div className='flex flex-col md:flex-row justify-start items-start h-full w-full overflow-y-scroll'>
                    <div className='w-full md:w-[600px]'>
                        <div
                            className='flex justify-start items-center p-2'
                            style={{ borderBottom: 'solid 1px grey' }}
                        >
                            Traffic Source Details
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                            <Input
                                name='Name'
                                defaultValue={menuData.name}
                                onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                            />
                            <UrlInput
                                text='Postback URL'
                                value={menuData.postbackUrl}
                                onChange={(newValue: string) => setMenuData({
                                    ...menuData,
                                    postbackUrl: newValue
                                })}
                            />
                            {menuData?.tags &&
                                <TagsInput
                                    tags={menuData.tags}
                                    tagSuggestions={tagSuggestions}
                                    setTags={(newTags: string[]) => setMenuData({
                                        ...menuData,
                                        tags: newTags
                                    })}
                                />
                            }
                        </div>
                    </div>
                    <div className='h-[-webkit-fill-available] w-[1px] bg-gray-300' />
                    <div className='h-full w-full'>
                        <div
                            className='flex justify-start items-center p-2'
                            style={{ borderBottom: 'solid 1px grey' }}
                        >
                            Parameters
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                            <TokensInput
                                defaultTokens={menuData.defaultTokens}
                                setDefaultTokens={handleDefaultTokensInputChange}
                                customTokens={menuData.customTokens}
                                setCustomTokens={handleCustomTokensInputChange}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
