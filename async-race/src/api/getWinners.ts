import Car from '../interfaces/cars/car.ts';
import Winner from '../interfaces/cars/winner.ts';
import limit from '../constants/page.ts';

const getWinners = async (page: number) => {
  const response = await fetch(`http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}`);
  const winnersData = await response.json();
  const winnersWithCars = await Promise.all(
    winnersData.map(async (winner: Winner) => {
      const carResponse = await fetch(`http://127.0.0.1:3000/garage/${winner.id}`);
      const carData: Car = await carResponse.json();
      return { ...winner, car: carData };
    }),
  );
  return winnersWithCars;
};

export default getWinners;
