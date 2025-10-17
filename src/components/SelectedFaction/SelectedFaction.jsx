import React, { useState, useEffect, useRef } from 'react';
import useChampions from '../../hooks/useChampions.js';
import ChampionCard from '../Champion/ChampionCard.jsx';
import './SelectedFaction.css';

// Importación de imágenes de regiones (las mismas que DynamicFaction)
import AguasEstancadas from '../../img/factions/aguasestancadas.webp';
import CiudadDeBandle from '../../img/factions/ciudaddebandle.webp';
import Demacia from '../../img/factions/demacia.webp';
import ElVacio from '../../img/factions/elvacio.webp';
import Freljord from '../../img/factions/freljord.webp';
import IslasDeLaSombra from '../../img/factions/islasdelasombra.webp';
import Ixtal from '../../img/factions/ixtal.webp';
import Jonia from '../../img/factions/jonia.webp';
import Noxus from '../../img/factions/noxus.webp';
import Piltover from '../../img/factions/piltover.webp';
import Runaterra from '../../img/factions/runaterra.webp';
import Shurima from '../../img/factions/shurima.webp';
import Targon from '../../img/factions/targon.webp';
import Zaun from '../../img/factions/zaun.webp';

const regionImages = {
    'Aguas Estancadas': AguasEstancadas,
    'Ciudad de Bandle': CiudadDeBandle,
    'Demacia': Demacia,
    'El Vacío': ElVacio,
    'Freljord': Freljord,
    'Islas de la sombra': IslasDeLaSombra,
    'Ixtal': Ixtal,
    'Jonia': Jonia,
    'Noxus': Noxus,
    'Piltover': Piltover,
    'Runaterra': Runaterra,
    'Shurima': Shurima,
    'Targon': Targon,
    'Zaun': Zaun
};

function SelectedFaction() {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [previousSelection, setPreviousSelection] = useState([]);
    const containerRef = useRef(null);

    const allRegions = [
        'Aguas Estancadas',
        'Ciudad de Bandle', 
        'Demacia',
        'El Vacío',
        'Freljord',
        'Islas de la sombra',
        'Ixtal',
        'Jonia',
        'Noxus',
        'Piltover',
        'Runaterra',
        'Shurima',
        'Targon',
        'Zaun'
    ];

    // Efecto para ajustar la altura del contenedor
    useEffect(() => {
        if (containerRef.current) {
            if (selectedRegions.length > 0) {
                // Calcular la altura del contenido cuando hay regiones seleccionadas
                const contentHeight = containerRef.current.scrollHeight;
                containerRef.current.style.minHeight = `${contentHeight}px`;
            } else {
                // Altura mínima cuando no hay regiones seleccionadas
                containerRef.current.style.minHeight = 'auto';
            }
        }
    }, [selectedRegions]);

    const selectRandomRegions = () => {
        setIsSelecting(true);
        
        revertPreviousSelection();
        
        setTimeout(() => {
            const shuffled = [...allRegions].sort(() => 0.5 - Math.random());
            const newSelected = shuffled.slice(0, 2);
            
            setSelectedRegions(newSelected);
            setPreviousSelection(newSelected);
            setIsSelecting(false);
            
            hideSelectedRegions(newSelected);
        }, 1500);
    };

    const revertPreviousSelection = () => {
        const allRegionElements = document.querySelectorAll('[class*="region-extended region-"]');
        allRegionElements.forEach(element => {
            element.style.visibility = 'visible';
        });
    };

    const hideSelectedRegions = (selected) => {
        selected.forEach(regionName => {
            const formattedName = regionName.toLowerCase().replace(/\s+/g, '-');
            
            const selectors = [
                `.region-extended.region-${formattedName}`,
                `.region-extended.region-${formattedName}.icons-only-view`,
                `.region-extended.region-${formattedName}:not(.icons-only-view)`
            ];
            
            selectors.forEach(selector => {
                const regionElement = document.querySelector(selector);
                if (regionElement) {
                    regionElement.style.visibility = 'hidden';
                }
            });

            const allElements = document.querySelectorAll('[class*="region-extended"]');
            allElements.forEach(element => {
                if (element.classList.contains(`region-${formattedName}`)) {
                    element.style.visibility = 'hidden';
                }
            });
        });
    };

    const resetSelection = () => {
        setSelectedRegions([]);
        setPreviousSelection([]);
        
        const allRegionElements = document.querySelectorAll('[class*="region-extended"]');
        allRegionElements.forEach(element => {
            element.style.visibility = 'visible';
        });
    };

    // Componente para mostrar cada región seleccionada
    const SelectedRegionDisplay = ({ regionName }) => {
        const { champions: regionChampions } = useChampions(regionName);
        
        const regionClass = `selected-region-display region-${regionName.replace(/\s+/g, '-').toLowerCase()}`;
        const factionNameClass = `faction-name--${regionName.replace(/\s+/g, '-').toLowerCase()}`;
        const gridClass = 'region-grid-champion';
        const bannerImage = regionImages[regionName];

        return (
            <div className={regionClass}>
                <img
                    className="faction-extended-img"
                    src={bannerImage}
                    alt={regionName}
                />
                <div className="region-content">
                    <p className={factionNameClass}>{regionName.toUpperCase()}</p>
                    <div className={gridClass}>
                        {regionChampions.map((champion) => (
                            <ChampionCard
                                className={`champion-${regionName.replace(/\s+/g, '-').toLowerCase()}`}
                                key={champion.name}
                                championName={champion.name}
                                region={regionName}
                                showName={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="selected-faction-container" ref={containerRef}>
            <div className="selection-controls">
                <button 
                    className="random-btn" 
                    onClick={selectRandomRegions}
                    disabled={isSelecting}
                >
                    {isSelecting ? 'Seleccionando...' : 'Seleccionar 2 regiones'}
                </button>
            </div>

            {selectedRegions.length > 0 && (
                <div className="selected-regions-display">
                    <div className="selected-regions-grid">
                        {selectedRegions.map((region) => (
                            <SelectedRegionDisplay 
                                key={region} 
                                regionName={region} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectedFaction;