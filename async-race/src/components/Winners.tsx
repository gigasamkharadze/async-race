import React, { useState, useEffect } from 'react';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

function Winners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [winnersPage, setWinnersPage] = useState(1);
  const limit = 7;

  useEffect(
    () => {
      fetch(`http://127.0.0.1:3000/winners?_page=${winnersPage}&_limit=${limit}`)
        .then((response) => response.json())
        .then((data) => {
          setWinners(data);
        });
    },
    [winnersPage],
  );

  return (
    <div>
      <h1 className="text-white text-5xl mb-4">Winners</h1>
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 text-white border-y">Car</div>
        <div className="p-4 text-white border-y">Wins</div>
        <div className="p-4 text-white border-y">Best time</div>
        <div className="p-4 text-white border-y">Color</div>
        <div className="p-4 text-white border-y">Name</div>
      </div>
      {winners.map((winner) => (
        <div key={winner.id} className="grid grid-cols-5 gap-4">
          <div className="p-4 text-white border-y">{winner.id}</div>
          <div className="p-4 text-white border-y">{winner.wins}</div>
          <div className="p-4 text-white border-y">{winner.time}</div>
          <div className="p-4 text-white border-y">Color</div>
          <div className="p-4 text-white border-y">Name</div>
        </div>
      ))}
    </div>
  );
}

export default Winners;
