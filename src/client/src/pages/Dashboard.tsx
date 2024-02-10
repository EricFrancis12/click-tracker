import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ActionMenuProvider } from '../contexts/ActionMenuContext';
import DashboardTab from '../components/Dashboard/tabs/DashboardTab';
import HomeTab from '../components/Dashboard/tabs/HomeTab';
import ReportTab from '../components/Dashboard/tabs/ReportTab';
import { MemoContextProvider } from '../contexts/MemoContext';

export type TTab = {
    _id: string,
    component: typeof DashboardTab | typeof HomeTab | typeof ReportTab,
    props?: TTab_props
};
export type TTab_props = {
    [key: string]: any // Defining that any nunber of props passed up are acceptable, and of any type
};

export default function Dashboard() {
    const [activeTab_id, setActiveTab_id] = useState<string>('1');

    const defaultTabs: TTab[] = [
        { _id: '0', component: DashboardTab },
        { _id: '1', component: HomeTab, props: { addNewSpawnedTab } }
    ];
    const [spawnedTabs, setSpawnedTabs] = useState<TTab[]>([]);

    function handleClose(tab_id: string) {
        const newSpawnedTabs = spawnedTabs.filter(tab => tab._id !== tab_id);
        setActiveTab_id('0');
        setSpawnedTabs(newSpawnedTabs);
    }

    function addNewSpawnedTab({ props }: TTab_props) {
        const reportTab: TTab = {
            props: structuredClone(props), // Structured clone because was experiencing reference bug here otherwise
            component: ReportTab,
            _id: nanoid()
        };
        setSpawnedTabs(currentspawnedTabs => [...currentspawnedTabs, reportTab]);
        setActiveTab_id(reportTab._id);
    }

    return (
        <MemoContextProvider>
            <ActionMenuProvider>
                <div
                    className='relative'
                    style={{
                        fontFamily: 'Lato,Helvetica,sans-serif,-apple-system'
                    }}
                >
                    <div className='flex h-[40px] w-[100vw] bg-[#1e3948]'>
                        <div className='flex justify-center items-center h-full'>
                            <img
                                src='/assets/images/logo.png'
                                className='max-w-[40px] mx-6'
                                alt='Logo'
                            />
                        </div>
                        {[...defaultTabs, ...spawnedTabs].map(tab => (
                            <tab.component
                                key={tab._id}
                                {...tab.props} // Props will contain "addNewSpawnedTab" only when tab.component === HomeTab
                                active={tab._id === activeTab_id}
                                onClick={() => setActiveTab_id(tab._id)}
                                onClose={() => handleClose(tab._id)}
                            />
                        ))}
                    </div>
                </div>
            </ActionMenuProvider>
        </MemoContextProvider>
    )
}
