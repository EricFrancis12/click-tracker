import { useState, useEffect } from 'react';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

export default function RefreshButton() {
    const { data, clicks, fetchData, fetchClicks } = useAuth();

    const [active, setActive] = useState(true);

    useEffect(() => {
        if (data && clicks) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [data, clicks]);

    function handleClick() {
        if (active) {
            fetchData();
            fetchClicks();
        }
    }

    return (
        <Button
            icon={faSyncAlt}
            onClick={handleClick}
            disabled={!active}
            text='Refresh'
        />
    )
}
