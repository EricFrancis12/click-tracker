import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import Checkbox from '../Checkbox';
import WrappableSelect from '../WrappableSelect';
import useMatchOffset from '../../hooks/useMatchOffset';
import type { TFlow, TLandingPage, TLandingPage_id, TOffer, TOffer_id, TPath, TRoute } from '../../lib/types';

type TSection = {
    singName: 'Landing Page' | 'Offer',
    pluralName: 'Landing Pages' | 'Offers',
    prop: 'landingPages' | 'offers',
    options: TLandingPage[] | TOffer[],
    data: TSectionData[],
    makeNew: React.MouseEventHandler<HTMLDivElement>
};

type TSectionData = {
    _id: TLandingPage_id | TOffer_id,
    weight: number
};

export default function Path({ path, route, flow, setFlow }: {
    path: TPath,
    route: TRoute,
    flow: TFlow,
    setFlow: Function
}) {
    const { data } = useAuth();

    const [newPath, setNewPath] = useState<TPath>(path);

    const sections: TSection[] = [
        {
            singName: 'Landing Page',
            pluralName: 'Landing Pages',
            prop: 'landingPages',
            options: data?.landingPages ?? [],
            data: path?.landingPages ?? [],
            makeNew: () => createNewLandingPage()
        },
        {
            singName: 'Offer',
            pluralName: 'Offers',
            prop: 'offers',
            options: data?.offers ?? [],
            data: path?.offers ?? [],
            makeNew: () => createNewOffer()
        }
    ];

    const offsetLeftPixels = useMatchOffset({
        startSelector: '#match-offset-start',
        endSelector: '#match-offset-end'
    },
        [flow.type, flow?.defaultRoute?.paths, flow.ruleRoutes]
    );

    useEffect(() => {
        if (!route.rules && flow.defaultRoute) {
            setFlow({
                ...flow,
                defaultRoute: {
                    ...flow.defaultRoute,
                    paths: flow.defaultRoute.paths.map(_path => {
                        if (_path === path) {
                            return structuredClone(newPath);
                        }
                        return _path;
                    })
                }
            });
        } else if (flow.ruleRoutes) {
            setFlow({
                ...flow,
                ruleRoutes: flow.ruleRoutes.map(ruleRoute => {
                    if (ruleRoute.paths.includes(path)) {
                        return {
                            ...ruleRoute,
                            paths: ruleRoute.paths.map(_path => {
                                if (_path === path) {
                                    return structuredClone(newPath);
                                }
                                return _path;
                            })
                        };
                    }
                    return ruleRoute;
                })
            });
        }
    }, [newPath, newPath?.landingPages?.length, newPath?.offers?.length]);

    function handleChecked(pathProperty: string) {
        setNewPath({
            ...path,
            // inverting pathProperty when checkbox is checked:
            [pathProperty]: !path[pathProperty as keyof typeof path]
        });
    }

    function handleNewItem(prop: string) {
        const sectionDataArray = path[prop as keyof typeof path];
        if (typeof sectionDataArray !== 'object') return;
        setNewPath({
            ...path,
            [prop]: [
                ...sectionDataArray,
                {
                    ...data?.[prop as keyof typeof data]?.at(0),
                    weight: 100
                }
            ]
        });
    }

    function handleItemChange(prop: string, sectionData: TSectionData, newValue: TSectionData) {
        const sectionDataArray = path[prop as keyof typeof path];
        if (typeof sectionDataArray !== 'object') return;
        setNewPath({
            ...path,
            [prop]: sectionDataArray.map(propItem => {
                if (propItem === sectionData) {
                    return { ...propItem, ...newValue };
                }
                return propItem;
            })
        });
    }

    function handleItemDelete(prop: string, sectionData: TSectionData) {
        const sectionDataArray = path[prop as keyof typeof path];
        if (typeof sectionDataArray === 'number' || typeof sectionDataArray === 'boolean') return;

        const newSectionDataArray: TSectionData[] = [];
        for (const propItem of sectionDataArray) {
            if (propItem._id !== sectionData._id) {
                newSectionDataArray.push(propItem);
            }
        }

        setNewPath({
            ...path,
            [prop]: newSectionDataArray
        });
    }

    function handlePathDelete() {
        if (!route.rules && flow.defaultRoute) {
            setFlow({
                ...flow,
                defaultRoute: {
                    ...flow.defaultRoute,
                    paths: flow.defaultRoute.paths.filter(_path => _path !== path)
                }
            });
        } else if (flow.ruleRoutes) {
            setFlow({
                ...flow,
                ruleRoutes: flow.ruleRoutes.map(ruleRoute => {
                    if (ruleRoute === route) {
                        return {
                            ...ruleRoute,
                            paths: ruleRoute.paths.filter(_path => _path !== path)
                        }
                    }
                    return ruleRoute;
                })
            });
        }
    }

    function handlePathWeightChange(newWeight: number) {
        setNewPath({
            ...path,
            weight: newWeight
        });
    }

    function handleItemWeightChange(
        prop: string,
        sectionData: TSectionData,
        newWeight: number = 0
    ) {
        const sectionDataArray = path[prop as keyof typeof path];
        if (typeof sectionDataArray !== 'object') return;
        setNewPath({
            ...path,
            [prop]: sectionDataArray.map(propItem => {
                if (propItem === sectionData) {
                    return { ...propItem, weight: newWeight };
                }
                return propItem;
            })
        });
    }

    function calcWeightResult(weight: number, weights: number[]) {
        const total = weights.reduce((sum, num) => sum + num, 0);
        const percentageOfTotal = (weight / total) * 100;
        return `${Math.floor(percentageOfTotal)}`;
    }

    function getUrlFromSectionData(section: TSection, sectionData: TSectionData) {
        let result;
        if (section.singName === 'Landing Page') {
            const landingPage: TLandingPage | undefined = data.landingPages?.find(
                landingPage => landingPage._id === sectionData._id
            );
            result = landingPage?.url;
        } else if (section.singName === 'Offer') {
            const offer: TOffer | undefined = data.offers?.find(
                offer => offer._id === sectionData._id
            );
            result = offer?.url;
        }
        return result;
    }

    function createNewLandingPage() {
        console.log('Create New Landing Page not yet implimented.');
    }

    function createNewOffer() {
        console.log('Create New Offer not yet implimented.');
    }

    return (
        <div className='w-full bg-gray-300 px-2' style={{ borderRadius: '5px' }}>
            <div className='flex justify-between items-center py-3'>
                <div className='flex justify-start items-center'>
                    <div>
                        <span className={path.active ? '' : 'line-through'}>
                            Path
                        </span>
                    </div>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    {path.active &&
                        <div className='flex justify-center items-center gap-2'>
                            <span>
                                Weight:
                            </span>
                            <input className='w-[40px] p-1' style={{ borderRadius: '6px' }}
                                value={path.weight}
                                onChange={e => handlePathWeightChange(parseFloat(e.target.value))}
                            />
                        </div>
                    }
                    <div className='flex justify-center items-center gap-2'>
                        {path.active &&
                            <>
                                <span>
                                    {`(${calcWeightResult(path.weight, route.paths.map(path => path.weight))}%)`}
                                </span>
                                {route?.paths?.length > 1 &&
                                    <span className='cursor-pointer text-red-500' onClick={e => handlePathDelete()}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </span>
                                }
                            </>
                        }
                        <Checkbox
                            checked={path.active}
                            onValueChange={() => handleChecked('active')}
                        />
                    </div>
                </div>
            </div>
            {path.active &&
                <>
                    {sections.map((section, index) => (
                        <div key={index} className='my-2'>
                            <div className='relative flex justify-between items-center bg-white h-[40px] my-1 px-2'>
                                <div className='flex justify-between items-center gap-2 w-full'>
                                    <span
                                        className={path.directLinkingEnabled && section.pluralName === 'Landing Pages' ? 'line-through ' : ' '}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        {section.pluralName}
                                    </span>
                                    {index === 0 &&
                                        <Checkbox
                                            checked={!path.directLinkingEnabled}
                                            onValueChange={() => handleChecked('directLinkingEnabled')}
                                        />
                                    }
                                </div>
                                {!path.directLinkingEnabled && offsetLeftPixels !== '0px' &&
                                    <div
                                        className='absolute'
                                        style={{
                                            left: offsetLeftPixels
                                        }}
                                    >
                                        <span>
                                            Weight
                                        </span>
                                    </div>
                                }
                            </div>
                            {index === 0 && path.directLinkingEnabled
                                ? <div className='flex justify-center items-center bg-white h-[40px] my-1 px-2'>
                                    <span>
                                        Direct Linking Enabled
                                    </span>
                                </div>
                                : <>
                                    <div className='flex flex-col justify-center items-center min-h-[40px] bg-white'>
                                        {section?.data?.length === 0
                                            ? <span className='text-xs'>
                                                {`No ${section.pluralName} Added`}
                                            </span>
                                            : section.data.map((sectionData, _index) => (
                                                <div key={_index} id='match-offset-start'
                                                    className='flex justify-between items-center gap-2 bg-white h-[40px] my-1 px-2'
                                                >
                                                    <div className='flex justify-start items-center gap-2'>
                                                        <span>
                                                            {_index + 1}
                                                        </span>
                                                        <WrappableSelect
                                                            array={section.options}
                                                            value={sectionData}
                                                            name={(a: TLandingPage | TOffer) => a.name}
                                                            matchBy={(a: TLandingPage | TOffer) => a._id}
                                                            onChange={(value: TSectionData) => handleItemChange(section.prop, sectionData, value)}
                                                        />
                                                    </div>
                                                    <div className='flex justify-end items-center gap-1'>
                                                        <div id='match-offset-end'
                                                            className='flex justify-center items-center'
                                                            style={{
                                                                border: 'solid 1px grey',
                                                                borderRadius: '6px'
                                                            }}
                                                        >
                                                            <div
                                                                className='flex justify-center items-center w-[50%] px-3 py-1'
                                                                style={{
                                                                    borderRight: 'solid 1px grey'
                                                                }}
                                                            >
                                                                <input className='text-center w-full border-none outline-none'
                                                                    value={sectionData.weight}
                                                                    onChange={e => handleItemWeightChange(section.prop, sectionData, parseFloat(e.target.value))}
                                                                />
                                                            </div>
                                                            <div
                                                                className='flex justify-center items-center w-[50%] px-3 py-1'
                                                                style={{
                                                                    borderLeft: 'solid 1px grey'
                                                                }}
                                                            >
                                                                {`(${calcWeightResult(sectionData.weight, section.data.map(a => a.weight))}%)`}
                                                            </div>
                                                        </div>
                                                        <div className='cursor-pointer hover:text-button_backgroundColor'>
                                                            <a
                                                                href={getUrlFromSectionData(section, sectionData)}
                                                                target='_blank'
                                                                rel='noreferrer'
                                                            >
                                                                <FontAwesomeIcon icon={faExternalLink} />
                                                            </a>
                                                        </div>
                                                        <div className='cursor-pointer hover:text-button_backgroundColor'>
                                                            <FontAwesomeIcon icon={faPencilAlt} />
                                                        </div>
                                                        <div
                                                            className='cursor-pointer hover:text-red-500'
                                                            onClick={e => handleItemDelete(section.prop, sectionData)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className='flex justify-between items-center bg-white h-[40px] my-1 px-2'>
                                        <div onClick={section.makeNew}
                                            className='flex justify-center items-center h-full w-[50%] cursor-pointer'
                                            style={{ borderRight: 'solid 1px grey' }}
                                        >
                                            <span>
                                                {'Add New ' + section.singName}
                                            </span>
                                        </div>
                                        <div onClick={e => handleNewItem(section.prop)}
                                            className='flex justify-center items-center h-full w-[50%] cursor-pointer'
                                            style={{ borderLeft: 'solid 1px grey' }}
                                        >
                                            <span>
                                                {'+ New ' + section.singName}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    ))}
                </>
            }
        </div>
    )
}
