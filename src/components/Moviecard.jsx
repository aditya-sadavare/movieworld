import ScrollAnimation from 'react-animate-on-scroll';
import { watchlistContext } from "./WatchlistContext";
import { useContext } from "react";

function Moviecard({
  movObj,
  posterPath,
  originalTitle,
  addWatchlist,
  removeWatchlist
}) {
  var watchlist=useContext(watchlistContext)

  function checkWatchlist(movObj) {
    return watchlist.some((movie) => movie.id == movObj.id);
  }
  

  var isInWatchlist = checkWatchlist(movObj);


  return (
    <ScrollAnimation animateIn="fadeIn">
    <div
      className="animate__backInDown h-[30vh] w-[18vh] m-[5px] md:h-[50vh] md:w-[35vh] md:m-2 bg-center bg-cover rounded-[10px] hover:cursor-pointer hover:scale-105 duration-300 flex items-end flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterPath})`,
      }}
    >
      {isInWatchlist ? (
        <div
          onClick={() => removeWatchlist(movObj)}
          className="flex justify-center items-center rounded-lg bg-gray-900/70 p-2 m-2"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => addWatchlist(movObj)}
          className="flex justify-center items-center rounded-lg bg-gray-900/70 p-2 m-2"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-[15px] bg-gray-900/70 w-full text-center rounded-[10px] p-1">
        {originalTitle}
      </div>
    </div>
    </ScrollAnimation>
  );
}

export default Moviecard;
