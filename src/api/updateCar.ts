import CarWithId from '../interfaces/cars/carWithId.ts';

function updateCar(
  id: number,
  name: string,
  color: string,
  garage: CarWithId[],
  refetchGarage: () => void,
) {
  if (id === 0) return;
  if (!garage.some((car) => car.id === id)) return;
  fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  })
    .then(() => refetchGarage());
}

export default updateCar;
