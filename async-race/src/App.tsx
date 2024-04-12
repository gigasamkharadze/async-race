import React, { useState } from 'react';

// import components
import Head from './components/Head.tsx';
import Control from './components/Control.tsx';
import Garage from './components/Garage.tsx';
import Winners from './components/Winners.tsx';
import { useGarage } from './context/CarContext.tsx';

function App() {
  const [view, setView] = useState('garage');
  const { garage, goToNextPage, goToPrevPage } = useGarage();
  const [selectedCar, setSelectedCar] = useState<number>(0);

  return (
    <div className="container mx-auto ">
      <Head
        setView={setView}
      />
      {
        view === 'garage'
          ? (
            <div>
              <Control
                selectedCar={selectedCar}
              />
              <Garage
                garage={garage}
                goToNextPage={goToNextPage}
                goToPrevPage={goToPrevPage}
                setSelectedCar={setSelectedCar}
              />
            </div>
          )
          : <Winners />
      }
    </div>
  );
}

export default App;
