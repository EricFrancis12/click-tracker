import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconDefinition, faBullseye, faHandshake, faFolder, faSitemap, faGlobe, faUsers, faDollarSign, faDownload,
    faGlobeEurope, faWifi, faLaptop, faMobile, faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import useHoverDropdown from '../../../hooks/useHoverDropdown';
import { itemsArray } from '../../../lib/items';
import { primaryItemNames } from '../../../lib/primaryItemNames';
import type { TItem, TItemName_primary } from '../../../lib/types';
import { arrayIncludesKeyValuePair } from '../../../utils/utils';

export type TUpperControlPanelItem = TItem & {
    dropdownItems?: TUpperControlPanelItem[],
    icon?: IconDefinition
};

export default function UpperControlPanel({ activeItem, setActiveItem, excludeItemNames = [] }: {
    activeItem: TItem,
    setActiveItem: React.Dispatch<React.SetStateAction<TItem>>,
    excludeItemNames?: string[]
}) {
    useEffect(() => {
        if (!activeItem) {
            const filteredItems = itemsArray.filter(item => !excludeItemNames.includes(item.name));
            setActiveItem(filteredItems[0]);
        }
    }, [excludeItemNames]);

    const upperControlPanelItems: TUpperControlPanelItem[] = [
        { name: 'Campaigns', icon: faBullseye, clickProp: 'campaign_id', dataProp: 'campaigns' },
        { name: 'Offers', icon: faHandshake, clickProp: 'offer_id', dataProp: 'offers' },
        { name: 'Landing Pages', icon: faFolder, clickProp: 'landingPage_id', dataProp: 'landingPages' },
        { name: 'Flows', icon: faSitemap, clickProp: 'flow_id', dataProp: 'flows' },
        { name: 'Traffic Sources', icon: faGlobe, clickProp: 'trafficSource_id', dataProp: 'trafficSources' },
        { name: 'Affiliate Networks', icon: faUsers, clickProp: 'affiliateNetwork_id', dataProp: 'affiliateNetworks' },
        {
            name: 'Countries', icon: faGlobeEurope, clickProp: null, dropdownItems: [
                { name: 'Countries', icon: faGlobeEurope, clickProp: 'geoName' },
                { name: 'States / Regions', icon: faGlobeEurope, clickProp: 'region' },
                { name: 'Cities', icon: faGlobeEurope, clickProp: 'city' },
                { name: 'Languages', icon: faGlobeEurope, clickProp: 'language' }
            ]
        },
        {
            name: 'ISP', icon: faWifi, clickProp: null, dropdownItems: [
                { name: 'ISP', icon: faWifi, clickProp: 'isp' },
                { name: 'Mobile Carriers', icon: faWifi, clickProp: 'mobileCarrier' },
                { name: 'Connection Types', icon: faWifi, clickProp: 'connectionType' },
            ]
        },
        {
            name: 'Device Types', icon: faLaptop, clickProp: null, dropdownItems: [
                { name: 'Device Types', icon: faLaptop, clickProp: 'deviceType' },
                { name: 'Device Models', icon: faLaptop, clickProp: 'deviceModel' },
                { name: 'Device Vendors', icon: faLaptop, clickProp: 'deviceVendor' },
                { name: 'Screen Resolutions', icon: faLaptop, clickProp: 'screenResolution' }
            ]
        },
        {
            name: 'OS', icon: faMobile, clickProp: null, dropdownItems: [
                { name: 'OS', icon: faMobile, clickProp: 'os' },
                { name: 'OS Versions', icon: faMobile, clickProp: 'osVersion' }
            ]
        },
        {
            name: 'Browser Names', icon: faFolder, clickProp: null, dropdownItems: [
                { name: 'Browser Names', icon: faFolder, clickProp: 'browserName' },
                { name: 'Browser Versions', icon: faFolder, clickProp: 'browserVersion' }
            ]
        }
    ];

    const line1 = upperControlPanelItems.filter(item => primaryItemNames.includes(item.name as TItemName_primary));
    const line2 = upperControlPanelItems.filter(item => !primaryItemNames.includes(item.name as TItemName_primary));

    return (
        <div className='flex flex-col justify-center align-start gap-6 w-full px-8 py-6 bg-[#ffffff]'>
            {[line1, line2].map((line, index) => (
                <div key={index} className='flex flex-wrap gap-6 w-full'>
                    {line.map((item, _index) => {
                        if (!excludeItemNames.includes(item.name)) {
                            return (
                                <UpperControlPanelItem
                                    key={_index}
                                    item={item}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                />
                            )
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

export function UpperControlPanelItem({ item, activeItem, setActiveItem }: {
    item: TUpperControlPanelItem,
    activeItem: TItem,
    setActiveItem: React.Dispatch<React.SetStateAction<TItem>>
}) {
    const id = crypto.randomUUID();
    const { Dropdown, isHovered } = useHoverDropdown(id);

    return (
        <div className='flex justify-start items-start bg-transparent'>
            <div id={id}
                onClick={e => {
                    if (!item.dropdownItems) {
                        setActiveItem(item);
                    }
                }}
                style={{ borderRadius: '6px' }}
                className={(
                    activeItem.name === item.name || (item.dropdownItems && arrayIncludesKeyValuePair(item.dropdownItems, 'name', activeItem?.name))
                        ? 'bg-[#17a689] text-white '
                        : ' '
                )
                    + ' relative flex justify-start items-center py-1 px-2 cursor-pointer hover:bg-[#17a689] hover:text-white'
                }
            >
                {item.icon &&
                    <FontAwesomeIcon icon={item.icon} className='mr-[4px]' />
                }
                <span className='mr-[4px]'>
                    {item.dropdownItems && arrayIncludesKeyValuePair(item.dropdownItems, 'name', activeItem?.name)
                        ? activeItem.name
                        : item.name
                    }
                </span>
                {item.dropdownItems &&
                    <FontAwesomeIcon icon={isHovered ? faChevronUp : faChevronDown} />
                }
                {(item.dropdownItems && isHovered) &&
                    <div className='absolute bottom-0 bg-white text-black'
                        style={{
                            border: 'solid 1px black',
                            borderRadius: '6px'
                        }}
                    >
                        <Dropdown>
                            {item.dropdownItems.map((dropdownItem, index) => (
                                <div key={index} className='p-1 bg-white hover:bg-red-500'
                                    style={{
                                        borderTop: index === 0 ? 'solid 1px black' : '',
                                        borderBottom: 'solid 1px black'
                                    }}
                                    onClick={e => setActiveItem(dropdownItem)}
                                >
                                    <span style={{ whiteSpace: 'nowrap' }}>
                                        {dropdownItem.name}
                                    </span>
                                </div>
                            ))}
                        </Dropdown>
                    </div>
                }
            </div>
        </div>
    )
}
