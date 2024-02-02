import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import useTagSuggestions from '../../../hooks/useTagSuggestions';
import { Input, Select } from '../../base-components';
import Checkbox from '../../Checkbox';
import TagsInput from '../../TagsInput';
import FlowBuilder from '../../FlowBuilder/FlowBuilder';
import UrlInput from '../../UrlInput';
import type { TFlow_built_in, TFlow_saved, TFlow_url, TMenuData } from '../../../lib/types';
import { geos } from '../../../lib/geos';
import { landingPageRotationOptions, offerRotationOptions } from '../../../lib/rotationOptions';
import { flowTypes } from '../../../lib/flowTypes';
import { defaultFlow, defaultFlow_saved, defaultFlow_built_in, defaultFlow_url } from '../../../lib/default-data';

export default function CampaignMenuLayout({ menuData, setMenuData }: {
    menuData: TMenuData,
    setMenuData: Function,
    loading?: boolean
}) {
    const { data } = useAuth();
    const tagSuggestions = useTagSuggestions('Campaigns');

    const flow = (menuData && 'flow' in menuData) ? menuData.flow : defaultFlow();
    const savedFlow = flow.type === 'saved' ? flow as TFlow_saved : defaultFlow_saved();
    const [builtInFlow, setBuiltInFlow] = useState<TFlow_built_in>(flow.type === 'built_in' ? flow as TFlow_built_in : defaultFlow_built_in());
    const [urlFlow, setUrlFlow] = useState<TFlow_url>(flow.type === 'url' ? flow as TFlow_url : defaultFlow_url());

    return (
        <>
            {menuData && 'trafficSource_id' in menuData &&
                <div className='flex flex-col md:flex-row justify-start items-start h-full w-full overflow-y-scroll'>
                    <div className='w-full md:w-[600px]'>
                        <div
                            className='flex justify-start items-center p-2'
                            style={{
                                borderBottom: 'solid 1px grey'
                            }}
                        >
                            Campaign Details
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                            <Input
                                name='Name'
                                defaultValue={menuData.name}
                                onChange={e => setMenuData({ ...menuData, name: e.target.value })}
                            />
                            <Select
                                name='Traffic Source'
                                defaultValue={menuData.trafficSource_id}
                                onChange={e => setMenuData({ ...menuData, trafficSource_id: e.target.value })}
                            >
                                <option value=''>
                                    None
                                </option>
                                {data.trafficSources?.map((trafficSource, index) => (
                                    <option key={index} value={trafficSource._id}>
                                        {trafficSource.name}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                name='Country'
                                defaultValue={menuData.geoName}
                                onChange={e => setMenuData({ ...menuData, geoName: e.target.value })}
                            >
                                {geos.map((geo, index) => (
                                    <option key={index} value={geo.name}>
                                        {geo.name}
                                    </option>
                                ))}
                            </Select>
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
                            Destination
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2 px-4 py-2 w-full'>
                            <Select
                                name='Landing Page Rotation'
                                defaultValue={menuData.landingPageRotation}
                                onChange={e => setMenuData({ ...menuData, landingPageRotation: e.target.value })}
                            >
                                {Object.values(landingPageRotationOptions).map((rotation, index) => (
                                    <option key={index} value={rotation}>
                                        {rotation}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                name='Offer Rotation'
                                defaultValue={menuData.offerRotation}
                                onChange={e => setMenuData({ ...menuData, offerRotation: e.target.value })}
                            >
                                {Object.values(offerRotationOptions).map((rotation, index) => (
                                    <option key={index} value={rotation}>
                                        {rotation}
                                    </option>
                                ))}
                            </Select>
                            <div className='flex justify-between items-start w-full'>
                                <div className='w-[50%]'>
                                    <span>
                                        Destination
                                    </span>
                                    {flowTypes.map((flowType, index) => (
                                        <div key={index}
                                            className='flex justify-start items-center w-full cursor-pointer'
                                            onClick={e => {
                                                if (flowType === 'built_in') {
                                                    setMenuData({ ...menuData, flow: builtInFlow });
                                                } else if (flowType === 'saved') {
                                                    setMenuData({ ...menuData, flow: savedFlow });
                                                } else if (flowType === 'url') {
                                                    setMenuData({ ...menuData, flow: urlFlow });
                                                }
                                            }}
                                        >
                                            <Checkbox checked={menuData.flow.type === flowType} />
                                            <span className='flex justify-start items-center h-full w-full ml-1'>
                                                {flowType}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className='w-[50%]'>
                                    {/* Starter code for when adding Reditect Mode functionality */}
                                    {/* {menuData.flow.type !== 'built_in' &&
                                        <>
                                            <span>
                                                Redirect Mode
                                            </span>
                                            ...
                                        </>
                                    } */}
                                </div>
                            </div>
                            {menuData.flow.type === 'saved' &&
                                <Select
                                    name='Flow'
                                    defaultValue={menuData.flow._id}
                                    onChange={e => setMenuData({ ...menuData, flow: { ...menuData.flow, _id: e.target.value } })}
                                >
                                    <option value=''>
                                        None
                                    </option>
                                    {data?.flows?.map((flow, index) => (
                                        <option key={index} value={flow._id}>
                                            {flow.name}
                                        </option>
                                    ))}
                                </Select>
                            }
                            {menuData.flow.type === 'built_in' &&
                                <FlowBuilder
                                    flow={builtInFlow}
                                    setFlow={setBuiltInFlow}
                                />
                            }
                            {menuData.flow.type === 'url' &&
                                <UrlInput
                                    text='Enter Destination URL'
                                    value={urlFlow.url}
                                    onChange={(newValue: string) => setUrlFlow({ ...urlFlow, url: newValue })}
                                />
                            }
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
