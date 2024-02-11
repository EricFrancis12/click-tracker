import { useState, useRef, useEffect } from 'react';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import Tab from './Tab';
import UpperControlPanel from '../UpperControlPanel/UpperControlPanel';
import LowerControlPanel from '../LowerControlPanel/LowerControlpanel';
import DataTable from '../DataTable/DataTable';
import type { TReportChain, TItem, TMappedData, TReportDataItem, TTimeframe } from '../../../lib/types';
import { itemsArray, itemsDictionary } from '../../../lib/items';
import { defaultTimeframe } from '../../../lib/default-data';
import { mapData } from '../../../utils/mapData';
import { getSingName } from '../../../utils/utils';

export default function ReportTab({
    active,
    onClick,
    onClose,
    reportDataItem,
    activeItem: originalActiveItem,
    timeframe: originalTimeframe
}: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
    reportDataItem?: TReportDataItem,
    activeItem?: TItem,
    timeframe?: TTimeframe
}) {
    const { clicks, data } = useAuth();

    const reportItem = useRef(itemsArray.find(item => item.name === originalActiveItem?.name));

    const [activeItem, setActiveItem] = useState<TItem>(
        (originalActiveItem?.name !== 'Campaigns' ? itemsDictionary.campaigns : itemsDictionary.offers)
    );
    const [timeframe, setTimeframe] = useState<TTimeframe>(originalTimeframe ?? defaultTimeframe());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [reportChain, setReportChain] = useState<TReportChain>([
        { name: activeItem.name },
        { name: null },
        null
    ]);

    // Filtering out clicks that don't belong in the report:
    const filteredClicks = clicks.filter(click => click[activeItem.clickProp as keyof typeof click] === reportDataItem?._id);
    const [mappedData, setMappedData] = useState<TMappedData>(
        mapData({ clicks: filteredClicks, data, activeItem, timeframe, backfill: false })
    );

    useEffect(() => {
        if (clicks && data && timeframe) {
            setMappedData(mapData({ clicks: filteredClicks, data, activeItem, timeframe, backfill: false }));
        }
    }, [clicks, data, timeframe, activeItem]);

    return (
        <div>
            <Tab
                icon={faFile}
                name={`${reportItem.current?.name ? getSingName(reportItem.current.name) : ''}: ${reportDataItem?.name ?? ''}`}
                active={active}
                onClick={onClick}
                onClose={onClose}
                toolTip={true}
            />
            {active &&
                <div className='absolute top-[40px] left-0 width-[100vw] text-sm'>
                    <UpperControlPanel
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        excludeItemNames={reportItem.current?.name ? [reportItem.current.name] : []}
                    />
                    <LowerControlPanel
                        reportChain={reportChain}
                        reportItem={reportItem.current}
                        setReportChain={setReportChain}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        mappedData={mappedData}
                        timeframe={timeframe}
                        setTimeframe={setTimeframe}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <DataTable
                        report={true}
                        activeItem={activeItem}
                        searchQuery={searchQuery}
                        mappedData={mappedData}
                        setMappedData={setMappedData}
                        timeframe={timeframe}
                        reportChain={reportChain}
                    />
                </div>
            }
        </div>
    )
}
