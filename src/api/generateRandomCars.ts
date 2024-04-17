import carBrands from '../constants/cars.ts';
import carModels from '../constants/models.ts';

function generateRandomCars(
  refetchGarage: () => void,
) {
  for (let i = 0; i < 100; i += 1) {
    const randomCarBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
    const modelIndex = Math.floor(Math.random() * carModels[randomCarBrand].length);
    const model = carModels[randomCarBrand][modelIndex];
    const carName = `${randomCarBrand} ${model}`;
    const randomCarColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    fetch('http://127.0.0.1:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: carName,
        color: randomCarColor,
      }),
    }).then(() => refetchGarage());
  }
}

export default generateRandomCars;
