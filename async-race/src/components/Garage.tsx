import React, { useState } from 'react';
import Car from './Car.tsx';
import Control from './Control.tsx';

import { useGarage } from '../context/CarContext.tsx';

function Garage() {
  const { garage, goToNextPage, goToPrevPage } = useGarage();
  const [selectedCar, setSelectedCar] = useState<number>(0);
  const [winner, setWinner] = useState<number>(0);

  return (
    <div className="garage relative border-r">
      <Control setWinner={setWinner} selectedCar={selectedCar} />

      <div className="text-white absolute right-0 top-1/2 rotate-90 text-3xl tracking-widest">
        finish
      </div>

      {garage.map((car) => (
        <Car
          key={car.id}
          name={car.name}
          winner={winner}
          setWinner={setWinner}
          color={car.color}
          setSelectedCar={setSelectedCar}
          id={car.id}
        />
      ))}
      <div className="w-full flex gap-2">
        <button
          onClick={() => goToPrevPage()}
          className="bg-white rounded-sm p-2 hover:bg-gray-300"
          type="button"
        >
          Prev Page
        </button>
        <button
          onClick={() => goToNextPage()}
          className="bg-white rounded-sm p-2 hover:bg-gray-300"
          type="button"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Garage;
