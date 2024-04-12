import React from 'react';
import Car from './Car.tsx';

interface ICar {
  name: string;
  color: string;
  id: number;
}

interface Props {
  garage: ICar[],
  goToNextPage: () => void,
  goToPrevPage: () => void,
  setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
}

function Garage({
  garage, goToNextPage, goToPrevPage, setSelectedCar,
}: Props) {
  return (
    <div className="garage">
      {garage.map((car) => (
        <Car
          key={car.id}
          name={car.name}
          color={car.color}
          setSelectedCar={setSelectedCar}
          id={car.id}
        />
      ))}
      <div className="w-full flex gap-2">
        <button
          onClick={() => {
            goToPrevPage();
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            goToNextPage();
          }}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Garage;
