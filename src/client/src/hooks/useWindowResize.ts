import React, { useEffect } from 'react';

export default function useWindowResize(callback: Function) {
    useEffect(() => {
        const handleResize = (e: Event) => {
            if (callback && typeof callback === 'function') {
                callback(e);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
}
