function createCar(
  name: string,
  color: string,
  refetchGarage: () => void,
) {
  fetch('http://127.0.0.1:3000/garage', {
    method: 'POST',
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

export default createCar;
