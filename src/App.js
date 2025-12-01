import React from 'react';
import { ChampionsProvider } from './contexts/championContext.jsx';
import SelectedFaction from './components/SelectedFaction';
import Header from './components/Header';

function App() {
    return (
        <ChampionsProvider>
            <div className="App">
                <Header />
                <SelectedFaction />
            </div>
        </ChampionsProvider>
    );
}

export default App;