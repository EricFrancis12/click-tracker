import { useState } from 'react';
import Route from './Route';
import RulesMenu from '../RulesMenu/RulesMenu';
import { AddNewButton } from '../baseComponents';
import { TFlow } from '../../lib/types';

export default function FlowBuilder({ flow, setFlow }: {
    flow: TFlow,
    setFlow: Function
}) {
    // function handleRulesSave(rules) {
    //     setFlow({
    //         ...flow,
    //         ruleRoutes: [
    //             ...flow.ruleRoutes,
    //             {
    //                 active: true,
    //                 rules: rules,
    //                 paths: [{
    //                     weight: 100,
    //                     landingPages: [],
    //                     offers: [],
    //                     active: true,
    //                     directLinkingEnabled: false
    //                 }]
    //             }
    //         ]
    //     });
    // }

    return (
        <>
            FlowBuilder
            {/* {flow?.defaultRoute &&
                <Route
                    route={flow.defaultRoute}
                    type={ROUTE_TYPES.DEFAULT}
                    flow={flow}
                    setFlow={setFlow}
                />
            }
            {flow?.ruleRoutes?.map((route, index) => (
                <Route key={index}
                    route={route}
                    type={ROUTE_TYPES.RULE}
                    flow={flow}
                    setFlow={setFlow}
                />
            ))}
            <AddNewButton name='Rule' onClick={e => setRulesMenuActive(true)} />
            {rulesMenuActive &&
                <RulesMenu
                    rules={[\]}
                    setActive={setRulesMenuActive}
                    onSave={handleRulesSave}
                />
            } */}
        </>
    )
}
