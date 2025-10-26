import { useAppContext } from '../../contexts/appContext.jsx';
import './Rules.css';

function Rules() {
    const { areRulesVisible } = useAppContext();

    // RENDERIZADO CONDICIONAL - Esto reemplaza las funciones de visibilidad
    if (!areRulesVisible) {
        return null;
    }

    return (
        <div className="rules-overlay">
            <div className="rules-content">
                <div className="paragraph-container" id="paragraph-container">
                    <p className="paragraph-p">Se puede usar esta página para jugar tanto normales como partidas personalizadas, se desglosará en 2 secciones:</p>
                    <p className="paragraph-p-title">Para jugar normales</p>
                    <p className="paragraph-p">Hacer click en el botón de seleccionar una región, una vez elegidos los campeones de la región que haya salido se banean manualmente, y así hasta donde queráis.</p>
                    <p className="paragraph-p-title">Para jugar personalizadas</p>
                    <p className="paragraph-p">Se recomienda tener todos los campeones y el máximo de jugadores (10) en una personalizada tanto para evitar dolores de cabeza y obtener una experiencia de juego fructífera a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las siguientes reglas que se detallarán a continuación. También comentar de que no hay límite de personas que pueda asistir al minijuego es decir, máximo serán 10 personas jugando las partidas y el resto se pueden quedar como espectadores, se admite intercambiar espectador/jugador en los 2 equipos.</p>
                    <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas dando igual el mapa y se establece la selección de campeones a ciegas para una mejor incertidumbre, dicho juego consta de dos equipos que obtienen su región haciendo click en el botón seleccionar 2 regiones (y por consecuente sus campeones) del universo de League of Legends, una vez que se hayan revelado los campeones que se están jugando en la partida se procede a banearlos en la página para que se ajuste a un mejor inventario de saber cuáles campeones se pueden usar y cuáles no.</p>
                    <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos dignos de mains y OTPs en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p>
                    <p className="paragraph-p">1º En el caso de que una región no tenga suficientes campeones para completar los huecos que faltan, se vuelve a aleatorizar tirada de región.</p>
                    <p className="paragraph-p">2º En el caso de que X número de jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador que le falte campeones es el que hace la selección.</p>
                    <p className="paragraph-p">La finalidad del minijuego realmente es jugar por diversión hasta donde queráis, si quieren jugar rollo al mejor de 5 o lo que sea está bien, la cosa es pasar buenos momentos y no tryhardear, no me seas un neandertal sin vida que para eso te vas a rankear a diamante.</p>
                </div>
            </div>
        </div>
    );
}

export default Rules;