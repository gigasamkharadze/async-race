import React, { useState } from 'react';

// import hooks
import { useGarage } from '../context/CarContext.tsx';

// import interfaces
import GarageProps from '../interfaces/control/garageControl.ts';
import createCar from '../api/createCar.ts';
import updateCar from '../api/updateCar.ts';
import generateRandomCars from '../api/generateRandomCars.ts';

function Control({ selectedCar, setWinner } : GarageProps) {
  const [carBrandNew, setCarBrandNew] = useState('');
  const [carColorNew, setCarColorNew] = useState('#000000');
  const [carBrandUpdate, setCarBrandUpdate] = useState('');
  const [carColorUpdate, setCarColorUpdate] = useState('#000000');
  const { refetchGarage, garage } = useGarage();

  function startRace() {
    setWinner(0);
    const ids = garage.map((car) => car.id);
    ids.forEach((id) => {
      const button = document.getElementById(`start${id}`);
      if (button) button.click();
    });
  }

  function reset() {
    const ids = garage.map((car) => car.id);
    ids.forEach((id) => {
      const button = document.getElementById(`reset${id}`);
      if (button) button.click();
    });
  }

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startRace}
          type="button"
          className="w-20 flex gap-2 py-2 px-1 bg-white rounded-sm hover:bg-gray-100"
        >
          RACE
          <img src="start.png" alt="start" className="w-5" />
        </button>

        <button
          onClick={reset}
          type="button"
          className="w-24 flex gap-2 py-2 px-1 bg-white rounded-sm hover:bg-gray-100"
        >
          RESET
          <img src="restart.png" alt="restart" className="w-5" />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          onChange={(e) => setCarBrandNew(e.target.value)}
          value={carBrandNew}
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input
          onChange={(e) => setCarColorNew(e.target.value)}
          value={carColorNew}
          type="color"
        />
        <button
          onClick={() => createCar(carBrandNew, carColorNew, refetchGarage)}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          CREATE
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          onChange={(e) => setCarBrandUpdate(e.target.value)}
          value={carBrandUpdate}
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input
          onChange={(e) => setCarColorUpdate(e.target.value)}
          value={carColorUpdate}
          type="color"
        />
        <button
          onClick={() => {
            updateCar(
              selectedCar,
              carBrandUpdate,
              carColorUpdate,
              garage,
              refetchGarage,
            );
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          UPDATE
        </button>
      </div>
      <div>
        <button
          onClick={() => generateRandomCars(refetchGarage)}
          type="button"
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
        >
          GENERATE CARS
        </button>
      </div>
    </div>
  );
}

export default Control;
