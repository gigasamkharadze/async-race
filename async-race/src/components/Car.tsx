import React, { useState } from 'react';
import { useGarage } from '../context/CarContext.tsx';

interface CarProps {
  name: string;
  color: string;
  id: number;
}

function Car({ name, color, id }: CarProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const { refetchGarage } = useGarage();

  return (
    <div className="parent-container w-full flex gap-3 items-center">
      <div className="flex flex-col text-white gap-1">
        <button
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
        >
          select
        </button>
        <button
          onClick={() => {
            fetch(`http://127.0.0.1:3000/garage/${id}`, {
              method: 'DELETE',
            }).then(() => refetchGarage());
          }}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
        >
          remove
        </button>
      </div>
      <div className="flex flex-col text-white gap-1">
        <button
          onClick={() => {
            setIsAnimated(true);
            setTimeout(() => setIsAnimated(false), 3000);
          }}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
        >
          A
        </button>
        <button
          onClick={() => setIsAnimated(false)}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
        >
          B
        </button>
      </div>
      <img
        src="racing-car.png"
        alt="racing car"
        className={`car ${isAnimated ? 'animated-object' : ''}`}
      />
      <p className="ml-48 text-white">{name}</p>
    </div>
  );
}

export default Car;
