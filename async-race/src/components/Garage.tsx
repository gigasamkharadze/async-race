import React, { useState } from 'react';
import Car from './Car.tsx';
import Control from './Control.tsx';

import { useGarage } from '../context/CarContext.tsx';

function Garage() {
  const { garage, goToNextPage, goToPrevPage } = useGarage();
  const [selectedCar, setSelectedCar] = useState<number>(0);

  return (
    <div className="garage">
      <Control selectedCar={selectedCar} />
      {garage.map((car) => (
        <Car
          key={car.id}
          name={car.name}
          color={car.color}
          setSelectedCar={setSelectedCar}
          id={car.id}
        />
      ))}
      <div className="w-full flex gap-2">
        <button
          onClick={() => {
            goToPrevPage();
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            goToNextPage();
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Garage;
