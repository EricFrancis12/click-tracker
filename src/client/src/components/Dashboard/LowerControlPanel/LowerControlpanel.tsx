import ReportChain from './ReportChain';
import CalendarButton from '../../CalendarButton';
import SearchBar from './SearchBar';
import ReportButton from './ReportButton';
import NewButton from '../NewButton';
import EditButton from '../EditButton';
import ActionsDropdown from './ActionsDropdown';
import RefreshButton from './RefreshButton';
import type { TItem, TTimeframe, TMappedData, TReportChain } from '../../../lib/types';

export default function LowerControlPanel({
    limited,
    mappedData,
    activeItem,
    setActiveItem,
    newReport,
    timeframe,
    setTimeframe,
    searchQuery,
    setSearchQuery,
    reportChain,
    setReportChain,
    reportItem
}: {
    limited?: boolean,
    mappedData: TMappedData,
    activeItem: TItem,
    setActiveItem: React.Dispatch<React.SetStateAction<TItem>>,
    newReport?: Function,
    timeframe: TTimeframe,
    setTimeframe: React.Dispatch<React.SetStateAction<TTimeframe>>,
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    reportChain?: TReportChain,
    setReportChain?: React.Dispatch<React.SetStateAction<TReportChain>>,
    reportItem?: TItem,
    drilldown?: Function
}) {
    const selectedMappedData = mappedData.filter(item => item?.selected);

    return (
        <div
            className='flex flex-col justify-center align-start w-full bg-[#ebedef]'
            style={{ borderTop: 'solid lightgrey 3px' }}
        >
            {reportChain && setReportChain && reportItem &&
                <div className='flex gap-6 mx-8 my-4 w-full'>
                    <div className='flex flex-wrap gap-2 justify-center items-center'>
                        <ReportChain
                            reportChain={reportChain}
                            setReportChain={setReportChain}
                            reportItem={reportItem}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                    </div>
                </div>
            }
            <div className='flex gap-6 mx-8 my-4 w-full'>
                <div className='flex flex-wrap gap-2 justify-center items-center'>
                    <CalendarButton timeframe={timeframe} setTimeframe={setTimeframe} />
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    {!limited &&
                        <>
                            {newReport &&
                                <ReportButton newReport={newReport} mappedData={selectedMappedData} />
                            }
                            <NewButton activeItem={activeItem} />
                            <EditButton activeItem={activeItem} mappedData={selectedMappedData} />
                            <ActionsDropdown activeItem={activeItem} mappedData={selectedMappedData} />
                        </>
                    }
                </div>
            </div>
            <div className='flex gap-6 mx-8 my-4 w-full'>
                <div className='flex flex-wrap gap-2 justify-center items-center'>
                    <RefreshButton />
                </div>
            </div>
        </div>
    )
}
