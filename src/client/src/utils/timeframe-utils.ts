import type { TTimeframe, TTimeframeName } from '../lib/types';
import { timeframeNamesList } from '../lib/timeframeNamesList';
import { EARLIEST_TIMESTAMP_ALLOWED } from '../lib/constants';

export const ONE_DAY_MS = 86_400_000;
export const ONE_DAY_MS_MINUS_ONE = ONE_DAY_MS - 1;

export function calcDefaultTimeframeName(timeframe: TTimeframe) {
    const [timeframeStartDate, timeframeEndDate] = timeframe;
    for (let i = 0; i < timeframeNamesList.length; i++) {
        const name = timeframeNamesList[i];
        const [startDate, endDate] = getDates(name);

        if (startDate > timeframeStartDate
            || startDate < timeframeStartDate
            || endDate > timeframeEndDate
            || endDate < timeframeEndDate) {
            continue;
        }
        return name;
    }
    return formatDatesRange(timeframe) as TTimeframeName;
}

export function makeDate(
    year: number,
    month: number,
    day: number,
    hour: number,
    min: number,
    sec: number,
    ms: number
) {
    const date = new Date();
    date.setUTCFullYear(year, month, day); // year, month (0-11), day
    date.setUTCHours(hour, min, sec, ms); // hour, minute, second, millisecond
    return date;
}

export function formatDate(date = new Date()) {
    return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDatesRange(dates: [Date, Date]) {
    return dates.map(date => formatDate(date)).join(' - ');
}

export function getDates(timeframeTypeName: TTimeframeName): TTimeframe {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startOfTodayMS = makeDate(year, month, day, 5, 0, 0, 0).getTime();
    const endOfTodayMS = startOfTodayMS + ONE_DAY_MS_MINUS_ONE;

    let result = [startOfTodayMS, endOfTodayMS];
    switch (timeframeTypeName) {
        case 'Today': {
            // The default is already Today
            break;
        }
        case 'Yesterday': {
            const startOfYesterdayMS = startOfTodayMS - ONE_DAY_MS;
            const endOfYesterdayMS = startOfYesterdayMS + ONE_DAY_MS_MINUS_ONE;
            result = [startOfYesterdayMS, endOfYesterdayMS];
            break;
        }
        case 'Last 3 Days': {
            const startOf3DaysAgoMS = startOfTodayMS - (2 * ONE_DAY_MS);
            result = [startOf3DaysAgoMS, endOfTodayMS];
            break;
        }
        case 'Last 7 Days': {
            const startOf7DaysAgoMS = startOfTodayMS - (7 * ONE_DAY_MS);
            result = [startOf7DaysAgoMS, endOfTodayMS];
            break;
        }
        case 'Last 30 Days': {
            const startOf30DaysAgoMS = startOfTodayMS - (30 * ONE_DAY_MS);
            result = [startOf30DaysAgoMS, endOfTodayMS];
            break;
        }
        case 'This Month': {
            const startOfThisMonthMS = makeDate(year, month, 1, 0, 0, 0, 0).getTime();
            result = [startOfThisMonthMS, endOfTodayMS];
            break;
        }
        case 'Last Month': {
            const calcLastYearAndMonth = (year: number, month: number) => {
                return month !== 0 ? [year, month - 1] : [year - 1, 11]; // month is 0-11
            };

            const [lastYear, lastMonth] = calcLastYearAndMonth(year, month);
            const startOfThisMonthMS = makeDate(year, month, 1, 0, 0, 0, 0).getTime();

            const startOfLastMonthMS = makeDate(lastYear, lastMonth, 1, 0, 0, 0, 0).getTime();
            const endOfLastMonthMS = startOfThisMonthMS - 1;
            result = [startOfLastMonthMS, endOfLastMonthMS];
            break;
        }
        case 'Max Available': {
            result = [EARLIEST_TIMESTAMP_ALLOWED, endOfTodayMS];
            break;
        }
    }
    return result.map(timestamp => new Date(timestamp)) as TTimeframe;
}