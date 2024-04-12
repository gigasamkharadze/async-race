import React from "react";
import Car from "./Car";

interface Car {
  name: string;
  color: string;
  id: number;
}

interface Props {
  garage: Car[];
}

const Garage = ({ garage }: Props) => {
  return (
    <div className="garage">
        {garage.map((car) => (
            <Car 
            key={car.id} 
            name={car.name} 
            color={car.color} 
            id={car.id} />
        ))}
    </div>
  );
};

export default Garage;
