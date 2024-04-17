import React, { useState } from 'react';

// import hooks
import { useGarage } from '../context/CarContext.tsx';

// import icons
import CarIcon from '../Icons/CarIcon.tsx';

// import interfaces
import GarageCar from '../interfaces/cars/garageCar.ts';

// import utils
import removeCar from '../api/removeCar.ts';
import createOrUpdateWinner from '../api/createOrUpdateWinner.ts';
import tryDrive from '../api/tryDrive.ts';

function Car({
  name, winner, setWinner, color, id, setSelectedCar,
}: GarageCar) {
  const { refetchGarage } = useGarage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);

  function startAnimation(travelDistance: number, carVelocity: number) {
    const car = document.getElementById(`car${id}`);
    if (!car) return;
    const animationDuration = travelDistance / (1000 * carVelocity);
    car.style.setProperty('animation-duration', `${animationDuration}s`);
    setIsAnimating(true);
  }

  function showResult() {
    const result = document.querySelector('.race-result');
    if (!result) return;
    result.classList.remove('hidden');
    setTimeout(
      () => {
        result.classList.add('hidden');
      },
      3000,
    );
  }

  function handleFinish() {
    setIsAnimating(false);
    if (winner === 0) {
      setWinner(id);
      createOrUpdateWinner(id, distance, velocity);
      showResult();
    }
  }

  return (
    <div className="parent-container w-full flex gap-3 items-center">
      <div className="flex flex-col text-white gap-1">
        <button
          onClick={() => setSelectedCar(id)}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-300 text-black"
        >
          select
        </button>
        <button
          onClick={() => removeCar(id, refetchGarage)}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-300 text-black"
        >
          remove
        </button>
      </div>
      <div className="flex flex-col text-white gap-1">
        <button
          id={`start${id}`}
          onClick={() => tryDrive(id, setDistance, setVelocity, startAnimation, setIsAnimating)}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-300 text-black"
          disabled={isAnimating}
        >
          A
        </button>
        <button
          id={`reset${id}`}
          onClick={() => setIsAnimating(false)}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-300 text-black"
          disabled={!isAnimating}
        >
          B
        </button>
      </div>
      <div
        id={`car${id}`}
        onAnimationEnd={() => {
          handleFinish();
        }}
        className={`car ${isAnimating ? 'animate' : ''}`}
      >
        <CarIcon
          name="racing-car"
          width={100}
          height={100}
          fill={color}
        />
      </div>
      <p className="ml-48 text-white">{name}</p>
    </div>
  );
}

export default Car;
