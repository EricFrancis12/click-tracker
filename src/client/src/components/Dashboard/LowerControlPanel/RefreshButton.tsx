import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../Button';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

export default function RefreshButton() {
    const { data, clicks, fetchData } = useAuth();

    const [active, setActive] = useState(true);

    useEffect(() => {
        if (data && clicks) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [data, clicks]);

    return (
        <Button
            icon={faSyncAlt}
            onClick={e => {
                if (active) fetchData();
            }}
            disabled={!active}
            text='Refresh'
        />
    )
}
