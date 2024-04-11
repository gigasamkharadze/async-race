import React from 'react';

function Head() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col justify-center gap-4">
          <button
            type="button"
            className="text-buff border-2 border-buff rounded-md p-3 hover:border-gray-300 hover:text-gray-300"
          >
            GARAGE
          </button>
          <button
            type="button"
            className="text-buff border-2 border-buff rounded-md p-3 hover:border-gray-300 hover:text-gray-300"
          >
            WINNERS
          </button>
        </div>
        <img src="car.png" alt="Car logo" />
      </div>
    </div>
  );
}

export default Head;
