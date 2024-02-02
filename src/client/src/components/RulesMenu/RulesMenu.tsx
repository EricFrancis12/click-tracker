import { useState } from 'react';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BlackTransparentOverlay from '../BlackTransparentOverlay';
import { Header, Footer } from '../menu-components';
import DropdownButton, { DropdownItem } from '../Dashboard/LowerControlPanel/DropdownButton';
import Button from '../Button';
import Checkbox from '../Checkbox';
import type { TLogicalRelation, TRoute, TRule } from '../../lib/types';
import { logicalRelations } from '../../lib/logicalRelations';
import { rulesList } from '../../lib/rulesList';
import { getRuleComponent } from '../../utils/utils';

export default function RulesMenu({
    rules: originalRules,
    route,
    onSave,
    setActive
}: {
    rules: TRule[],
    route?: TRoute,
    onSave: Function,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [dropdownActive, setDropdownActive] = useState<boolean>(false);
    const [logicalRelation, setLogicalRelation] = useState<TLogicalRelation>(route?.logicalRelation ?? 'and');
    const [rules, setRules] = useState(
        originalRules.map(_rule => {
            const matchingRule = rulesList.find(rulesListItem => rulesListItem.name === _rule.name);
            return matchingRule
                ? { ...matchingRule, equals: _rule.equals, data: _rule.data }
                : { ..._rule, equals: _rule.equals, data: _rule.data };
        }) ?? []
    );

    // Removing all "rules" from the rulesList:
    const filteredRules = rulesList.filter(rulesListItem => !rules.some(rule => rule.name === rulesListItem.name));

    function addNewRule(rulesListItem: typeof rulesList[0]) {
        const newRule = {
            name: rulesListItem.name,
            itemName: rulesListItem.itemName,
            clickProp: rulesListItem.clickProp,
            equals: true,
            data: []
        };
        setRules([...rules, newRule]);
        setDropdownActive(false);
    }

    function deleteRule(rule: TRule) {
        const newRules = rules.filter(_rule => _rule.name !== rule.name);
        setRules(newRules);
    }

    function handleSave() {
        onSave({
            rules,
            logicalRelation
        });
        setActive(false);
    }

    return (
        <BlackTransparentOverlay layer={2} className='flex justify-center items-start p-4'>
            <div className='flex flex-col justify-start items-between h-full w-full max-h-[90vh] max-w-[700px] bg-white'
                style={{ borderRadius: '5px' }}
            >
                <Header title='Rules' onClose={e => setActive(false)} />
                <div className='flex flex-col justify-start items-start gap-2 px-4 overflow-y-scroll'
                    style={{ height: 'inherit' }}
                >
                    <div className='flex justify-start items-center w-full'>
                        <span>
                            Logical Relation
                        </span>
                    </div>
                    <div className='flex justify-start items-center gap-2 w-full'>
                        {logicalRelations.map((_logicalRelation, index) => (
                            <div key={index} className='flex justify-start items-center'>
                                <Checkbox checked={_logicalRelation === logicalRelation}
                                    onValueChange={() => setLogicalRelation(_logicalRelation)}
                                />
                                <span>
                                    {_logicalRelation}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-start items-center gap-2 w-full'>
                        <DropdownButton
                            icon={faPlus}
                            active={dropdownActive}
                            setActive={setDropdownActive}
                            text='Add Rule'
                        >
                            {filteredRules.map((rule, index) => (
                                <DropdownItem key={index} onClick={e => addNewRule(rule)}>
                                    <span>
                                        {rule.name}
                                    </span>
                                </DropdownItem>
                            ))}
                        </DropdownButton>
                        <Button text='Remove All Rules' icon={faTrashAlt} onClick={e => setRules([])} />
                    </div>
                    <div
                        className='flex flex-col justify-start items-center gap-2 p-2 w-full'
                        style={{
                            border: 'solid 1px grey'
                        }}
                    >
                        {rules.map((rule, index) => {
                            const RuleComponent = getRuleComponent(rule);
                            return RuleComponent
                                ? (
                                    <RuleComponent
                                        key={index}
                                        rule={rule}
                                        rules={rules}
                                        setRules={setRules}
                                        onDelete={() => deleteRule(rule)}
                                    />
                                )
                                : ''
                        })}
                    </div>
                </div>
                <Footer onSave={e => handleSave()} onClose={e => setActive(false)} />
            </div>
        </BlackTransparentOverlay>
    )
}
