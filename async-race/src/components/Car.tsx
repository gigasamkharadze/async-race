import React from "react";

function Car() {
  return (
    <div className="parent-container w-full flex gap-3 items-center">
        <div className="flex flex-col text-white gap-1">
            <button type="button" className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black">select</button>
            <button type="button" className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black">remove</button>
        </div>
        <div className="flex flex-col text-white gap-1">
            <button type="button" className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black">A</button>
            <button type="button" className="bg-white rounded-sm p-1 hover:bg-gray-100 text-black">B</button>
        </div>
        <img src="racing-car.png" alt="racing car" className="animated-object" />
    </div>
  );
}

export default Car;
