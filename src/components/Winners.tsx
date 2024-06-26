import React, { useState, useEffect } from 'react';

// import components
import Winner from '../interfaces/cars/winner.ts';

// import constants
import limit from '../constants/page.ts';

// import utils
import getWinners from '../api/getWinners.ts';
import getTotalWinners from '../api/getTotalWinners.ts';

function Winners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWinners, setTotalWinners] = useState(0);

  async function updateTotalWinners() {
    const total = await getTotalWinners();
    setTotalWinners(total);
  }

  useEffect(() => {
    getWinners(currentPage).then((data) => {
      setWinners(data);
      updateTotalWinners();
    });
  }, [currentPage]);

  function handlePrevPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextPage() {
    if (winners.length < limit) return;
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <h1 className="text-white text-5xl mb-4">Winners</h1>
      <div className="grid grid-cols-5 ">
        <div className="p-4 text-white border">Car</div>
        <div className="p-4 text-white border">Wins</div>
        <div className="p-4 text-white border">Best time</div>
        <div className="p-4 text-white border">Color</div>
        <div className="p-4 text-white border">Name</div>
      </div>
      {winners.map((winner) => (
        <div key={winner.id} className="grid grid-cols-5">
          <div className="p-4 text-white border">{winner.id}</div>
          <div className="p-4 text-white border">{winner.wins}</div>
          <div className="p-4 text-white border">{winner.time}</div>
          <div className="p-4 text-white border">{winner.car.color}</div>
          <div className="p-4 text-white border">{winner.car.name}</div>
        </div>
      ))}
      <div className="w-full flex gap-2 mt-2">
        <button
          onClick={handlePrevPage}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Prev Page
        </button>
        <button
          onClick={handleNextPage}
          className="bg-white rounded-sm p-2 hover:bg-gray-100"
          type="button"
        >
          Next Page
        </button>
      </div>
      <div className="text-white text-xl mt-2">
        Total winners:
        {totalWinners}
      </div>
    </div>
  );
}

export default Winners;
