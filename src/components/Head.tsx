import React from 'react';

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

function Head({ setView }: Props) {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col justify-center gap-4">
          <button
            onClick={() => setView('garage')}
            type="button"
            className="text-buff border-2 border-buff rounded-md p-3 hover:border-gray-300 hover:text-gray-300"
          >
            GARAGE
          </button>
          <button
            onClick={() => setView('winners')}
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
