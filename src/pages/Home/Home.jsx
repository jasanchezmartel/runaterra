import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DynamicFaction from '../../components/DynamicFaction/DynamicFaction.jsx';
import { useRegionViewMode } from '../../hooks/useRegionViewMode.js';
import SelectedFaction from '../../components/SelectedFaction/SelectedFaction.jsx';
import './Home.css';

function Home() {
    useRegionViewMode();

    return (
        <>
            <Header />

            <div className="paragraph-container" id="paragraph-container">
                <p className="paragraph-p">Se recomienda tener todos los campeones y el máximo de jugadores en una personalizada para evitar dolores de cabeza y obtener una experiencia de juego fructífera tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p><br></br>
                <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, dicho juego consta de dos equipos que obtienen su región (y por consecuente sus campeones) del universo de League of Legends de manera aleatoria por la página y que ésta misma aporte la posibilidad de banear manualmente los campeones que salgan seleccionados, hay que hacer esto en cada tirada de azar. Cualquier fallo o error me lo comunican.</p><br></br>
                <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos dignos de mains y OTPs en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p><br></br>
                <p className="paragraph-p">1º En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se vuelve a aleatorizar tirada de región.</p><br></br>
                <p className="paragraph-p">2º En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador que le falte campeones es el que hace la selección.</p><br></br>
                <p className="paragraph-p">El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso te vas a rankear a diamante.</p>
            </div>

            <div className="factions-main-container">
                <div className="first-faction-icons">
                    <DynamicFaction regionName="Aguas Estancadas" />
                    <DynamicFaction regionName="Ciudad de Bandle" />
                    <DynamicFaction regionName="Demacia" />
                    <DynamicFaction regionName="El Vacío" />
                    <DynamicFaction regionName="Freljord" />
                    <DynamicFaction regionName="Islas de la sombra" />
                    <DynamicFaction regionName="Ixtal" />
                </div>
                <div className="second-faction-icons">
                    <DynamicFaction regionName="Jonia" />
                    <DynamicFaction regionName="Noxus" />
                    <DynamicFaction regionName="Piltover" />
                    <DynamicFaction regionName="Runaterra" />
                    <DynamicFaction regionName="Shurima" />
                    <DynamicFaction regionName="Targon" />
                    <DynamicFaction regionName="Zaun" />
                </div>
            </div>

            <div className="display-faction-container" >
                <SelectedFaction />
            </div>

            <Footer />
        </>
    );
}

export default Home;