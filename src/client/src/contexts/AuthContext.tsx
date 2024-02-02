import React, { useState, useContext, useEffect } from 'react';
import useRulesMemo from '../hooks/useRulesMemo';
import type {
    TAffiliateNetwork, TCampaign, TClick, TFlow,
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

const defaultClicks: TClick[] = []

const AuthContext = React.createContext({
    data: defaultData,
    fetchData: async () => (defaultData),
    fetchingData: false,
    clicks: defaultClicks,
    fetchClicks: async () => (defaultClicks),
    fetchingClicks: false,
    rulesMemo: {}
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
    const [clicks, setClicks] = useState<TClick[]>([]);
    const [fetchingClicks, setFetchingClicks] = useState<boolean>(false);

    const rulesMemo = useRulesMemo(clicks);

    useEffect(() => {
        fetchData();
        fetchClicks();
    }, []);

    async function fetchData(): Promise<any> {
        setFetchingData(true);
        setData(defaultData);

        fetch('/data')
            .then(async (res) => {
                if (res.status >= 400) {
                    setData(defaultData);
                    return;
                }

                const resJson = await res.json();
                if (resJson.data) {
                    setData(resJson.data);
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
                if (res.status >= 400) {
                    setClicks([]);
                    return;
                }

                const resJson = await res.json();
                if (resJson.clicks) {
                    setClicks(resJson.clicks);
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
        fetchingClicks,
        rulesMemo
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
