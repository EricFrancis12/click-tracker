import type { TClick, TTimeframe } from '../lib/types';

export default function useClicksDataPerTimeframe(clicks: TClick[], timeframe: TTimeframe) {
    const [timeframeStartDate, timeframeEndDate] = timeframe;

    let numClicks = 0;
    let numConversions = 0;
    let revenue = 0;
    let cost = 0;

    const filteredClicks = clicks.map(click => {
        const clickDate = new Date(click.viewTimestamp);
        const isWithinTimeframe = clickDate >= timeframeStartDate && clickDate <= timeframeEndDate;
        if (isWithinTimeframe) {
            if (click.lpClickTimestamp) numClicks++;
            if (click.conversionTimestamp) numConversions++;
            revenue += click.revenue;
            cost += click.cost;
            return true;
        }
        return false;
    });

    return {
        numVisits: filteredClicks.length,
        numClicks,
        numConversions,
        revenue,
        cost
    };
}
