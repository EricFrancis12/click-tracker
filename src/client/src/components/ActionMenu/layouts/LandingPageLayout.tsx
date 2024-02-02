import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input } from '../../base-components';
import UrlInput from '../../UrlInput';
import TagsInput from '../../TagsInput';
import { TMenuData } from '../../../lib/types';

export default function LandingPageLayout({ menuData, setMenuData, loading }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const tagSuggestions = useTagSuggestions('Landing Pages');

    return (
        <>
            {menuData && 'url' in menuData &&
                <div className='h-full w-full'>
                    <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                        <Input
                            name='Name'
                            defaultValue={menuData.name}
                            onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                        />
                        <UrlInput
                            value={menuData.url as string}
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
