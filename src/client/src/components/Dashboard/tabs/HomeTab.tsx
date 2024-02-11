import { useState, useEffect } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import Tab from './Tab';
import UpperControlPanel from '../UpperControlPanel/UpperControlPanel';
import LowerControlPanel from '../LowerControlPanel/LowerControlpanel';
import DataTable from '../DataTable/DataTable';
import type { TItem, TTimeframe, TMappedData } from '../../../lib/types';
import { itemsDictionary } from '../../../lib/items';
import { defaultTimeframe } from '../../../lib/default-data';
import { mapData } from '../../../utils/mapData';
import { mappedDataItemToDataItem } from '../../../utils/utils';

export default function HomeTab({
    active,
    onClick,
    onClose,
    addNewSpawnedTab
}: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
    addNewSpawnedTab?: Function
}) {
    const { data, clicks } = useAuth();

    const [activeItem, setActiveItem] = useState<TItem>(itemsDictionary.campaigns);
    const [timeframe, setTimeframe] = useState<TTimeframe>(defaultTimeframe());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mappedData, setMappedData] = useState<TMappedData>(
        mapData({ clicks, data, activeItem, timeframe, backfill: true })
    );

    const selectedMappedDataItems = mappedData.filter(dataItem => dataItem?.selected);

    useEffect(() => {
        if (clicks && data && timeframe) {
            setMappedData(mapData({ clicks, data, activeItem, timeframe, backfill: true }));
        }
    }, [activeItem.name, clicks, data, timeframe]);

    return (
        <div>
            <Tab
                icon={faHome}
                name='Home'
                active={active}
                onClick={onClick}
            />
            {active &&
                <div className='absolute top-[40px] left-0 width-[100vw] text-sm'>
                    <UpperControlPanel
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    />
                    <LowerControlPanel
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        mappedData={mappedData}
                        newReport={() => {
                            if (addNewSpawnedTab && selectedMappedDataItems.length === 1) {
                                addNewSpawnedTab({
                                    props: {
                                        reportDataItem: mappedDataItemToDataItem(selectedMappedDataItems[0], activeItem, data),
                                        activeItem,
                                        timeframe
                                    }
                                });
                            }
                        }}
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <DataTable
                        activeItem={activeItem}
                        searchQuery={searchQuery}
                        mappedData={mappedData}
                        setMappedData={setMappedData}
                        timeframe={timeframe}
                        addNewSpawnedTab={addNewSpawnedTab}
                    />
                </div>
            }
        </div>
    )
}
