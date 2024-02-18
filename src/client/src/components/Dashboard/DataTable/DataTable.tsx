import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import useWindowResize from '../../../hooks/useWindowResize';
import useColumnDragger from '../../../hooks/useColumnDragger';
import useRowHover from '../../../hooks/useRowHover';
import Checkbox from '../../Checkbox';
import ChevronToggle from '../../ChevronToggle';
import Spinner from '../../Spinner';
// import DrilldownButton from '../LowerControlPanel/DrilldownButton';
import RowContextMenu from './RowContextMenu';
import { indicators } from './indicators';
import type { TItem, TItemName, TMappedData, TMappedDataItem, TReportChain, TTimeframe } from '../../../lib/types';
import { mapData } from '../../../utils/mapData';
import { replaceNonsense, stringIncludes, isEven } from '../../../utils/utils';
import { itemsArray } from '../../../lib/items';

type TSortType = 'normal' | 'reversed';
type TSortedColumn = {
    index: number,
    type: TSortType
};
type TColumn = {
    name: string | JSX.Element | Function,
    selector: Function
};

export default function DataTable({ activeItem, searchQuery, mappedData, setMappedData, timeframe, reportChain, addNewSpawnedTab, report }: {
    activeItem: TItem,
    searchQuery: string,
    mappedData: TMappedData,
    setMappedData: React.Dispatch<React.SetStateAction<TMappedData>>,
    timeframe: TTimeframe
    reportChain?: TReportChain,
    addNewSpawnedTab?: Function,
    report?: boolean
}) {
    const { clicks, data, fetchingData } = useAuth();

    const dataTableRef = useRef<HTMLDivElement>(null);
    const fillRestOfScreen = (ref: React.RefObject<HTMLDivElement>) => {
        const rectTop = ref.current?.getBoundingClientRect()?.top;
        return rectTop ? `${window.innerHeight - rectTop}px` : '100px';
    };

    useEffect(() => resetMappedData(), [searchQuery, timeframe, reportChain, clicks, data]);
    useWindowResize(() => resetMappedData());

    const handleMouseDown = useColumnDragger();
    const handleMouseEnter = useRowHover('bg-[#e7f6f3]');

    const [sortedColumn, setSortedColumn] = useState<TSortedColumn>({
        index: 2,
        type: 'normal'
    });
    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
    const [contextMenuRow, setContextMenuRow] = useState<TMappedDataItem | null>(null);

    function resetMappedData() {
        setSelectAllChecked(false);
        setMappedData((prevMappedData: TMappedData) => {
            return prevMappedData.map(row => ({ ...row, selected: false, deepMappedData: undefined }));
        });
    }

    const columns = (activeItemName: TItemName, reportChainIndex: number = 0): TColumn[] => {
        const columnAtIndex0 = {
            name: ' ',
            selector: (row: TMappedDataItem) => {
                const totalRevenue = row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0);
                const totalCost = row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0);
                return totalRevenue > totalCost
                    ? indicators.POSITIVE.name
                    : totalRevenue === totalCost
                        ? indicators.NEUTRAL.name
                        : indicators.NEGATIVE.name;
            }
        };
        const columnAtIndex1 = (reportChain?.at(reportChainIndex + 1)?.name
            ? {
                name: ' ',
                selector: (row: TMappedDataItem, index: number, parentIndex: number, reportChainIndex: number) => (
                    <ChevronToggle
                        reportChain={reportChain}
                        callback={(active: boolean) => handleChevronToggle(active, row, index, parentIndex, reportChainIndex)}
                    />
                )
            }
            : {
                name: () => {
                    return !fetchingData && mappedData.length > 0
                        ? <Checkbox
                            onValueChange={(newValue: boolean) => toggleSelectAll(newValue)}
                            checked={selectAllChecked}
                        />
                        : '';
                },
                selector: (row: TMappedDataItem, index: number) => {
                    return !fetchingData
                        ? <Checkbox
                            onValueChange={(newValue: boolean) => changeRowSelection(newValue, index)}
                            checked={!!row.selected}
                        />
                        : '';
                }
            }
        ) as TColumn;

        return [
            columnAtIndex0,
            columnAtIndex1,
            {
                name: activeItemName,
                selector: (row: TMappedDataItem) => row.name
            },
            {
                name: 'Visits',
                selector: (row: TMappedDataItem) => row.clicks.length
            },
            {
                name: 'Clicks',
                selector: (row: TMappedDataItem) => row.clicks.filter(click => click.lpClickTimestamp).length
            },
            {
                name: 'Conversions',
                selector: (row: TMappedDataItem) => row.clicks.filter(click => click.conversionTimestamp).length
            },
            {
                name: 'Revenue',
                selector: (row: TMappedDataItem) => `$ ${row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0).toFixed(2)}`
            },
            {
                name: 'Cost',
                selector: (row: TMappedDataItem) => `$ ${row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0).toFixed(2)}`
            },
            {
                name: 'Profit',
                selector: (row: TMappedDataItem) => {
                    const totalRevenue = row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0);
                    const totalCost = row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0);
                    return `$ ${(totalRevenue - totalCost).toFixed(2)}`;
                }
            },
            {
                name: 'CPV',
                selector: (row: TMappedDataItem) => {
                    const totalCost = row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0);
                    const totalVisits = row.clicks.length;
                    return `$ ${replaceNonsense(totalCost / totalVisits, 0).toFixed(2)}`;
                }
            },
            {
                name: 'CPC',
                selector: (row: TMappedDataItem) => {
                    const totalCost = row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0);
                    const totalClicks = row.clicks.filter(click => click.lpClickTimestamp).length;
                    return `$ ${replaceNonsense(totalCost / totalClicks, 0).toFixed(2)}`;
                }
            },
            {
                name: 'CTR',
                selector: (row: TMappedDataItem) => {
                    const totalClicks = row.clicks.filter(click => click.lpClickTimestamp).length;
                    const totalVisits = row.clicks.length;
                    return `${(replaceNonsense(totalClicks / totalVisits, 0) * 100).toFixed(2)}%`;
                }
            },
            {
                name: 'CV',
                selector: (row: TMappedDataItem) => {
                    const totalConversions = row.clicks.filter(click => click.conversionTimestamp).length;
                    const totalVisits = row.clicks.length;
                    return `${(replaceNonsense(totalConversions / totalVisits, 0) * 100).toFixed(2)}%`;
                }
            },
            {
                name: 'ROI',
                selector: (row: TMappedDataItem) => {
                    const totalCost = row.clicks.reduce((totalCost, click) => totalCost + (click.cost ?? 0), 0);
                    const totalRevenue = row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0);
                    return `${(replaceNonsense((totalRevenue - totalCost) / totalCost, 0) * 100).toFixed(2)}%`;
                }
            },
            {
                name: 'EPV',
                selector: (row: TMappedDataItem) => {
                    const totalRevenue = row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0);
                    const totalVisits = row.clicks.length;
                    return `$ ${replaceNonsense(totalRevenue / totalVisits, 0).toFixed(2)}`;
                }
            },
            {
                name: 'EPC',
                selector: (row: TMappedDataItem) => {
                    const totalRevenue = row.clicks.reduce((totalRevenue, click) => totalRevenue + (click.revenue ?? 0), 0);
                    const totalClicks = row.clicks.filter(click => click.lpClickTimestamp).length;
                    return `$ ${replaceNonsense(totalRevenue / totalClicks, 0).toFixed(2)}`;
                }
            }
        ];
    };

    function handleChevronToggle(
        active: boolean,
        row: TMappedDataItem,
        index: number,
        parentIndex: number,
        reportChainIndex: number = 1
    ) {
        if (reportChainIndex > 2) return;

        const newMappedData = structuredClone(mappedData);
        const newActiveItem = reportChain
            ? (itemsArray.find(item => item.name === reportChain[reportChainIndex]?.name) ?? activeItem)
            : activeItem;
        const deepMappedData = active
            ? mapData({
                clicks: row.clicks,
                data,
                activeItem: newActiveItem,
                timeframe
            })
            : null;

        if (reportChainIndex === 1) {
            newMappedData[index].deepMappedData = deepMappedData;
        } else if (reportChainIndex === 2) {
            // newMappedData[index].deepMappedData[parentIndex].deepMappedData = deepMappedData;
        } else {
            return;
        }

        setMappedData(newMappedData);
        setSelectAllChecked(false);
    }

    function toggleSelectAll(newValue: boolean) {
        if (!reportChain?.at(1)) return;
        const newMappedData = mappedData.map(row => ({ ...row, selected: !newValue }));
        setMappedData(newMappedData);
        setSelectAllChecked(!newValue);
    }

    function changeRowSelection(newValue: boolean, index: number) {
        if (reportChain && !reportChain.at(1)) return;
        const newMappedData = structuredClone(mappedData);
        newMappedData[index].selected = !newValue;
        setMappedData(newMappedData);
        setSelectAllChecked(false);
    }

    function handleContextMenu(e: React.MouseEvent<HTMLElement>, row: TMappedDataItem) {
        e.preventDefault();
        setContextMenuRow({ ...row, x: e.pageX, y: e.pageY });
    }

    useEffect(() => {
        const handleGlobalClick = () => setContextMenuRow(null);
        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    function handleFilterClick(index: number) {
        if (index < 2) return;
        setSortedColumn({
            index,
            type: sortedColumn.index === index && sortedColumn.type === 'normal' ? 'reversed' : 'normal'
        });
    }

    function columnTotal(mappedData: TMappedData, column: TColumn, index: number) {
        if (index <= 2) return '';

        let isPercentage = false;
        return mappedData
            .map((_row, _index) => {
                const cell = column.selector(_row, _index);
                if (typeof cell === 'string' && cell.includes('%')) isPercentage = true;
                return cell;
            })
            .reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0)
            + (isPercentage ? '%' : '');
    }

    const sortMappedData = () => {
        const _columns = columns(activeItem.name);
        const result = mappedData.sort((a, b) => {
            const activeColumn = _columns[sortedColumn.index];
            const _a = activeColumn?.selector(a)?.at(-1) === '%' ? parseFloat(activeColumn.selector(a)) : activeColumn.selector(a);
            const _b = activeColumn?.selector(b)?.at(-1) === '%' ? parseFloat(activeColumn.selector(b)) : activeColumn.selector(b);
            return _a - _b;
        });
        return sortedColumn.type === 'reversed'
            ? result.reverse()
            : result;
    };
    const sortedMappedData = sortMappedData();

    return (
        <div
            ref={dataTableRef}
            className='max-w-[100vw] overflow-x-scroll'
            style={{ height: fillRestOfScreen(dataTableRef) }}
        >
            {contextMenuRow &&
                <RowContextMenu
                    row={contextMenuRow}
                    activeItem={activeItem}
                    timeframe={timeframe}
                    addNewSpawnedTab={addNewSpawnedTab}
                    report={report}
                />
            }
            <div className='relative grid grid-flow-col whitespace-nowrap overflow-x-scroll h-full bg-[#ffffff]'>
                {columns(activeItem.name).map((column, index) => {
                    const id = nanoid();
                    return (
                        <div key={index} id={id}
                            className='relative pb-16 w-full'
                            style={{ width: index === 0 ? '15px' : index === 1 ? '30px' : '' }}
                        >
                            <div className='absolute h-full' style={{ right: 0, width: '1px', backgroundColor: index !== 0 ? 'lightgray' : '' }}>
                                <div onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                                    if (index > 1) {
                                        handleMouseDown(e, id);
                                    }
                                }}
                                    className={(index <= 1 ? '' : 'cursor-e-resize hover:opacity-100') + ' h-full opacity-0'}
                                    style={{ border: 'dashed black 1px' }}
                                />
                            </div>
                            <div
                                className='flex justify-start items-center overflow-hidden px-2 h-8 text-white bg-[#2f918e]'
                                style={{
                                    minWidth: index >= 2 ? '110px' : '',
                                    borderLeft: 'solid lightgray 1px'
                                }}
                            >
                                {index >= 2 &&
                                    <span
                                        className='cursor-pointer'
                                        onClick={e => handleFilterClick(index)}
                                    >
                                        <FontAwesomeIcon icon={faFilter} />
                                    </span>
                                }
                                <span className={(index >= 2 ? 'ml-[4px]' : '')}>
                                    {typeof column.name === 'function'
                                        ? column.name()
                                        : column.name
                                    }
                                </span>
                            </div>
                            {fetchingData
                                ? index >= 2 && (
                                    <div className='flex justify-center items-start h-full w-full py-2'>
                                        <Spinner />
                                    </div>
                                )
                                : sortedMappedData.map((_row, _index) => {
                                    const _cell_id = `col_${index}_index_${_index}`;
                                    const _cell = column.selector(_row, _index);
                                    return searchQuery && !!_row?.name && !stringIncludes(_row.name, searchQuery)
                                        ? ''
                                        : (
                                            <React.Fragment key={_index}>
                                                <div id={_cell_id}
                                                    style={{ borderTop: 'solid lightgray 1px', borderBottom: 'solid lightgray 1px', backgroundColor: _row.selected ? '#d1ede7' : '' }}
                                                    className={(isEven(_index) ? 'bg-[#ffffff]' : 'bg-[#e5e5e5]')
                                                        + (index <= 1 ? '' : ' px-2')
                                                        + ' flex justify-center items-center overflow-hidden h-8 cursor-pointer'}
                                                    data-_row_index={_index}
                                                    onMouseEnter={e => handleMouseEnter(e, `div[data-_row_index="${_index}"]`)}
                                                    onClick={e => changeRowSelection(_row.selected === true, _index)}
                                                    onContextMenu={e => handleContextMenu(e, _row)}
                                                >
                                                    <span
                                                        style={{
                                                            backgroundColor: index === 0 ? indicators.getColor(_cell) : ''
                                                        }}
                                                        className={(index === 0 ? 'text-white ' : 'text-black ')
                                                            + (index <= 1 ? 'justify-center ' : index === 2 ? 'justify-start ' : 'justify-end ')
                                                            + ' flex items-center h-full w-full'}
                                                    >
                                                        {_cell}
                                                    </span>
                                                </div>
                                                {_row.deepMappedData &&
                                                    <>
                                                        <div className='relative flex justify-start items-center px-2 h-8 w-full bg-white'>
                                                            {index === 1 &&
                                                                <div className='absolute bg-white' style={{ zIndex: 20 }}>
                                                                    {reportChain?.at(1)?.name}
                                                                </div>
                                                            }
                                                        </div>
                                                        {_row.deepMappedData.map((__row, __index) => {
                                                            const __cell_id = `col_${index}__index_${__index}`;
                                                            const __cell = column.selector(__row, __index, _index, 2);
                                                            const prev__cell = columns(activeItem.name, 1)[index - 1]?.selector(__row, __index, _index, 2);
                                                            return (
                                                                <React.Fragment key={__index}>
                                                                    <div id={__cell_id}
                                                                        style={{
                                                                            borderTop: index >= 2 ? 'solid lightgray 1px' : '',
                                                                            borderBottom: index >= 2 ? 'solid lightgray 1px' : '',
                                                                            backgroundColor: __row.selected ? '#d1ede7' : ''
                                                                        }}
                                                                        className={(isEven(__index) ? 'bg-[#ffffff]' : 'bg-[#e5e5e5]')
                                                                            + (index <= 2 ? '' : ' px-2')
                                                                            + ' flex justify-center items-center overflow-hidden h-8 cursor-pointer'}
                                                                        data-__row_index={__index}
                                                                        onMouseEnter={e => handleMouseEnter(e, `div[data-__row_index="${__index}"]`)}
                                                                        onClick={e => changeRowSelection(__row.selected === true, __index)}
                                                                        onContextMenu={e => handleContextMenu(e, __row)}
                                                                    >
                                                                        <span className={(index === 0 ? 'text-white ' : 'text-black ')
                                                                            + (index === 0 ? 'justify-center ' : index === 2 ? 'justify-start ' : 'justify-end ')
                                                                            + ' flex items-center h-full w-full'}
                                                                        >
                                                                            {index === 0
                                                                                ? ''
                                                                                : index === 1
                                                                                    ? (
                                                                                        <div className='flex justify-end items-center h-full'>
                                                                                            <div className='flex justify-center items-center h-full text-white'
                                                                                                style={{ width: '15px', backgroundColor: index === 1 ? indicators.getColor(prev__cell) : '' }}
                                                                                            >
                                                                                                {prev__cell}
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                    : index === 2
                                                                                        ? (
                                                                                            <div className='flex justify-start items-center h-full'>
                                                                                                <div className='flex justify-center items-center px-2 h-full'
                                                                                                    style={{ width: '30px', borderRight: 'solid lightgray 1px' }}>
                                                                                                    {prev__cell}
                                                                                                </div>
                                                                                                <div className='px-2'>
                                                                                                    {__cell}
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                        : __cell
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    {__row.deepMappedData &&
                                                                        <>
                                                                            <div className='relative flex justify-start items-center px-2 h-8 w-full bg-white'>
                                                                                {index === 2 &&
                                                                                    <div className='absolute bg-white' style={{ zIndex: 20 }}>
                                                                                        {reportChain?.at(2)?.name}
                                                                                    </div>
                                                                                }
                                                                            </div>
                                                                            {__row.deepMappedData.map((___row, ___index) => {
                                                                                const ___cell = column.selector(___row, ___index, null, null);
                                                                                // const ___cell_id = `col_${index}___index_${___index}`;
                                                                                const prev___cell = columns(activeItem.name, 2)[index - 2]?.selector(___row, ___index, null, null);
                                                                                return (
                                                                                    <div key={___index} style={{
                                                                                        borderTop: index >= 2 ? 'solid lightgray 1px' : '',
                                                                                        borderBottom: index >= 2 ? 'solid lightgray 1px' : '',
                                                                                        backgroundColor: ___row.selected ? '#d1ede7' : ''
                                                                                    }}
                                                                                        className={(isEven(___index) ? 'bg-[#ffffff]' : 'bg-[#e5e5e5]')
                                                                                            + (index <= 2 ? '' : ' px-2')
                                                                                            + ' flex justify-center items-center overflow-hidden h-8 cursor-pointer'}
                                                                                        data-___row_index={___index}
                                                                                        onMouseEnter={e => handleMouseEnter(e, `div[data-___row_index="${___index}"]`)}
                                                                                        onClick={e => changeRowSelection(___row.selected === true, ___index)}
                                                                                        onContextMenu={e => handleContextMenu(e, ___row)}
                                                                                    >
                                                                                        <span className={(index === 0 ? 'text-white ' : 'text-black ')
                                                                                            + (index === 0 ? 'justify-center ' : index === 2 ? 'justify-start ' : 'justify-end ')
                                                                                            + ' flex items-center h-full w-full'}
                                                                                        >
                                                                                            {index <= 1
                                                                                                ? ''
                                                                                                : index === 2
                                                                                                    ? (
                                                                                                        <div className='flex justify-end items-center h-full'>
                                                                                                            <div className='flex justify-center items-center h-full text-white'
                                                                                                                style={{ width: '15px', backgroundColor: index === 2 ? indicators.getColor(prev___cell) : '' }}
                                                                                                            >
                                                                                                                {prev___cell}
                                                                                                            </div>
                                                                                                            <div className='px-2'>
                                                                                                                {___cell}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                    : ___cell
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                            {/* starter code for drilldown functionality: */}
                                                                            {/* <div className='relative flex justify-start items-center p-6 h-8 w-full bg-white'>
                                                                                {index === 2 &&
                                                                                    <div className='absolute bg-white' style={{ zIndex: 20 }}>
                                                                                        <DrilldownButton
                                                                                            text={__row.name}
                                                                                            cell_id={`col_${1}__index_${0}`}
                                                                                            mappedData={mappedData} 
                                                                                            drilldown={drilldown}
                                                                                        />
                                                                                    </div>
                                                                                }
                                                                            </div> */}
                                                                        </>
                                                                    }
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                        {/* starter code for drilldown functionality: */}
                                                        {/* <div className='relative flex justify-start items-center p-6 h-8 w-full bg-white'>
                                                            {index === 1 &&
                                                                <div className='absolute bg-white' style={{ zIndex: 20 }}>
                                                                    <DrilldownButton
                                                                        text={_row.name}
                                                                        cell_id={`col_${0}_index_${0}`}
                                                                        mappedData={mappedData}
                                                                        drilldown={drilldown}
                                                                    />
                                                                </div>
                                                            }
                                                        </div> */}
                                                    </>
                                                }
                                            </React.Fragment>
                                        )
                                })
                            }
                            < div className='absolute flex justify-end items-center overflow-hidden px-2 h-8 w-full text-white bg-[#2f918e]'
                                style={{
                                    minHeight: '20px',
                                    borderLeft: 'solid lightgray 1px',
                                    bottom: 0
                                }}
                            >
                                {columnTotal(mappedData, column, index)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
