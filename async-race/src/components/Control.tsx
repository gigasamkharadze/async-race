import React from 'react';

function Control() {
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
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input type="color" />
        <button
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          CREATE
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          className="border-2 border-buff rounded-sm p-2"
          type="text"
          placeholder="TYPE CAR BRAND"
        />
        <input type="color" />
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
