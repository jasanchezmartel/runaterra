import React from 'react';
import { ChampionsProvider } from '/contexts/ChampionsContext.js';
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