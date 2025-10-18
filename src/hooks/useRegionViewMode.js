import { useState, useEffect } from 'react';

const useRegionViewMode = (regionName, defaultMode = 'icons-only') => {
    const [viewMode, setViewMode] = useState(defaultMode);

    // Efecto para cargar el modo de vista desde localStorage
    useEffect(() => {
        const savedViewMode = localStorage.getItem(`region-view-mode-${regionName}`);
        if (savedViewMode) {
            setViewMode(savedViewMode);
        }
    }, [regionName]);

    // Efecto para guardar el modo de vista en localStorage
    useEffect(() => {
        localStorage.setItem(`region-view-mode-${regionName}`, viewMode);
    }, [viewMode, regionName]);

    const toggleViewMode = () => {
        setViewMode(prev => prev === 'icons-only' ? 'extended' : 'icons-only');
    };

    return { viewMode, toggleViewMode };
};

// SOLO UN EXPORT - elimina cualquier export duplicado
export { useRegionViewMode };