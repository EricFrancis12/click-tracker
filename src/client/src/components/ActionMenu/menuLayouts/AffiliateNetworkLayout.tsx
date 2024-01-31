import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input } from '../../baseComponents';
import TagsInput from '../../TagsInput';
import { TMenuData } from '../../../lib/types';

export default function AffiliateNetworkLayout({ menuData, setMenuData, loading }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const tagSuggestions = useTagSuggestions('Affiliate Networks');

    return (
        <>
            {menuData &&
                <div className='h-full w-full'>
                    <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                        <Input
                            name='Name'
                            defaultValue={menuData.name}
                            onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                        />
                        <Input
                            name='Default New Offer String'
                            defaultValue={menuData.name}
                            onChange={e => setMenuData({ ...menuData, defaultNewOfferString: e.target.value })}
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
            }
        </>
    )
}
