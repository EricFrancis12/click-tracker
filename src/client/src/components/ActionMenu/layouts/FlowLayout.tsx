import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input } from '../../base-components';
import FlowBuilder from '../../FlowBuilder/FlowBuilder';
import TagsInput from '../../TagsInput';
import { TFlow, TMenuData } from '../../../lib/types';

export default function FlowLayout({ menuData, setMenuData, loading }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const tagSuggestions = useTagSuggestions('Flows');

    return (
        <>
            {menuData &&
                <div className='h-full w-full'>
                    <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                        <Input
                            name='Flow Name'
                            defaultValue={menuData.name}
                            onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                        />
                        <FlowBuilder
                            flow={menuData as TFlow}
                            setFlow={setMenuData}
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
