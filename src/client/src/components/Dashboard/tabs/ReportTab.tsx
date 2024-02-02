import { useState, useEffect } from 'react';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import Tab from './Tab';
import UpperControlPanel from '../UpperControlPanel/UpperControlPanel';
import LowerControlPanel from '../LowerControlPanel/LowerControlpanel';
import DataTable from '../DataTable/DataTable';
import type { TItem, TMappedData, TReportItem, TTimeframe } from '../../../lib/types';
import { itemsDictionary } from '../../../lib/items';
import { defaultTimeframe } from '../../../lib/default-data';
import { mapData } from '../../../utils/mapData';
import { getSingName } from '../../../utils/utils';

export default function ReportTab({
    active,
    onClick,
    onClose,
    reportItem,
    activeItem: originalActiveItem,
    timeframe: originalTimeframe
}: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
    reportItem?: TReportItem,
    activeItem?: TItem,
    timeframe?: TTimeframe
}) {
    const { clicks, data } = useAuth();

    const [activeItem, setActiveItem] = useState<TItem>(originalActiveItem ?? itemsDictionary.campaigns);
    const [timeframe, setTimeframe] = useState<TTimeframe>(originalTimeframe ?? defaultTimeframe);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filtering out clicks that don't belong in the report:
    const filteredClicks = clicks.filter(click => click[activeItem.clickProp as keyof typeof click] === reportItem?._id);
    const [mappedData, setMappedData] = useState<TMappedData>(
        mapData({ clicks: filteredClicks, data, activeItem, timeframe, backfill: false })
    );

    useEffect(() => {
        if (clicks && data && timeframe) {
            setMappedData(mapData({ clicks: filteredClicks, data, activeItem, timeframe, backfill: false }));
        }
    }, [clicks, data, timeframe, activeItem, filteredClicks]);

    return (
        <div>
            <Tab
                icon={faFile}
                name={`${getSingName(activeItem.name)}: ${reportItem?.name ?? ''}`}
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
                        limited={true}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        mappedData={mappedData}
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    {(activeItem.name === 'Conversions' || activeItem.name === 'Postbacks') &&
                        <DataTable
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
