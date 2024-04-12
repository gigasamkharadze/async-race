import React from 'react';
import { useState } from 'react';

function Control() {

  const [car_brand_new, setCarBrandNew] = useState('');
  const [car_color_new, setCarColorNew] = useState('');
  const [car_brand_update, setCarBrandUpdate] = useState('');
  const [car_color_update, setCarColorUpdate] = useState('');

  console.log(car_brand_new, car_color_new, car_brand_update, car_color_update);

  return (
    <div className="flex justify-around items-center gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          className="w-20 flex gap-2 py-2 px-1 bg-white rounded-sm hover:bg-gray-100"
        >
          RACE
          <img src="start.png" alt="start" className="w-5" />
        </button>

        <button
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
          value={car_brand_new}
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input 
        onChange={(e) => setCarColorNew(e.target.value)}
        value={car_color_new}
        type="color" />
        <button
          onClick={() => {
            console.log('click');
            fetch('http://127.0.0.1:3000/garage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: car_brand_new,
                color: car_color_new,
              }),
            });
            
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          CREATE
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          onChange={(e) => setCarBrandUpdate(e.target.value)}
          value={car_brand_update}
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input 
        onChange={(e) => setCarColorUpdate(e.target.value)}
        value={car_color_update}
        type="color" />
        <button
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          UPDATE
        </button>
      </div>
      <div>
        <button
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
