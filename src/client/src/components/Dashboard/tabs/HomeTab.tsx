import { useState } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import Tab from './Tab';
import UpperControlPanel from '../UpperControlPanel/UpperControlPanel';
import LowerControlPanel from '../LowerControlPanel/LowerControlpanel';
import DataTable from '../DataTable/DataTable';
import type { TItem, TTimeframe, TMappedData } from '../../../lib/types';
import { itemsDictionary } from '../../../lib/items';
import { mapData } from '../../../utils/mapData';

export default function HomeTab({ active, onClick, onClose }: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
}) {
    const { data, clicks } = useAuth();

    const [activeItem, setActiveItem] = useState<TItem>(itemsDictionary.campaigns);
    const [timeframe, setTimeframe] = useState<TTimeframe>([new Date(), new Date()]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [mappedData, setMappedData] = useState<TMappedData>(mapData({ clicks, data, activeItem, timeframe, backfill: true }));

    return (
        <div>
            <Tab
                icon={faHome}
                name='Home'
                active={active}
                onClick={onClick}
                onClose={onClose}
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
                        newReport={() => console.log('New Report not yet implimented')}
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    {activeItem.name === 'Conversions' || activeItem.name === 'Postbacks'
                        ? ''
                        : <DataTable
                            activeItem={activeItem}
                            searchQuery={searchQuery}
                            mappedData={mappedData}
                            setMappedData={setMappedData}
                            timeframe={timeframe}
                        />
                    }
                </div>
            }
        </div>
    )
}
