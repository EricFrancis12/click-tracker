import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Spinner({ active: _active = true }: {
    active?: boolean
}) {
    const [active, setActive] = useState<boolean>(_active);

    return active
        ? (
            <FontAwesomeIcon icon={faSpinner} />
        )
        : <></>;
}
