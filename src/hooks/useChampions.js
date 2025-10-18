import { useChampionsContext } from '../contexts/championContext.jsx';

// Cambia a export nombrado en lugar de default
export function useChampions(regionName = null) {
    const { 
        getChampionsByRegion, 
        loading 
    } = useChampionsContext();
    
    const champions = regionName ? getChampionsByRegion(regionName) : [];

    return { 
        champions, 
        loading
    };
}

// O si prefieres mantener export default, cambia la importación
// export default useChampions;