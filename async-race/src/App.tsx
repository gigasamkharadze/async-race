import React, { useState } from 'react';

// import components
import Head from './components/Head.tsx';
import Control from './components/Control.tsx';
import Garage from './components/Garage.tsx';
import Winners from './components/Winners.tsx';
import { useGarage } from './context/CarContext.tsx';

function App() {
  const [view, setView] = useState('garage');
  const { garage } = useGarage();

  return (
    <div className="container mx-auto ">
      <Head
        setView={setView}
      />
      {view === 'garage' && <Control />}
      {
        view === 'garage'
          ? (
            <Garage
              garage={garage}
            />
          )
          : <Winners />
      }
    </div>
  );
}

export default App;
