import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useMemoContext } from '../../contexts/MemoContext';
import Checkbox from '../Checkbox';
import ItemSelector from './ItemSelector';
import { TRule } from '../../lib/types';

export function FromClicksOrCustom({
    rules,
    setRules,
    rule,
    onDelete,
    list: originalList
}: {
    rule: TRule,
    rules: TRule[],
    setRules: Function,
    onDelete: React.MouseEventHandler<HTMLSpanElement>,
    list?: string[]
}) {
    const { name, equals, data } = rule;

    const { rulesMemo } = useMemoContext();
    const list = originalList ?? rulesMemo?.[name as keyof typeof rulesMemo] ?? [];

    const [includeEmptyValue, setIncludeEmptyValue] = useState(false);

    const currItems = includeEmptyValue ? ['', ...data] : data;

    const setItems = (items: string[]) => {
        let newData = items;
        if (includeEmptyValue === true) {
            newData.shift();
        }

        const newRules = rules.map(_rule => {
            if (_rule.name === name) {
                return { ..._rule, data: newData };
            }
            return _rule;
        });
        setRules(newRules);
    }

    const setEquals = (newEquals: boolean) => {
        const newRules = rules.map(_rule => {
            if (_rule.name === name) {
                return { ..._rule, equals: newEquals };
            }
            return _rule;
        });
        setRules(newRules);
    }

    return (
        <Layout
            equals={equals}
            setEquals={setEquals}
            name={name}
            onDelete={onDelete}
        >
            <div className='flex justify-start items-center w-full'>
                <div className='flex justify-start items-center gap-2'>
                    <span>
                        <Checkbox
                            checked={includeEmptyValue}
                            onValueChange={() => setIncludeEmptyValue(!includeEmptyValue)}
                        />
                    </span>
                    <span>
                        Include Empty Value
                    </span>
                </div>
            </div>
            <ItemSelector
                currItems={currItems}
                setItems={setItems}
                itemsList={list}
                maxItems={includeEmptyValue ? 10 : 9}
            />
        </Layout>
    )
}

export function Checkboxes({
    rule,
    rules,
    setRules,
    onDelete,
    list = []
}: {
    rule: TRule,
    rules: TRule[],
    setRules: Function,
    onDelete: React.MouseEventHandler<HTMLSpanElement>,
    list?: string[]
}) {
    const { name, equals, data } = rule;

    function handleChange(item: string) {
        const newData = data.includes(item)
            ? data.filter(_item => _item !== item)
            : [...data, item];

        const newRules = rules.map(_rule => {
            if (_rule.name === name) {
                return { ..._rule, data: newData };
            }
            return _rule;
        });
        setRules(newRules);
    }

    const setEquals = (newEquals: boolean) => {
        const newRules = rules.map(_rule => {
            if (_rule.name === name) {
                return { ..._rule, equals: newEquals };
            }
            return _rule;
        });
        setRules(newRules);
    }

    return (
        <Layout equals={equals} setEquals={setEquals} name={name} onDelete={onDelete}>
            <div className='flex flex-wrap justify-start items-center gap-2 p-2'>
                {list.map((item, index) => (
                    <div key={index} className='flex justify-start items-center gap-2'>
                        <span>
                            <Checkbox checked={data.includes(item)} onValueChange={() => handleChange(item)} />
                        </span>
                        <span>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

function Layout({ equals, setEquals, name, onDelete, children }: {
    equals: boolean,
    setEquals: Function,
    name: string,
    onDelete: React.MouseEventHandler<HTMLSpanElement>,
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col justify-start items-start gap-2 w-full p-2'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex justify-start items-center gap-2'>
                    <span>
                        {name}
                    </span>
                    <span>
                        <span>
                            <Checkbox checked={equals} onValueChange={() => setEquals(true)} />
                        </span>
                        <span>
                            Equals
                        </span>
                    </span>
                    <span>
                        <span>
                            <Checkbox checked={!equals} onValueChange={() => setEquals(false)} />
                        </span>
                        <span>
                            Not Equal
                        </span>
                    </span>
                </div>
                <div>
                    <span onClick={onDelete} className='cursor-pointer'>
                        <FontAwesomeIcon icon={faX} fontSize='12px' />
                    </span>
                </div>
            </div>
            {children}
        </div>
    )
}
