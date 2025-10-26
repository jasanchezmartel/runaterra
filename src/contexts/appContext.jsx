import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [areRegionsVisible, setAreRegionsVisible] = useState(true);
    const [areRulesVisible, setAreRulesVisible] = useState(false);

    const toggleRules = () => {
        const newRulesState = !areRulesVisible;
        setAreRulesVisible(newRulesState);
        setAreRegionsVisible(!newRulesState);
    };

    const value = {
        areRegionsVisible,
        areRulesVisible,
        toggleRules
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