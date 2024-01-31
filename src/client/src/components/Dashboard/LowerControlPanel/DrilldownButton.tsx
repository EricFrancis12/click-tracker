import { useState, useRef, useEffect } from 'react';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';
import type { TMappedData } from '../../../lib/types';

export default function DrilldownButton({ drilldown, mappedData, cell_id, text = '' }: {
    drilldown: Function,
    mappedData: TMappedData,
    cell_id: string,
    text?: string
}) {
    const linkedCellElement = useRef(document.getElementById(cell_id) ?? null);
    const rightAngleElement = useRef<HTMLDivElement>(null);

    const [rightAngleDims, setRightAngleDims] = useState({ height: '0px', width: '0px' });

    useEffect(() => {
        linkedCellElement.current = document.getElementById(cell_id) ?? null;
        if (!linkedCellElement.current || !rightAngleElement.current) return;

        const linkedCellRect = linkedCellElement.current.getBoundingClientRect();
        const rightAngleRect = rightAngleElement.current.getBoundingClientRect();

        setRightAngleDims({
            height: `${rightAngleRect.bottom - linkedCellRect.bottom + linkedCellElement.current.offsetHeight / 2}px`,
            width: `${rightAngleRect.left - linkedCellRect.left - linkedCellElement.current.clientWidth / 2}px`
        });
    }, [cell_id]);

    const selectedItems = mappedData.filter(item => item.selected === true) || [];

    function handleButtonClick(e: React.MouseEvent<HTMLDivElement>) {
        console.log('Drilldown not yet implimented');
        // drilldown(e);
    }

    return (
        <Button
            icon={faRandom}
            onClick={handleButtonClick}
            disabled={selectedItems.length !== 1}
            text={'Drilldown' + (text ? ` ${text}` : '')}
        >
            {linkedCellElement.current &&
                <div ref={rightAngleElement}
                    className='absolute'
                    style={{
                        bottom: '50%',
                        right: '100%',
                        height: rightAngleDims.height,
                        width: rightAngleDims.width,
                        borderLeft: 'solid 1px red',
                        borderBottom: 'solid 1px red',
                        pointerEvents: 'none'
                    }}
                />
            }
        </Button>
    )
}
