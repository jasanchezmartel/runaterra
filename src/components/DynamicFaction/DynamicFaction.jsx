import React from 'react';
import { useChampions } from '../../hooks/useChampions.js';
import ChampionCard from '../Champion/ChampionCard.jsx';
import { useRegionViewMode } from '../../hooks/useRegionViewMode.js';
import { useAppContext } from '../../contexts/appContext.jsx';
import './DynamicFaction.css';

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

// Mapeo de imágenes de regiones
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

function DynamicFaction({
    regionName,
    customClassName = '',
    showChampionNames = true
}) {
    
    const { viewMode, toggleViewMode } = useRegionViewMode(regionName, 'icons-only');
    const { champions: regionChampions } = useChampions(regionName);
    const { selectRegionManually } = useAppContext(); // ← Usa el contexto

    const regionClass = `region-extended region-${regionName.replace(/\s+/g, '-').toLowerCase()} ${customClassName} ${viewMode === 'icons-only' ? 'icons-only-view' : ''}`;
    const factionNameClass = `faction-name--${regionName.replace(/\s+/g, '-').toLowerCase()}`;
    const gridClass = 'region-grid-champion';

    const bannerImage = regionImages[regionName];

    // Función para manejar el click en la imagen de la región
    const handleRegionClick = (e) => {
        e.stopPropagation(); // Evitar que se propague al toggleViewMode
        selectRegionManually(regionName); // Seleccionar región manualmente
    };

    return (
        <div className={regionClass}>
            <img
                className="faction-extended-img"
                src={bannerImage}
                alt={regionName}
                onClick={handleRegionClick} // ← Cambia a la nueva función
                style={{ cursor: 'pointer' }} // ← Para indicar que es clickeable
            />

            <div className="region-content">
                <p className={factionNameClass}>{regionName.toUpperCase()}</p>
                <div className={gridClass}>
                    {regionChampions.map((champion) => (
                        <ChampionCard
                            className={`champion-${regionName}`}
                            key={champion.name}
                            championName={champion.name}
                            region={regionName}
                            showName={showChampionNames}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DynamicFaction;