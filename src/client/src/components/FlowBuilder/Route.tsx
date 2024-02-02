import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faChevronUp, faChevronDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../Checkbox';
import Path from './Path';
import { AddNewButton } from '../base-components';
import RulesMenu from '../RulesMenu/RulesMenu';
import type { TFlow, TLogicalRelation, TRoute, TRule } from '../../lib/types';
import { swapArrayElementsPerCondition } from '../../utils/utils';
import { defaultPath } from '../../lib/default-data';

export default function Route({ route, flow, setFlow }: {
    route: TRoute,
    flow: TFlow,
    setFlow: Function
}) {
    const [rulesMenuActive, setRulesMenuActive] = useState<boolean>(false);

    function handleChevronClick(direction: 'before' | 'after') {
        if (!flow.ruleRoutes) return;
        const newRuleRoutes = swapArrayElementsPerCondition(
            flow.ruleRoutes,
            (ruleRoute: TRoute) => ruleRoute === route,
            { direction }
        );
        setFlow({
            ...flow,
            ruleRoutes: newRuleRoutes
        });
    }

    function handleTrashCanClick() {
        if (!flow.ruleRoutes) return;
        const newRuleRoutes = flow.ruleRoutes.filter(ruleRoute => ruleRoute !== route);
        setFlow({
            ...flow,
            ruleRoutes: [
                ...newRuleRoutes
            ]
        });
    }

    function handleChecked(newActive: boolean) {
        if (!flow.ruleRoutes) return;
        const newRuleRoutes = flow.ruleRoutes.map(ruleRoute => {
            if (ruleRoute === route) {
                return { ...ruleRoute, active: newActive };
            }
            return ruleRoute;
        });
        setFlow({
            ...flow,
            ruleRoutes: newRuleRoutes
        });
    }

    function handleAddNewPath() {
        if (flow.defaultRoute) {
            setFlow({
                ...flow,
                defaultRoute: {
                    ...flow.defaultRoute,
                    paths: [
                        ...flow.defaultRoute.paths,
                        defaultPath()
                    ]
                }
            });
        } else if (flow.ruleRoutes) {
            setFlow({
                ...flow,
                ruleRoutes: flow.ruleRoutes.map(ruleRoute => {
                    if (ruleRoute === route) {
                        return {
                            ...ruleRoute,
                            paths: [
                                ...ruleRoute.paths,
                                defaultPath()
                            ]
                        };
                    }
                    return ruleRoute;
                })
            });
        }
    }

    function handleSave({ rules, logicalRelation }: {
        rules: TRule[],
        logicalRelation: TLogicalRelation
    }) {
        if (!flow.ruleRoutes) return;
        const newRuleRoutes = flow.ruleRoutes.map(ruleRoute => {
            if (ruleRoute === route) {
                return { ...ruleRoute, rules, logicalRelation };
            }
            return ruleRoute;
        });
        setFlow({
            ...flow,
            ruleRoutes: newRuleRoutes
        });
    }

    return (
        <>
            <div
                className='flex flex-col justify-start items-start gap-2 w-full px-2 py-1'
                style={{
                    border: 'solid 1px grey',
                    borderRadius: '5px'
                }}
            >
                <div className='flex justify-between items-center p-2 w-full'>
                    <div className='flex justify-start items-center'>
                        <div>
                            <span className={route.active ? ' ' : 'line-through '}>
                                {route.rules ? 'Rule Route' : 'Default Route'}
                            </span>
                        </div>
                    </div>
                    {route.rules &&
                        <div className='flex justify-end items-center gap-2 p-2'>
                            {route.active &&
                                <>
                                    <div className='cursor-pointer' onClick={e => setRulesMenuActive(true)}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </div>
                                    <div className='cursor-pointer' onClick={e => handleChevronClick('before')}>
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    </div>
                                    <div className='cursor-pointer' onClick={e => handleChevronClick('after')}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </div>
                                    <div className='cursor-pointer hover:text-red-500' onClick={e => handleTrashCanClick()}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </div>
                                </>
                            }
                            <div>
                                <Checkbox
                                    checked={route.active}
                                    onValueChange={(newValue: boolean) => handleChecked(newValue)}
                                />
                            </div>
                        </div>
                    }
                </div>
                {route.active &&
                    <>
                        {route.paths.map((path, index) => (
                            <Path key={index}
                                path={path}
                                route={route}
                                flow={flow}
                                setFlow={setFlow}
                            />
                        ))}
                        <AddNewButton name='Path' onClick={e => handleAddNewPath()} />
                    </>
                }
            </div>
            {rulesMenuActive && route.active &&
                <RulesMenu
                    setActive={setRulesMenuActive}
                    rules={route.rules ?? []}
                    route={route}
                    onSave={handleSave}
                />
            }
        </>
    )
}
