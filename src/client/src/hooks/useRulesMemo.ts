import { useMemo } from 'react';
import type { TClick } from '../lib/types';
import { rulesList } from '../components/RulesMenu/layouts';
import { removeDupesFromArray } from '../utils/utils';

export default function useRulesMemo(clicks: TClick[]) {
    // Loop through all clicks, using useMemo to store unique values
    const rulesMemo = useMemo(() => {
        return makeRulesDictionary(clicks);
    }, [clicks]);
    return rulesMemo;
}

function makeRulesDictionary(clicks: TClick[]) {
    // Filter clicks into unique instances of each rulesList[i].clickProp
    const rulesDictionary: Record<string, string[]> = {};
    for (const currRule of rulesList) {
        const clickPropValues = clicks.map(click => click[currRule.clickProp as keyof typeof click]);
        const uniqueValues = removeDupesFromArray(clickPropValues).filter(rule => Boolean(rule));
        rulesDictionary[currRule.name] = uniqueValues;
    }
    return rulesDictionary;
}
