import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import type { TTimeframe, TTimeframeName } from '../lib/types';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import { isArray, traverseParentsForClass } from '../utils/utils';
import { calcDefaultTimeframeName, getDates, formatDatesRange, } from '../utils/timeframe-utils';
import { DEFAULT_TIMEFRAME_NAME } from '../lib/constants';

export const CALENDAR_BUTTON_CLASS = 'CALENDAR_BUTTON_CLASS';
export const CALENDAR_APPLY_BUTTON_CLASS = 'CALENDAR_APPLY_BUTTON_CLASS';

export default function CalendarButton({ timeframe, setTimeframe }: {
    timeframe: TTimeframe,
    setTimeframe: React.Dispatch<React.SetStateAction<TTimeframe>>
}) {
    const [active, setActive] = useState<boolean>(false);
    const [calendarValue, setCalendarValue] = useState<TTimeframe>(timeframe ?? getDates(DEFAULT_TIMEFRAME_NAME));

    const [activeTimeframeName, setActiveTimeframeName] = useState<TTimeframeName>(calcDefaultTimeframeName(timeframe));
    const originalactiveTimeframeName = useRef(activeTimeframeName);

    useEffect(() => {
        if (timeframe == null && calendarValue != null) {
            setTimeframe(calendarValue);
            setActiveTimeframeName(DEFAULT_TIMEFRAME_NAME);
            originalactiveTimeframeName.current = DEFAULT_TIMEFRAME_NAME;
        }
    }, [timeframe]);

    useEffect(() => {
        if (active === false) {
            originalactiveTimeframeName.current = activeTimeframeName;
        }
    }, [active]);

    const timeframeTypes = [
        {
            name: 'Today',
            onClick: () => {
                setCalendarValue(getDates('Today'));
                setActiveTimeframeName('Today');
            }
        },
        {
            name: 'Yesterday',
            onClick: () => {
                setCalendarValue(getDates('Yesterday'));
                setActiveTimeframeName('Yesterday');
            }
        },
        {
            name: 'Last 3 Days',
            onClick: () => {
                setCalendarValue(getDates('Last 3 Days'));
                setActiveTimeframeName('Last 3 Days');
            }
        },
        {
            name: 'Last 7 Days',
            onClick: () => {
                setCalendarValue(getDates('Last 7 Days'));
                setActiveTimeframeName('Last 7 Days');
            }
        },
        {
            name: 'Last 30 Days',
            onClick: () => {
                setCalendarValue(getDates('Last 30 Days'));
                setActiveTimeframeName('Last 30 Days');
            }
        },
        {
            name: 'This Month',
            onClick: () => {
                setCalendarValue(getDates('This Month'));
                setActiveTimeframeName('This Month');
            }
        },
        {
            name: 'Last Month',
            onClick: () => {
                setCalendarValue(getDates('Last Month'));
                setActiveTimeframeName('Last Month');
            }
        },
        {
            name: 'Max Available',
            onClick: () => {
                setCalendarValue(getDates('Max Available'));
                setActiveTimeframeName('Max Available');
            }
        },
        {
            name: 'Date Range',
            onClick: () => {
                setActiveTimeframeName('Date Range');
            }
        }
    ];

    const ignoreNextGlobalClick = useRef<boolean>(false);
    function handleButtonClick() {
        if (!active) {
            setActive(true);
            ignoreNextGlobalClick.current = true;
            document.addEventListener('click', handleGlobalClick);
        } else {
            setActive(false);
            document.removeEventListener('click', handleGlobalClick);
        }
    }

    function handleGlobalClick(e: MouseEvent) {
        // a one-time "shut off" switch,
        // otherwise the click from handleButtonClick would also trigger handleGlobalClick
        if (ignoreNextGlobalClick.current === true) {
            ignoreNextGlobalClick.current = false;
            return;
        }

        const target = e.target as HTMLElement;
        if (!traverseParentsForClass(target, CALENDAR_BUTTON_CLASS) && !target?.classList?.contains(CALENDAR_APPLY_BUTTON_CLASS)) {
            handleCancel();
        }
    }

    function handleCalendarClick() {
        if (!active) setActive(true);
    }

    function handleCalendarChange(newValue: Value) {
        if (!isArray(newValue)) return;
        setCalendarValue(newValue as TTimeframe);
        setActiveTimeframeName('Date Range');
    }

    function handleCancel() {
        setActive(false);
        setCalendarValue(timeframe ?? getDates(DEFAULT_TIMEFRAME_NAME));
        setActiveTimeframeName(originalactiveTimeframeName.current);

        document.removeEventListener('click', handleGlobalClick);
    }

    function handleApply() {
        setActive(false);
        if (setTimeframe) setTimeframe(calendarValue);
    }

    return (
        <div className={CALENDAR_BUTTON_CLASS + ' relative'}>
            <div
                onClick={handleButtonClick}
                className='cursor-pointer hover:opacity-70 px-2 py-2'
                style={{
                    border: 'solid lightgrey 1px',
                    borderRadius: '6px',
                    backgroundImage: 'linear-gradient(0deg,var(--color-gray5),var(--color-white))'
                }}
            >
                <FontAwesomeIcon icon={faCalendarAlt} className='mr-[4px]' />
                <span className='mr-[4px]'>
                    {activeTimeframeName && activeTimeframeName !== 'Date Range'
                        ? activeTimeframeName
                        : formatDatesRange(calendarValue ?? getDates('Today'))
                    }
                </span>
                <FontAwesomeIcon icon={active ? faChevronUp : faChevronDown} />
            </div>
            {active &&
                <div onClick={e => handleCalendarClick()}
                    className='absolute bg-white'
                    style={{ border: 'solid black 1px', zIndex: 100 }}
                >
                    <div className='flex'>
                        <div className='m-4'>
                            <Calendar
                                selectRange={true}
                                value={calendarValue}
                                onChange={handleCalendarChange}
                            />
                        </div>
                        <div className='flex flex-col p-1' style={{ height: 'auto', width: 'auto', backgroundColor: 'red' }}>
                            {timeframeTypes.map((type, index) => (
                                <div onClick={type.onClick}
                                    key={index}
                                    className='whitespace-nowrap cursor-pointer hover:opacity-70'
                                    style={{
                                        backgroundColor: type.name === activeTimeframeName ? 'blue' : 'white'
                                    }}
                                >
                                    {type.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div />
                        <div className='flex justify-end gap-2 px-2'>
                            <button onClick={e => handleCancel()}>Cancel</button>
                            <button onClick={e => handleApply()} className={CALENDAR_APPLY_BUTTON_CLASS}>Apply</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
