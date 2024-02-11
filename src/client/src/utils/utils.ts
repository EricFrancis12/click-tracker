import type { TData } from '../contexts/AuthContext';
import type { TCampaign, TClick, THttpMethod, TItem, TItemName, TMappedDataItem, TTimeframe, TTrafficSource } from '../lib/types';
import {
    defaultAffiliateNetwork, defaultCampaign, defaultFlow,
    defaultLandingPage, defaultOffer, defaultTrafficSource
} from '../lib/default-data';
import { TActionMenu } from '../contexts/ActionMenuContext';

export function isObject(any: any) {
    return any != null && typeof any === 'object';
}

export function isArray(any: any) {
    return Object.prototype.toString.call(any) === '[object Array]';
}

export function isNil(any: any) {
    return any === null || any === undefined;
}

export function isEmpty(any: any) {
    return isNil(any) || any === '';
}

export function isNonsense(any: any) {
    return isEmpty(any) || isNaN(any) || any === Infinity;
}

export function isEven(number: number) {
    return number % 2 === 0;
}

export function replaceNonsense(any: any, replacement: number = 0) {
    if (isNonsense(any)) return replacement;
    return any;
}

export function stringIncludes(string: string, substring: string) {
    if (isNil(string) || isNil(substring) || typeof string !== 'string' || typeof substring !== 'string') return false;
    return string?.toUpperCase()?.includes(substring?.toUpperCase());
}

export function arrayOf(any: any, length: number = 1) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(structuredClone(any));
    }
    return result;
}

export function shallowFlatten(array: any[]): (typeof array)[] {
    let result: any[] = [];
    array.forEach(item => {
        if (isArray(item)) {
            result = [result, ...item];
        } else {
            result.push(item);
        }
    });
    return result;
}

export function replaceAtIndex(array: any[], item: any, index: number) {
    return array.splice(index, 1, item);
}

export function arrayIncludesKeyValuePair(array: any[], key: string, value: string) {
    if (!array) return false;
    return array.find(item => item[key] === value) !== undefined;
}

export function removeDupesFromArray(array: any[]) {
    const uniqueArray: typeof array = [];
    for (const value of array) {
        if (!uniqueArray.includes(value)) {
            uniqueArray.push(value);
        }
    }
    return uniqueArray;
}

export function swapArrayElementsPerCondition(
    array: any[],
    condition: Function,
    options?: {
        direction?: 'before' | 'after',
        matchAll?: boolean
    }
) {
    const copyArray = [...array];
    for (let i = 0; i < array.length; i++) {
        if (condition(array[i], i) !== true) continue;

        if (options?.direction === 'before') {
            if (i === 0) continue;
            [copyArray[i], copyArray[i - 1]] = [copyArray[i - 1], copyArray[i]];
        } else if (options?.direction === 'after') {
            if (i === array.length - 1) continue;
            [copyArray[i], copyArray[i + 1]] = [copyArray[i + 1], copyArray[i]];
        }

        if (!options?.matchAll) break;
    }
    return copyArray;
}

export function weightedRandomlySelectItem(array: (unknown & {
    weight: number
})[]) {
    const totalWeight = array.reduce((total, currentItem) => {
        return total + (currentItem.weight ?? 100);
    }, 0);
    let randomNum = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < array.length; i++) {
        randomNum -= array[i].weight;
        if (randomNum < 0) {
            return array[i];
        }
    }
    return null;
}

export function traverseParentsForId(element: HTMLElement, id: string): boolean {
    if (element.id === id) {
        return true; // Found a valid id, return element
    } else if (element !== document.body && !!element.parentNode) {
        const parentElement = element.parentElement;
        if (parentElement) return traverseParentsForId(parentElement, id); // Recursive call and return its result
    }
    return false; // If no valid id found, return false
}

export function traverseParentsForClass(element: HTMLElement, _class: string): boolean {
    if (element.classList.contains(_class)) {
        return true; // Found a valid class, return element
    } else if (element !== document.body && !!element.parentNode) {
        const parentElement = element.parentElement;
        if (parentElement) return traverseParentsForClass(parentElement, _class); // Recursive call and return its result
    }
    return false; // If no valid class found, return false
}

export function traverseParentsForRef(element: HTMLElement, ref: React.RefObject<HTMLElement>): boolean {
    if (element === ref.current) {
        return true; // Found the valid ref, return element
    } else if (element !== document.body && !!element.parentNode) {
        const parentElement = element.parentElement;
        if (parentElement) return traverseParentsForRef(parentElement, ref); // Recursive call and return its result
    }
    return false; // If no valid ref found, return false
}

export function isWithinTimeframe(click: TClick, timeframe: TTimeframe) {
    const [startDate, endDate] = timeframe;
    const clickDate = new Date(click.viewTimestamp);

    if (startDate <= clickDate && clickDate <= endDate) return true;
    return false;
}

export function mappedDataItemToDataItem(
    mappedDataItem: TMappedDataItem,
    activeItem: TItem,
    data: TData
) {
    // Extract the property name from activeItem
    const propKey = activeItem.dataProp as keyof typeof data;

    // Get the array corresponding to the property from the global data object
    const dataArray = data[propKey];

    if (!dataArray) {
        return undefined;
    }

    let result;
    // Loop through the array and find the matching data item
    for (const dataItem of dataArray) {
        if (dataItem.name === mappedDataItem.name) {
            result = dataItem;
            break;
        }
    }

    return result;
}

export function getSingName(itemName: TItemName) {
    let result = '';
    switch (itemName) {
        case 'Affiliate Networks': result = 'Affiliate Network'; break;
        case 'Campaigns': result = 'Campaign'; break;
        case 'Flows': result = 'Flow'; break;
        case 'Landing Pages': result = 'Landing Page'; break;
        case 'Offers': result = 'Offer'; break;
        case 'Traffic Sources': result = 'Traffic Source'; break;
        case 'Countries': result = 'Country'; break;
        case 'Languages': result = 'Language'; break;
        case 'Cities': result = 'City'; break;
        case 'States / Regions': result = 'State / Region'; break;
        case 'ISP': result = 'ISP'; break;
        case 'Mobile Carriers': result = 'Mobile Carrier'; break;
        case 'Connection Types': result = 'Connection Type'; break;
        case 'Device Models': result = 'Device Model'; break;
        case 'Device Vendors': result = 'Device Vendor'; break;
        case 'Device Types': result = 'Device Type'; break;
        case 'Screen Resolutions': result = 'Screen Resolution'; break;
        case 'OS': result = 'OS'; break;
        case 'OS Versions': result = 'OS Version'; break;
        case 'Browser Names': result = 'Browser Name'; break;
        case 'Browser Versions': result = 'Browser Version'; break;
    }
    return result;
}

export function defaultItemFromItemName(itemName: TItemName) {
    let result = null;
    switch (itemName) {
        case 'Affiliate Networks': result = defaultAffiliateNetwork(); break;
        case 'Campaigns': result = defaultCampaign(); break;
        case 'Flows': result = defaultFlow(); break;
        case 'Landing Pages': result = defaultLandingPage(); break;
        case 'Offers': result = defaultOffer(); break;
        case 'Traffic Sources': result = defaultTrafficSource(); break;
    }
    return result;
}

export function endpointRouteFromItemName(itemName: TItemName) {
    let result = null;
    switch (itemName) {
        case 'Affiliate Networks': result = 'affiliate-networks'; break;
        case 'Campaigns': result = 'campaigns'; break;
        case 'Flows': result = 'flows'; break;
        case 'Landing Pages': result = 'landing-pages'; break;
        case 'Offers': result = 'offers'; break;
        case 'Traffic Sources': result = 'traffic-sources'; break;
    }
    return result;
}

export function makeEndpoint(actionMenu: TActionMenu, method: THttpMethod) {
    const endpointRoute = actionMenu?.itemName
        ? endpointRouteFromItemName(actionMenu.itemName)
        : null;
    if (!endpointRoute) {
        return null;
    } else if ((method === 'PUT' || method === 'DELETE') && actionMenu?.dataItem?._id) {
        return `/${endpointRoute}/${actionMenu.dataItem._id}`;
    } else if (method === 'POST') {
        return `/${endpointRoute}`;
    } else {
        return null;
    }
};

export function isOverflown(ref: React.RefObject<HTMLElement>) {
    // Determines whether an element is overflowing or not
    if (!ref?.current) return false;
    return ref.current.scrollHeight > ref.current.clientHeight || ref.current.scrollWidth > ref.current.clientWidth;
}

export function generateCampaignLinks({ campaign, trafficSource }: {
    campaign: TCampaign,
    trafficSource?: TTrafficSource | null
}) {
    let campaignUrl = `${window.location.protocol}//${window.location.hostname}/t/${campaign?._id}`;
    const clickUrl = `${window.location.protocol}//${window.location.hostname}/clk`;
    const postbackUrl = `${window.location.protocol}//${window.location.hostname}/postback/REPLACE?payout=OPTIONAL`;

    if (trafficSource) {
        campaignUrl += '?';
        const tokens = [...trafficSource.defaultTokens, ...trafficSource.customTokens];
        for (let i = 0; i < tokens.length; i++) {
            campaignUrl += `${trafficSource.defaultTokens[i].queryParam}=${trafficSource.defaultTokens[i].value}`;
            if (i !== trafficSource.defaultTokens.length - 1) {
                campaignUrl += '&';
            }
        }
    }

    return {
        campaignUrl,
        clickUrl,
        postbackUrl
    };
}

export function copyTextToClipboard(text: string) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .catch((err) => {
                console.error('Error copying text to clipboard:', err);
            });
    }
}
