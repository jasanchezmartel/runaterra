import React, { useState, useEffect, useRef } from 'react';
import { useChampionsContext } from '../../contexts/championContext.jsx';
import { useAppContext } from '../../contexts/appContext.jsx';
import ChampionCard from '../Champion/ChampionCard.jsx';
import './SelectedFaction.css';

// Importación de imágenes de regiones
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

// Historial de selecciones para evitar repeticiones
const selectionHistory = {
    recent: [],
    allTime: {}
};

function SelectedFaction() {
    const [isSelecting, setIsSelecting] = useState(false);
    const [previousSelection, setPreviousSelection] = useState([]);
    const containerRef = useRef(null);

    const {
        getChampionsByRegion,
        bannedChampions,
        toggleBanChampion,
        resetBans,
        loading
    } = useChampionsContext();

    const {
        selectedRegions,
        setSelectedRegions,
        resetSelection
    } = useAppContext();

    const allRegions = [
        'Aguas Estancadas', 'Ciudad de Bandle', 'Demacia', 'El Vacío', 'Freljord',
        'Islas de la sombra', 'Ixtal', 'Jonia', 'Noxus', 'Piltover',
        'Runaterra', 'Shurima', 'Targon', 'Zaun'
    ];

    // Inicializar el conteo de selecciones
    useEffect(() => {
        if (Object.keys(selectionHistory.allTime).length === 0) {
            allRegions.forEach(region => {
                selectionHistory.allTime[region] = 0;
            });
        }
    }, []);

    // Efecto para ajustar la altura del contenedor
    useEffect(() => {
        if (containerRef.current) {
            if (selectedRegions.length > 0) {
                const heightPerRegion = 600;
                const totalHeight = selectedRegions.length * heightPerRegion + 100;
                containerRef.current.style.minHeight = `${totalHeight}px`;
            } else {
                containerRef.current.style.minHeight = 'auto';
            }
        }
    }, [selectedRegions]);

    useEffect(() => {
        const handleReset = () => {
            resetSelection(); // Usar función del contexto para regiones
            setPreviousSelection([]);
            resetBans(); // Usar función del contexto para baneos

            // Reiniciar historial
            selectionHistory.recent = [];
            Object.keys(selectionHistory.allTime).forEach(region => {
                selectionHistory.allTime[region] = 0;
            });
        };

        window.addEventListener('resetRegions', handleReset);

        return () => {
            window.removeEventListener('resetRegions', handleReset);
        };
    }, [resetBans, resetSelection]);

    const selectRandomRegions = (numberOfRegions = 2) => {
        if (isSelecting) return;

        setIsSelecting(true);
        // revertPreviousSelection ya no es necesario porque DynamicFaction maneja su visibilidad

        setTimeout(() => {
            const newSelected = getBalancedRandomRegions(numberOfRegions);

            setSelectedRegions(newSelected);
            setPreviousSelection(newSelected);
            setIsSelecting(false);

            // Actualizar historial
            updateSelectionHistory(newSelected);
            // hideSelectedRegions ya no es necesario aquí porque DynamicFaction se oculta solo
        }, 1500);
    };

    const getBalancedRandomRegions = (numberOfRegions = 2) => {
        const availableRegions = allRegions.filter(region =>
            !selectionHistory.recent.includes(region)
        );

        const regionsPool = availableRegions.length >= numberOfRegions ? availableRegions : allRegions;

        if (numberOfRegions === 1) {
            const shuffledPool = [...regionsPool].sort(() => 0.5 - Math.random());
            const candidates = shuffledPool.slice(0, 6)
                .sort((a, b) => selectionHistory.allTime[a] - selectionHistory.allTime[b]);
            return [candidates[0]];
        }

        const sortedByUsage = [...regionsPool].sort((a, b) => {
            return selectionHistory.allTime[a] - selectionHistory.allTime[b];
        });

        const leastUsedCount = Math.min(numberOfRegions * 3, sortedByUsage.length);
        const leastUsed = sortedByUsage.slice(0, leastUsedCount);

        const shuffledLeastUsed = [...leastUsed].sort(() => 0.5 - Math.random())
            .sort(() => 0.5 - Math.random());

        const selected = shuffledLeastUsed.slice(0, numberOfRegions);

        if (selected.length < numberOfRegions) {
            const remainingNeeded = numberOfRegions - selected.length;
            const additionalRegions = regionsPool
                .filter(region => !selected.includes(region))
                .sort(() => 0.5 - Math.random())
                .slice(0, remainingNeeded);
            selected.push(...additionalRegions);
        }

        return selected;
    };

    const updateSelectionHistory = (newSelection) => {
        newSelection.forEach(region => {
            selectionHistory.allTime[region]++;
        });

        selectionHistory.recent = [...newSelection];

        if (selectionHistory.recent.length > 4) {
            selectionHistory.recent = selectionHistory.recent.slice(-4);
        }
    };

    const SelectedRegionDisplay = React.memo(({ regionName, bannedChampions, onToggleBan }) => {
        const regionChampions = getChampionsByRegion(regionName);

        const regionClass = `selected-region-display region-${regionName.replace(/\s+/g, '-').toLowerCase()}`;
        const factionNameClass = `faction-name--${regionName.replace(/\s+/g, '-').toLowerCase()}`;
        const gridClass = 'region-grid-champion';
        const bannerImage = regionImages[regionName];

        const isChampionBanned = (championName) => {
            return (bannedChampions[regionName] || []).includes(championName);
        };

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
                                className={`champion-${regionName.replace(/\s+/g, '-').toLowerCase()} ${isChampionBanned(champion.name) ? 'banned' : ''}`}
                                key={champion.name}
                                championName={champion.name}
                                region={regionName}
                                showName={true}
                                isBanned={isChampionBanned(champion.name)}
                                onToggleBan={() => onToggleBan(regionName, champion.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    });

    if (loading) {
        return <div className="loading-container">Cargando campeones...</div>;
    }

    return (
        <div className="selected-faction-container" ref={containerRef}>
            <div className="selection-controls">
                <button
                    className="random-btn random-btn-1"
                    onClick={() => selectRandomRegions(1)}
                    disabled={isSelecting}
                >
                    {isSelecting ? 'Seleccionando...' : 'Seleccionar 1 región'}
                </button>
                <button
                    className="random-btn random-btn-2"
                    onClick={() => selectRandomRegions(2)}
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
                                bannedChampions={bannedChampions}
                                onToggleBan={toggleBanChampion}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectedFaction;