import React from 'react';
import Car from './Car.tsx';

interface ICar {
  name: string;
  color: string;
  id: number;
}

interface Props {
  garage: ICar[];
}

function Garage({ garage }: Props) {
  return (
    <div className="garage">
      {garage.map((car) => (
        <Car
          key={car.id}
          name={car.name}
          color={car.color}
          id={car.id}
        />
      ))}
    </div>
  );
}

export default Garage;
