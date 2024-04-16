import React, { useState } from 'react';

// import hooks
import { useGarage } from '../context/CarContext.tsx';

// import components
import carBrands from '../constants/cars.ts';

// import interfaces
import GarageProps from '../interfaces/control/garageControl.ts';

function Control({ selectedCar, setWinner } : GarageProps) {
  const [carBrandNew, setCarBrandNew] = useState('');
  const [carColorNew, setCarColorNew] = useState('#000000');
  const [carBrandUpdate, setCarBrandUpdate] = useState('');
  const [carColorUpdate, setCarColorUpdate] = useState('#000000');
  const { refetchGarage, garage } = useGarage();

  function updateCar() {
    if (selectedCar === 0) return;
    if (!garage.some((car) => car.id === selectedCar)) return;
    fetch(`http://127.0.0.1:3000/garage/${selectedCar}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: carBrandUpdate,
        color: carColorUpdate,
      }),
    })
      .then(() => refetchGarage());
  }

  function createCar() {
    fetch('http://127.0.0.1:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: carBrandNew,
        color: carColorNew,
      }),
    })
      .then(() => refetchGarage());
  }

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

  function generateCars() {
    for (let i = 0; i < 5; i += 1) {
      const randomCarBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
      const randomCarColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: randomCarBrand,
          color: randomCarColor,
        }),
      }).then(() => refetchGarage());
    }
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
          onClick={createCar}
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
          onClick={updateCar}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          UPDATE
        </button>
      </div>
      <div>
        <button
          onClick={generateCars}
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
