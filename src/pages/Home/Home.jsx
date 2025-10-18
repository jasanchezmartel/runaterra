import DynamicFaction from '../../components/DynamicFaction/DynamicFaction.jsx';
import SelectedFaction from '../../components/SelectedFaction/SelectedFaction.jsx';
import './Home.css';

function Home() {

    return (
        <>
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
            <div className="display-faction-container">
                <SelectedFaction />
            </div>
        </>
    );
}

export default Home;