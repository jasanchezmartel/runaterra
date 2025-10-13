import React from 'react';
import useChampions from '../../hooks/useChampions.js';
import ChampionCard from '../Champion/ChampionCard.jsx';
import { useRegionViewMode } from '../../hooks/useRegionViewMode.js';
import './DynamicFaction.css';

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

function DynamicRegion({
    regionName,
    customClassName = '',
    showName = true,
    showChampionNames = true,
    layout = 'grid'
}) {
    const { viewMode, toggleViewMode } = useRegionViewMode(regionName, 'icons-only');
    const { champions: regionChampions } = useChampions(regionName);

    const regionClass = `region-extended region-${regionName} ${customClassName} ${viewMode === 'icons-only' ? 'icons-only-view' : ''}`;
    const factionNameClass = `faction-name--${regionName}`;
    const gridClass = `region-grid-champion layout-${layout}`;
    
    const bannerImage = regionImages[regionName];

    return (
        <div className={regionClass}>
            <img 
                className="faction-extended-img" 
                src={bannerImage} 
                alt={regionName}
                onClick={toggleViewMode}
            />
            
            {showName && viewMode === 'full' && (
                <p className={factionNameClass}>{regionName.toUpperCase()}</p>
            )}
            
            {viewMode === 'full' && (
                <div className={gridClass}>
                    {regionChampions.map((champion) => (
                        <ChampionCard
                            className={`champion ${regionName}`}
                            key={champion.name}
                            championName={champion.name}
                            showName={showChampionNames}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default DynamicRegion;