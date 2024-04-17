async function getTotalCars() : Promise<number> {
  const total = await fetch('http://127.0.0.1:3000/garage')
    .then((res) => res.json())
    .then((data) => data.length);

  return total;
}

export default getTotalCars;
