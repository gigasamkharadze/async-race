import React, { useState } from 'react';

// import hooks
import { useGarage } from '../context/CarContext.tsx';

// import icons
import CarIcon from '../Icons/CarIcon.tsx';

// import interfaces
import GarageCar from '../interfaces/cars/garageCar.ts';

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
    car.style.setProperty('animation-duration', `${travelDistance / (1000 * carVelocity)}s`);
    setIsAnimating(true);
  }

  function handleStart() {
    fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        setDistance(data.distance);
        setVelocity(data.velocity);
        startAnimation(data.distance, data.velocity);
        fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
          method: 'PATCH',
        }).then((response) => {
          if (response.status !== 200) {
            setIsAnimating(false);
          }
        });
      });
  }

  function createWinner(carId: number) {
    fetch(`http://127.0.0.1:3000/winners?id=${carId}`, {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        const time = distance / (1000 * velocity);
        if (Object.keys(data).length === 0) {
          const wins = 1;
          fetch('http://127.0.0.1:3000/winners', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: carId,
              wins,
              time,
            }),
          });
        } else {
          const wins = data[0].wins + 1;
          const minTime = Math.min(data[0].time, distance / (1000 * velocity));
          fetch(`http://127.0.0.1:3000/winners/${carId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wins,
              time: minTime,
            }),
          });
        }
      });
  }

  function handleFinish() {
    setIsAnimating(false);
    if (winner === 0) {
      setWinner(id);
      createWinner(id);
    }
  }

  function removeCar() {
    fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: 'DELETE',
    }).then(() => refetchGarage());
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
          onClick={removeCar}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-300 text-black"
        >
          remove
        </button>
      </div>
      <div className="flex flex-col text-white gap-1">
        <button
          id={`start${id}`}
          onClick={handleStart}
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
