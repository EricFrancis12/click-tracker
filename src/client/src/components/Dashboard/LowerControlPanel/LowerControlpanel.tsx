import ReportChain from './ReportChain';
import CalendarButton from '../../CalendarButton';
import SearchBar from './SearchBar';
import ReportButton from './ReportButton';
import NewButton from '../NewButton';
import EditButton from '../EditButton';
import ActionsDropdown from './ActionsDropdown';
import RefreshButton from './RefreshButton';
import type { TItem, TTimeframe, TMappedData, TReportChain, TReportItem } from '../../../lib/types';

export default function LowerControlPanel({
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
    reportItem?: TReportItem,
    drilldown?: Function
}) {
    const selectedMappedData = mappedData.filter(item => item?.selected);

    return (
        <div
            className='flex flex-col justify-center align-start gap-6 w-full px-8 py-6 bg-[#ebedef]'
            style={{ borderTop: 'solid lightgrey 3px' }}
        >
            <Row>
                <CalendarButton timeframe={timeframe} setTimeframe={setTimeframe} />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <RefreshButton />
            </Row>
            <Row>
                {reportChain && setReportChain && reportItem &&
                    <ReportChain
                        reportChain={reportChain}
                        setReportChain={setReportChain}
                        reportItem={reportItem}
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                    />
                }
                {(!reportChain && !setReportChain && !reportItem) &&
                    <>
                        {newReport &&
                            <ReportButton newReport={newReport} mappedData={selectedMappedData} />
                        }
                        <NewButton activeItem={activeItem} />
                        <EditButton activeItem={activeItem} mappedData={selectedMappedData} />
                        <ActionsDropdown activeItem={activeItem} mappedData={selectedMappedData} />
                    </>
                }
            </Row>
        </div>
    )
}

const Row = ({ children }: {
    children: React.ReactNode
}) => (
    <div className='flex gap-6 w-full'>
        <div className='flex flex-wrap gap-2 justify-center items-center'>
            {children}
        </div>
    </div>
);
