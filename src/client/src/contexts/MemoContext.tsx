import React, { useContext } from 'react';
import { useAuth } from './AuthContext';
import useRulesMemo from '../hooks/useRulesMemo';

export type TMemoContext = {
    rulesMemo: Record<string, string[]>
};

const MemoContext = React.createContext<TMemoContext | null>(null);

export function useMemoContext() {
    const context = useContext(MemoContext);
    if (!context) {
        throw new Error('useMemoContext must be used within a MemoContext provider');
    }
    return context;
}

export function MemoContextProvider({ children }: {
    children: React.ReactNode
}) {
    const { clicks } = useAuth();
    const rulesMemo = useRulesMemo(clicks);

    const value = {
        rulesMemo
    };

    return (
        <MemoContext.Provider value={value}>
            {children}
        </MemoContext.Provider>
    )
}
