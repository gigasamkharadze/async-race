import React from 'react';
import Head from './components/Head.tsx';
import Control from './components/Control.tsx';
import Car from './components/Car.tsx';

function App() {
  return (
    <div className="container mx-auto ">
      <Head />
      <Control />
      <Car />
      <Car />
      <Car />
    </div>
  );
}

export default App;
