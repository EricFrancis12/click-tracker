import type { TClick, TClickProp, TItem, TTimeframe, TMappedData, TMappedDataItem } from '../lib/types';
import type { TData } from '../contexts/AuthContext';

export function mapData({ clicks, data, activeItem, timeframe, backfill }: {
    clicks: TClick[],
    data: TData,
    activeItem: TItem,
    timeframe: TTimeframe,
    backfill?: boolean
}) {
    const { dataProp, clickProp } = activeItem;

    let results: TMappedData = [];
    let savedDataItems = data[dataProp as keyof typeof data] ?? [];

    const clicksInTimeframe = timeframe
        ? clicks /* clicks.filter(click => isWithinTimeframe(click, timeframe)) */
        : clicks;

    for (let i = 0; i < clicksInTimeframe.length; i++) {
        const click = clicksInTimeframe[i];
        const filteredResult = results.find(result => result.clickProp === click[clickProp as keyof typeof click]);

        // let dataItem = savedDataItems.find((_dataItem: any) => _dataItem._id === click[clickProp as keyof typeof click])
        // ?? { name: click[clickProp as keyof typeof click] };
        let dataItem;
        for (let i = 0; i < savedDataItems.length; i++) {
            if (savedDataItems[i]._id === click[clickProp as keyof typeof click]) {
                dataItem = savedDataItems[i];
                break;
            }
        }

        if (filteredResult) {
            filteredResult.clicks.push(structuredClone(click))
        } else {
            const result = {
                ...structuredClone(dataItem),
                clickProp: click[clickProp as keyof typeof click],
                clicks: [structuredClone(click)]
            };
            results.push(result as TMappedDataItem);
        }
    }

    // backfill means we loop thru dataItems that received 0 clicks,
    // and include them in results anyways
    // (so they will appear as a row):
    if (backfill) {
        for (let j = 0; j < savedDataItems?.length; j++) {
            const dataItemInResults = results.some(result => result._id === savedDataItems[j]._id);
            if (!dataItemInResults) {
                const result = {
                    ...structuredClone(savedDataItems[j]),
                    clickProp: savedDataItems[j]._id as TClickProp,
                    clicks: []
                };
                results.push(result);
            }
        }
    }

    // here's an example of what results could look like:
    // result = [
    //     { name: 'Unknown', clickProp: '012', clicks: [{}, {}, {}] },
    //     { name: 'name 1', clickProp: '345', clicks: [{}, {}] },
    //     { name: 'name 2', clickProp: '678', clicks: [{ conversion: true }] },
    //     { name: 'name 3', clickProp: '999', clicks: [{}, { revenue: 99 }, { cost: 9 }, { cost: 8 }] }
    // ];

    return results;
}