import React, { useState, useEffect } from 'react';

// import components
import Head from './components/Head.tsx';
import Control from './components/Control.tsx';
import Garage from './components/Garage.tsx';
import Winners from './components/Winners.tsx';

function App() {
  const [view, setView] = useState('garage');
  const [garage, setGarage] = useState([]);
  const [garagePage, setGaragePage] = useState(1);
  const limit = 7;

  useEffect(
    () => {
      fetch(`http://127.0.0.1:3000/garage?_page=${garagePage}&_limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
          setGarage(data);
        });
    },
    [garagePage],
  );

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
