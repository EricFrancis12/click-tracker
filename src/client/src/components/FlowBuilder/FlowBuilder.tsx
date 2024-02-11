import { useState } from 'react';
import Route from './Route';
import RulesMenu from '../RulesMenu/RulesMenu';
import { AddNewButton } from '../base-components';
import type { TFlow, TRule } from '../../lib/types';
import { defaultPath } from '../../lib/default-data';

export default function FlowBuilder({ flow, setFlow }: {
    flow: TFlow,
    setFlow: Function
}) {
    const [rulesMenuActive, setRulesMenuActive] = useState<boolean>(false);

    function handleRulesSave(rules: TRule[]) {
        if (!flow.ruleRoutes) {
            return;
        }
        setFlow({
            ...flow,
            ruleRoutes: [
                ...flow.ruleRoutes,
                {
                    active: true,
                    rules,
                    paths: [defaultPath()]
                }
            ]
        });
    }

    console.log(structuredClone(flow));

    return (
        <>
            {flow?.defaultRoute &&
                <Route
                    route={flow.defaultRoute}
                    flow={flow}
                    setFlow={setFlow}
                />
            }
            {flow?.ruleRoutes?.map((route, index) => (
                <Route key={index}
                    route={route}
                    flow={flow}
                    setFlow={setFlow}
                />
            ))}
            <AddNewButton name='Rule' onClick={e => setRulesMenuActive(true)} />
            {rulesMenuActive &&
                <RulesMenu
                    rules={[]}
                    setActive={setRulesMenuActive}
                    onSave={handleRulesSave}
                />
            }
        </>
    )
}
