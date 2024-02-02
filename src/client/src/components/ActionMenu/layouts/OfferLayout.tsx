import { useAuth } from '../../../contexts/AuthContext';
import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input, Select } from '../../base-components';
import UrlInput from '../../UrlInput';
import TagsInput from '../../TagsInput';
import { TMenuData } from '../../../lib/types';

export default function OfferLayout({ menuData, setMenuData, loading }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const { data } = useAuth();
    const tagSuggestions = useTagSuggestions('Offers');

    return (
        <>
            {menuData && 'affiliateNetwork_id' in menuData &&
                <div className='h-full w-full'>
                    <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                        <Input
                            name='Name'
                            defaultValue={menuData.name}
                            onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                        />
                        <Select
                            name='Affiliate Network'
                            defaultValue={menuData.affiliateNetwork_id}
                            onChange={e => setMenuData({ ...menuData, affiliateNetwork_id: e.target.value })}
                        >
                            <option value=''>
                                None
                            </option>
                            {data?.affiliateNetworks?.map((affiliateNetwork, index) => (
                                <option key={index} value={affiliateNetwork._id}>
                                    {affiliateNetwork.name}
                                </option>
                            ))}
                        </Select>
                        <UrlInput
                            value={menuData.url}
                            onChange={(newValue: string) => setMenuData({
                                ...menuData,
                                url: newValue
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
            }
        </>
    )
}
