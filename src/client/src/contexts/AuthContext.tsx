import React, { useState, useContext, useEffect } from 'react';
import type {
    TAffiliateNetwork, TCampaign, TFlow,
    TLandingPage, TOffer, TTrafficSource
} from '../lib/types';

export type TData = {
    affiliateNetworks?: TAffiliateNetwork[],
    campaigns?: TCampaign[],
    flows?: TFlow[],
    landingPages?: TLandingPage[],
    offers?: TOffer[],
    trafficSources?: TTrafficSource[]
};

const defaultData: TData = {
    affiliateNetworks: [],
    campaigns: [],
    flows: [],
    landingPages: [],
    offers: [],
    trafficSources: []
};

const AuthContext = React.createContext({
    data: defaultData,
    fetchData: async () => (defaultData),
    fetchingData: false,
    clicks: [],
    fetchClicks: async () => ([]),
    fetchingClicks: false
});

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useActionMenu must be used within a AuthContext provider');
    }
    return context;
}

export function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    const [data, setData] = useState<TData>(defaultData);
    const [fetchingData, setFetchingData] = useState<boolean>(false);
    const [clicks, setClicks] = useState([]);
    const [fetchingClicks, setFetchingClicks] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
        fetchClicks();
    }, []);

    async function fetchData(): Promise<any> {
        setFetchingData(true);
        setData(defaultData);

        fetch('/data')
            .then(async (res) => {
                if (res.status === 401) {
                    setData(defaultData);
                    return;
                }

                const resJson = await res.json();
                if (resJson.data) {
                    setData(resJson);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setFetchingData(false));
    }

    async function fetchClicks(): Promise<any> {
        setFetchingClicks(true);
        setClicks([]);

        fetch('/clicks')
            .then(async (res) => {
                if (res.status === 401) {
                    setClicks([]);
                    return;
                }

                const resJson = await res.json();
                if (resJson.data) {
                    setClicks(resJson);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setFetchingClicks(false));
    }

    const value = {
        data,
        fetchData,
        fetchingData,
        clicks,
        fetchClicks,
        fetchingClicks
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
