import React from 'react';

function tryDrive(
  id: number,
  setDistance: React.Dispatch<React.SetStateAction<number>>,
  setVelocity: React.Dispatch<React.SetStateAction<number>>,
  // eslint-disable-next-line no-unused-vars
  startAnimation: (distance: number, velocity: number) => void,
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
) {
  fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
    method: 'PATCH',
  })
    .then((response) => response.json())
    .then((data) => {
      setDistance(data.distance);
      setVelocity(data.velocity);
      startAnimation(data.distance, data.velocity);
      fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
        method: 'PATCH',
      }).then((response) => {
        if (response.status !== 200) {
          setIsAnimating(false);
        }
      });
    });
}

export default tryDrive;
