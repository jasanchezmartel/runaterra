import { useAppContext } from '../../contexts/appContext.jsx';
import './Rules.css';

function Rules() {
    const { areRulesVisible } = useAppContext();
    
    console.log('Rules - areRulesVisible:', areRulesVisible);

    if (!areRulesVisible) return null;
    
    console.log('Rules - Renderizando componente');

    if (!areRulesVisible) return null;

    return (
        <div className="rules-overlay">
            <div className="rules-content">
                <div className="paragraph-container" id="paragraph-container">
                <p className="paragraph-p">Se recomienda tener todos los campeones y el máximo de jugadores en una personalizada para evitar dolores de cabeza y obtener una experiencia de juego fructífera tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p>
                <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, dicho juego consta de dos equipos que obtienen su región (y por consecuente sus campeones) del universo de League of Legends de manera aleatoria por la página y que ésta misma aporte la posibilidad de banear manualmente los campeones que salgan seleccionados, hay que hacer esto en cada tirada de azar. Cualquier fallo o error me lo comunican.</p>
                <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos dignos de mains y OTPs en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p>
                <p className="paragraph-p">1º En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se vuelve a aleatorizar tirada de región.</p>
                <p className="paragraph-p">2º En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador que le falte campeones es el que hace la selección.</p>
                <p className="paragraph-p">El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso te vas a rankear a diamante.</p>
            </div>
            </div>
        </div>
    );
}

export default Rules;