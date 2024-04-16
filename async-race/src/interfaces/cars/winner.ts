import Car from './car.ts';

interface Winner {
    id: number;
    wins: number;
    time: number;
    car: Car;
  }

export default Winner;
