// components/RegionViewToggle.jsx
import React from 'react';
import { useRegionViewMode } from '../../hooks/useRegionViewMode.js';

const RegionViewToggle = () => {
    const { viewMode, toggleViewMode, setViewMode } = useRegionViewMode();

    return (
        <div className="region-view-toggle" style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: '#1a1a1a',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '2px solid #c8aa6e',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
        }}>
            <span style={{ color: '#c8aa6e', fontFamily: 'Cinzel, serif' }}>
                Vista:
            </span>
            <button
                onClick={() => setViewMode('full')}
                style={{
                    padding: '5px 10px',
                    background: viewMode === 'full' ? '#c8aa6e' : 'transparent',
                    color: viewMode === 'full' ? '#000' : '#c8aa6e',
                    border: '1px solid #c8aa6e',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel, serif'
                }}
            >
                Completa
            </button>
            <button
                onClick={() => setViewMode('icons-only')}
                style={{
                    padding: '5px 10px',
                    background: viewMode === 'icons-only' ? '#c8aa6e' : 'transparent',
                    color: viewMode === 'icons-only' ? '#000' : '#c8aa6e',
                    border: '1px solid #c8aa6e',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel, serif'
                }}
            >
                Solo Iconos
            </button>
            <button
                onClick={toggleViewMode}
                style={{
                    padding: '5px 10px',
                    background: 'transparent',
                    color: '#c8aa6e',
                    border: '1px solid #c8aa6e',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Cinzel, serif'
                }}
            >
                Alternar
            </button>
        </div>
    );
};

export default RegionViewToggle;