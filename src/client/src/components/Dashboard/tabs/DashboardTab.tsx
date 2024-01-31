import { useState } from 'react';
import { faTachometerAltFast } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import useClicksDataPerTimeframe from '../../../hooks/useClicksDataPerTimeframe';
import Tab from './Tab';
import Spinner from '../../Spinner';
import CalendarButton from '../../CalendarButton';
import RefreshButton from '../../RefreshButton';
import { itemsDictionary } from '../../../lib/items';
import { mapData } from '../../../utils/mapData';
import { TTimeframe } from '../../../lib/types';

export default function DashboardTab({ active, onClick, onClose }: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
}) {
    const { data, clicks, fetchingData } = useAuth();

    const [timeframe, setTimeframe] = useState<TTimeframe>([new Date, new Date]);

    const { numVisits, numClicks, numConversions, revenue, cost } = useClicksDataPerTimeframe(clicks, timeframe);

    const headerCards = [
        {
            name: 'Visits',
            data: numVisits
        },
        {
            name: 'Clicks',
            data: numClicks
        },
        {
            name: 'Conversions',
            data: numConversions
        },
        {
            name: 'Revenue',
            data: revenue
        },
        {
            name: 'Cost',
            data: cost
        },
        {
            name: 'Profit',
            data: revenue - cost
        },
        {
            name: 'ROI',
            data: (((revenue - cost) / cost) || 0).toFixed(2) + '%'
        }
    ];

    // const bodyCards = [
    //     {
    //         name: 'Campaigns',
    //         data: mapClicks({
    //             clicks,
    //             data,
    //             activeItem: itemsDictionary.campaigns,
    //             timeframe
    //         })
    //     },
    //     {
    //         name: 'Traffic Sources',
    //         data: mapClicks({
    //             clicks,
    //             data,
    //             activeItem: itemsDictionary.trafficSources,
    //             timeframe
    //         })
    //     },
    //     {
    //         name: 'Countries',
    //         data: mapClicks({
    //             clicks,
    //             data,
    //             activeItem: itemsDictionary.countries,
    //             timeframe
    //         })
    //     },
    //     {
    //         name: 'Offers',
    //         data: mapClicks({
    //             clicks,
    //             data,
    //             activeItem: itemsDictionary.offers,
    //             timeframe
    //         })
    //     }
    // ];

    function calcProfit(dataItem: any) {
        if (!dataItem?.clicks) return 0;
        const sum = dataItem.clicks.reduce((acc: any, curr: any) => {
            return acc + (curr.revenue || 0) - (curr.cost || 0);
        }, 0);
        return `$${sum.toFixed(2)}`;
    }

    return (
        <div>
            <Tab
                icon={faTachometerAltFast}
                name='Dashboard'
                active={active}
                onClick={onClick}
                onClose={onClose}
            />
            {active &&
                <div className='absolute top-[40px] left-0 w-[100vw] text-sm'>
                    <div className='flex flex-col justify-start items-center gap-4 h-[100vh] w-full p-4 bg-[#ebedef]'>
                        <div className='flex flex-col justify-start items-center gap-4 w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex justify-start items-center'>
                                    <span className='text-lg'>
                                        Dashboard
                                    </span>
                                </div>
                                <div className='flex justify-end items-center gap-2'>
                                    <CalendarButton timeframe={timeframe} setTimeframe={setTimeframe} />
                                    <RefreshButton />
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-between items-center w-full'>
                                {headerCards.map((card, index) => (
                                    <div key={index}
                                        className='flex flex-row-reverse lg:flex-col justify-between lg:justify-center items-center gap-2 lg:h-[100px] w-full lg:w-[146px] px-2 bg-white'
                                        style={{ boxShadow: '1px 1px 1px 1px grey' }}
                                    >
                                        <span className='p-1'>
                                            {card.data}
                                        </span>
                                        <span className='p-1'>
                                            {card.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col justify-start items-center gap-4 w-full'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex justify-start items-center'>
                                    <span className='text-md'>
                                        Statistics
                                    </span>
                                </div>
                                <div className='flex justify-end items-center gap-2'>
                                    {/* buttons go here */}
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-around items-center gap-4 w-full'>
                                {/* {bodyCards.map((card, index) => (
                                <div key={index}
                                    className='flex flex-col justify-start items-start h-[100px] w-[100%] lg:w-[40%] bg-white'
                                    style={{ boxShadow: '1px 1px 1px 1px grey' }}
                                >
                                    <div className='flex justify-between items-center w-full px-[10px] py-1'
                                        style={{ borderBottom: 'solid grey 1px' }}
                                    >
                                        <span>
                                            {card.name}
                                        </span>
                                        <span>
                                            Profit
                                        </span>
                                    </div>
                                    {fetchingData || card.data?.length === 0
                                        ? <div className='flex justify-center items-center w-full'
                                            style={{ borderBottom: 'solid grey 1px' }}
                                        >
                                            <span className='italic my-1'>
                                                {fetchingData
                                                    ? <Spinner />
                                                    : 'No data to display'
                                                }
                                            </span>
                                        </div>
                                        : card.data.map((dataItem, _index) => {
                                            const profit = calcProfit(dataItem);
                                            const posProfit = typeof profit === 'number' && profit > 0;
                                            const negProfit = typeof profit === 'number' && profit < 0;
                                            return (
                                                <div className='flex justify-between items-center w-full'
                                                    style={{ borderBottom: 'solid grey 1px' }}
                                                >
                                                    <div className='flex justify-start items-center h-full'>
                                                        <div className={(posProfit ? 'bg-[#17a689]' : negProfit ? 'bg-red-300' : 'bg-gray-300')
                                                            + ' h-full w-[3px] mr-[10px]'} />
                                                        <span className='my-1'>
                                                            {dataItem.name}
                                                        </span>
                                                    </div>
                                                    <span className={posProfit ? 'text-[#17a689]' : negProfit ? 'text-red-300' : ''
                                                        + ' pr-[10px]'}>
                                                        {profit}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                </div>
                            ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
