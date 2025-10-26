import React, { createContext, useContext, useState, useEffect } from 'react';
import championsData from '../data/champions.json';

const ChampionsContext = createContext();

export function ChampionsProvider({ children }) {
    const [champions, setChampions] = useState([]);
    const [bannedChampions, setBannedChampions] = useState({}); // ← Cambiado a objeto
    const [loading, setLoading] = useState(true);

    // Cargar datos iniciales y banned champions del localStorage
    useEffect(() => {
        const loadChampions = async () => {
            try {
                setLoading(true);
                
                // Cargar campeones del JSON
                const formattedChampions = championsData.map(champion => ({
                    ...champion,
                    region: champion.faction,
                    isBanned: false
                }));
                
                setChampions(formattedChampions);

                // Cargar banned champions del localStorage
                const savedBannedChampions = localStorage.getItem('bannedChampions');
                if (savedBannedChampions) {
                    setBannedChampions(JSON.parse(savedBannedChampions));
                }
                
            } catch (error) {
                console.error('Error loading champions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChampions();
    }, []);

    // Función para banear un campeón (AHORA necesita región)
    const banChampion = (regionName, championName) => {
        setBannedChampions(prev => {
            const regionBans = prev[regionName] || [];
            const newBannedChampions = {
                ...prev,
                [regionName]: [...regionBans, championName]
            };
            localStorage.setItem('bannedChampions', JSON.stringify(newBannedChampions));
            return newBannedChampions;
        });
    };

    // Función para desbanear un campeón (AHORA necesita región)
    const unbanChampion = (regionName, championName) => {
        setBannedChampions(prev => {
            const regionBans = prev[regionName] || [];
            const newBannedChampions = {
                ...prev,
                [regionName]: regionBans.filter(name => name !== championName)
            };
            localStorage.setItem('bannedChampions', JSON.stringify(newBannedChampions));
            return newBannedChampions;
        });
    };

    // Función para resetear todos los baneos
    const resetBans = () => {
        setBannedChampions({});
        localStorage.removeItem('bannedChampions');
    };

    // Función para verificar si un campeón está baneado en una región
    const isChampionBannedInRegion = (regionName, championName) => {
        const regionBans = bannedChampions[regionName];
        return regionBans ? regionBans.includes(championName) : false;
    };

    // Función para obtener campeones por región
    const getChampionsByRegion = (regionName) => {
        return champions
            .filter(champion => champion.region === regionName)
            .map(champion => ({
                ...champion,
                isBanned: isChampionBannedInRegion(regionName, champion.name)
            }));
    };

    // Función toggle para banear/desbanear
    const toggleBanChampion = (regionName, championName) => {
        if (isChampionBannedInRegion(regionName, championName)) {
            unbanChampion(regionName, championName);
        } else {
            banChampion(regionName, championName);
        }
    };

    const value = {
        champions,
        bannedChampions,
        loading,
        banChampion,
        unbanChampion,
        toggleBanChampion, // ← Nueva función útil
        resetBans,
        isChampionBannedInRegion,
        getChampionsByRegion
    };

    return (
        <ChampionsContext.Provider value={value}>
            {children}
        </ChampionsContext.Provider>
    );
}

export function useChampionsContext() {
    const context = useContext(ChampionsContext);
    if (!context) {
        throw new Error('useChampionsContext debe usarse dentro de ChampionsProvider');
    }
    return context;
}