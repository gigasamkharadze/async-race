import Winner from '../interfaces/cars/winner.ts';

async function getWinner(id: number): Promise<Winner> {
  const response = await fetch(`http://127.0.0.1:3000/winners?id=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export default getWinner;
