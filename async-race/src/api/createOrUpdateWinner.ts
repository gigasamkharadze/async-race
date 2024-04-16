function createOrUpdateWinner(id: number, distance: number, velocity: number) {
  fetch(`http://127.0.0.1:3000/winners?id=${id}`, {
    method: 'GET',
  }).then((response) => response.json())
    .then((data) => {
      const time = distance / (1000 * velocity);
      if (Object.keys(data).length === 0) {
        const wins = 1;
        fetch('http://127.0.0.1:3000/winners', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            wins,
            time,
          }),
        });
      } else {
        const wins = data[0].wins + 1;
        const minTime = Math.min(data[0].time, distance / (1000 * velocity));
        fetch(`http://127.0.0.1:3000/winners/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wins,
            time: minTime,
          }),
        });
      }
    });
}

export default createOrUpdateWinner;
