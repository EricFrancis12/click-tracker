import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Spinner({
    active = true
}: {
    active?: boolean
}) {
    return active
        ? (
            <FontAwesomeIcon icon={faSpinner} />
        )
        : <></>;
}
