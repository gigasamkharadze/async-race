import React, { useState, useRef } from 'react';
import { useGarage } from '../context/CarContext.tsx';

interface CarProps {
  name: string;
  color: string;
  id: number;
  setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
}

function Car({
  name, color, id, setSelectedCar,
}: CarProps) {
  const { refetchGarage } = useGarage();
  const [status, setStatus] = useState('stopped');
  const [isAnimating, setIsAnimating] = useState(false);
  const carRef = useRef<HTMLImageElement>(null);

  function startAnimation(velocity: number, distance: number) {
    carRef.current?.style.setProperty('--animation-duration', `${distance / velocity}s`);
    setIsAnimating(true);
  }

  function stopAnimation() {
    setIsAnimating(false);
  }

  function handleStop() {
    setStatus('stopped');
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
          onClick={handleStart}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
          disabled={isAnimating}
        >
          A
        </button>
        <button
          onClick={handleStop}
          type="button"
          className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black"
          disabled={!isAnimating}
        >
          B
        </button>
      </div>
      <img
        src="racing-car.svg"
        alt="racing car"
        className={`car ${isAnimating ? 'animate' : ''}`}
        ref={carRef}
        onAnimationEnd={() => {
          stopAnimation();
          setStatus('finished');
        }}
      />
      <p className="ml-48 text-white">{name}</p>
    </div>
  );
}

export default Car;
