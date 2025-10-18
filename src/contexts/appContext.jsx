// src/contexts/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [areRegionsVisible, setAreRegionsVisible] = useState(true);
    const [areRulesVisible, setAreRulesVisible] = useState(false);

    const toggleRules = () => {
        const newRulesState = !areRulesVisible;
        setAreRulesVisible(newRulesState);
        setAreRegionsVisible(!newRulesState);
    };

    return (
        <AppContext.Provider value={{
            areRegionsVisible,
            areRulesVisible,
            toggleRules
        }}>
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