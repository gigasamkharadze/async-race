import React, { useEffect, useState } from 'react';
import Car from './Car.tsx';
import Control from './Control.tsx';

import { useGarage } from '../context/CarContext.tsx';

import getTotalCars from '../api/getTotalCars.ts';

function Garage() {
  const { garage, goToNextPage, goToPrevPage } = useGarage();
  const [selectedCar, setSelectedCar] = useState<number>(0);
  const [winner, setWinner] = useState<number>(0);
  const [totalCars, setTotalCars] = useState<number>(0);

  async function updateTotalCars() {
    const total = await getTotalCars();
    setTotalCars(total);
  }

  useEffect(
    () => {
      updateTotalCars();
    },
    [garage],
  );

  return (
    <div className="garage relative border-r">
      <Control setWinner={setWinner} selectedCar={selectedCar} />

      <div className="text-white absolute right-0 top-1/2 rotate-90 text-3xl tracking-widest">
        finish
      </div>

      <div
        className="race-result hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-40 aspect-square rounded-md text-center  bg-white text-black z-10"
      >
        <div className="w-full h-full flex justify-center flex-col">
          <h2 className="text-3xl">Winner</h2>
          <p className="winner-car">{winner}</p>
        </div>
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
      <p className="text-white text-xl mt-2">
        Total cars:
        {totalCars}
      </p>
    </div>
  );
}

export default Garage;
