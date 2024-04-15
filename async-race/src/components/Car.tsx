import React, { useState } from 'react';
import { useGarage } from '../context/CarContext.tsx';

import CarIcon from './CarIcon.tsx';

interface CarProps {
  name: string;
  winner: number;
  setWinner: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  id: number;
  setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
}

function Car({
  name, winner, setWinner, color, id, setSelectedCar,
}: CarProps) {
  const { refetchGarage } = useGarage();
  const [status, setStatus] = useState('stopped');
  const [isAnimating, setIsAnimating] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);

  function startAnimation(velocity: number, distance: number) {
    const car = document.getElementById(`car${id}`);
    if (!car) return;
    car.style.setProperty('animation-duration', `${distance / (1000 * velocity)}s`);
    setIsAnimating(true);
  }

  function stopAnimation() {
    setStatus('stopped');
    setIsAnimating(false);
  }

  function handleStop() {
    setStatus('stopped');
    setIsAnimating(false);
    stopAnimation();
  }

  function handleStart() {
    fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus('started');
        startAnimation(data.velocity, data.distance);
        setDistance(data.distance);
        setVelocity(data.velocity);
        fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
          method: 'PATCH',
        }).then((response) => {
          if (response.status !== 200) {
            setStatus('stopped');
            handleStop();
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
          fetch(`http://127.0.0.1:3000/winners/${carId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wins,
              time,
            }),
          });
        }
      });
  }

  function handleFinish() {
    stopAnimation();
    if (winner === 0) {
      setWinner(id);
      createWinner(id);
    } else handleStop();
    setStatus('finished');
  }

  return (
    <div className="parent-container w-full flex gap-3 items-center">
      <div className="flex flex-col text-white gap-1">
        <button
          onClick={() => setSelectedCar(id)}
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
          id={`start${id}`}
          onClick={handleStart}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
          disabled={isAnimating}
        >
          A
        </button>
        <button
          id={`reset${id}`}
          onClick={handleStop}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
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
