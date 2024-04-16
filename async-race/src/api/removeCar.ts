function removeCar(id: number, refetchGarage: () => void): void {
  fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: 'DELETE',
  }).then(() => refetchGarage());
}

export default removeCar;
