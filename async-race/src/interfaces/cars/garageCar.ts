import React from 'react';

interface GarageCar {
    name: string;
    winner: number;
    setWinner: React.Dispatch<React.SetStateAction<number>>;
    color: string;
    id: number;
    setSelectedCar: React.Dispatch<React.SetStateAction<number>>;
  }

export default GarageCar;
