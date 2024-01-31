import React from 'react';
import Button from '../../Button';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { TMappedData } from '../../../lib/types';

export default function ReportButton({ newReport, mappedData }: {
    newReport: Function,
    mappedData: TMappedData
}) {
    return (
        <Button
            icon={faRandom}
            onClick={() => {
                if (mappedData.length !== 1) return;
                newReport({
                    dataItem: structuredClone(mappedData[0])
                });
            }}
            disabled={mappedData.length !== 1}
            text='Report'
        />
    )
}
