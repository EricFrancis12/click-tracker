import type { TData } from '../contexts/AuthContext';
import type {
    TAffiliateNetwork, TCampaign, TClick, TFlow,
    TItem, TItemName, TItemName_primary, TLandingPage,
    TMappedDataItem, TOffer, TTimeframe, TTrafficSource
} from '../lib/types';
import {
    defaultAffiliateNetwork, defaultCampaign, defaultFlow,
    defaultLandingPage, defaultOffer, defaultTrafficSource
} from '../lib/default-data';

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

export function arrayOf(any: any, length: number = 1) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(structuredClone(any));
    }
    return result;
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
        return null;
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

export function getSingName(primaryItemName: TItemName_primary) {
    let result = '';
    switch (primaryItemName) {
        case 'Affiliate Networks': result = 'Affiliate Network'; break;
        case 'Campaigns': result = 'Campaign'; break;
        case 'Flows': result = 'Flow'; break;
        case 'Landing Pages': result = 'Landing Page'; break;
        case 'Offers': result = 'Offer'; break;
        case 'Traffic Sources': result = 'Traffic Source'; break;
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
};
