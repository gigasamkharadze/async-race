import React, { useState } from 'react';

import Head from './components/Head.tsx';
import Garage from './components/Garage.tsx';
import Winners from './components/Winners.tsx';

function App() {
  const [view, setView] = useState('garage');

  return (
    <div className="container mx-auto ">
      <Head
        setView={setView}
      />
      {
        view === 'garage'
          ? <Garage />
          : <Winners />
      }
    </div>
  );
}

export default App;
