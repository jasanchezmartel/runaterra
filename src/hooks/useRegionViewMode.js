import { useState, useEffect } from 'react';

// Eliminamos el estado global y usamos un mapa por región
const regionViewModes = new Map(); // Almacena el viewMode por región
const listeners = new Map(); // Listeners por región

export const useRegionViewMode = (regionName, initialViewMode = 'icons-only') => {
    // Inicializar el viewMode para esta región si no existe
    if (!regionViewModes.has(regionName)) {
        regionViewModes.set(regionName, initialViewMode);
    }

    const [viewMode, setViewMode] = useState(regionViewModes.get(regionName));

    useEffect(() => {
        // Crear Set de listeners para esta región si no existe
        if (!listeners.has(regionName)) {
            listeners.set(regionName, new Set());
        }
        
        const regionListeners = listeners.get(regionName);
        regionListeners.add(setViewMode);
        
        return () => {
            regionListeners.delete(setViewMode);
            // Limpiar si no hay más listeners para esta región
            if (regionListeners.size === 0) {
                listeners.delete(regionName);
                regionViewModes.delete(regionName);
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