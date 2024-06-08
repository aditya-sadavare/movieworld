import React from "react";

function Paging({ prev, next, page }) {
  return (
    <div className="bg-gray-800/30 p-1">
      <div className="flex justify-center items-center">
        <div onClick={prev}>
          <i className="fa fa-solid fa-arrow-left px-3 cursor-pointer"></i>
        </div>
        <div>{page}</div>
        <div onClick={next}>
          <i className="fa fa-solid fa-arrow-right px-3 cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Paging;
