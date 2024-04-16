import Car from './car.ts';

interface CarWithId extends Car {
    id: number;
}

export default CarWithId;
