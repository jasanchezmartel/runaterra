import { useState, useEffect } from 'react';

// Almacenamiento global del estado
const regionViewModes = new Map();
const listeners = new Map();

export const useRegionViewMode = (regionName, initialViewMode = 'icons-only') => {
    const [viewMode, setViewMode] = useState(() => {
        // Inicializar el estado solo una vez por región
        if (!regionViewModes.has(regionName)) {
            regionViewModes.set(regionName, initialViewMode);
        }
        return regionViewModes.get(regionName);
    });

    useEffect(() => {
        // Configurar listeners para sincronizar el estado
        if (!listeners.has(regionName)) {
            listeners.set(regionName, new Set());
        }
        
        const regionListeners = listeners.get(regionName);
        regionListeners.add(setViewMode);
        
        return () => {
            regionListeners.delete(setViewMode);
            if (regionListeners.size === 0) {
                listeners.delete(regionName);
            }
        };
    }, [regionName]);

    const setRegionViewMode = (mode) => {
        regionViewModes.set(regionName, mode);
        const regionListeners = listeners.get(regionName);
        if (regionListeners) {
            regionListeners.forEach(listener => listener(mode));
        }
    };

    const toggleViewMode = () => {
        const currentMode = regionViewModes.get(regionName);
        const newMode = currentMode === 'full' ? 'icons-only' : 'full';
        setRegionViewMode(newMode);
    };

    return {
        viewMode,
        setViewMode: setRegionViewMode,
        toggleViewMode
    };
};