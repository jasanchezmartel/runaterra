import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [areRegionsVisible, setAreRegionsVisible] = useState(true);
    const [areRulesVisible, setAreRulesVisible] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState([]);

    const toggleRules = () => {
        const newRulesState = !areRulesVisible;
        setAreRulesVisible(newRulesState);
        setAreRegionsVisible(!newRulesState);
    };

    const toggleRegionSelection = (regionName) => {
        setSelectedRegions(prev => {
            if (prev.includes(regionName)) {
                return prev.filter(r => r !== regionName);
            } else {
                return [...prev, regionName];
            }
        });
    };

    const resetSelection = () => {
        setSelectedRegions([]);
    };

    const value = {
        areRegionsVisible,
        areRulesVisible,
        toggleRules,
        selectedRegions,
        setSelectedRegions,
        toggleRegionSelection,
        resetSelection
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext debe usarse dentro de AppProvider');
    }
    return context;
}