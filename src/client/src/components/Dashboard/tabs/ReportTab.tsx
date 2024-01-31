import React from 'react';

export default function ReportTab({ active, onClick, onClose }: {
    active: boolean,
    onClick: React.MouseEventHandler<HTMLDivElement>,
    onClose: React.MouseEventHandler<SVGSVGElement>,
}) {
    return (
        <div>ReportTab</div>
    )
}
