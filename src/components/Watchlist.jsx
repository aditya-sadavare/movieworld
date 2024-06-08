import React, { useEffect, useState } from "react";
import genreIds from "../utility/genre";

function Watchlist({ watchlist, setWatchlist }) {
  var [search, setSearch] = useState("");
  const [genres, setGenres] = useState(["All Genres"]);
  const [currGenres, setCurrGenres] = useState(["All Genres"]);

  function deleteWatchList(e) {
    setWatchlist(
      watchlist.filter((movObj) => {
        return movObj.original_title != e.target.value;
      })
    );
  }
  useEffect(() => {
    let tempGenres = watchlist.flatMap((movObj) =>
      createGenre(movObj).split(" | ")
    );
    const unique = [...new Set(tempGenres)].filter(
      (genre) => genre.trim() != ""
    );
    setGenres(["All Genres", ...unique]);
  }, [watchlist]);

  function createGenre(movObj) {
    let genres = "";
    for (let index = 0; index < movObj.genre_ids.length; index++) {
      genres += genreIds[movObj.genre_ids[index]] + " | ";
    }
    return genres;
  }

  function sortAsc() {
    var sortedWatchlist = [...watchlist].sort(
      (movA, movB) => movA.vote_average - movB.vote_average
    );
    setWatchlist(sortedWatchlist);
  }

  function sortDesc() {
    var sortedWatchlist = [...watchlist].sort(
      (movA, movB) => movB.vote_average - movA.vote_average
    );
    setWatchlist(sortedWatchlist);
  }

  return (
    <>
      <div className="flex justify-center flex-wrap my-5">
        {genres.map((genre, index) => (
          <div
            onClick={(e) => setCurrGenres(genre)}
            key={index}
            className={
              currGenres == genre
                ? "bg-blue-400 p-3 rounded text-white m-2"
                : "bg-gray-400 p-3 rounded text-white m-2"
            }
          >
            {genre}
          </div>
        ))}
      </div>

      <div
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="flex justify-center my-6"
      >
        <input
          type="text"
          placeholder="Search Movies"
          className="h-12 w-64 bg-gray-300 rounded outline-none px-2"
        />
      </div>

      <div className="overflow-x-auto rounded border border-gray-400 md:m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-8">
            <tr>
              <th className="px-[80px] py-2">Name</th>
              <th className="flex justify-center px-4 py-2">
                <div className="px-2" onClick={sortAsc}>
                  <i className="fa fa-solid fa-arrow-up"></i>
                </div>
                <div>Ratings</div>
                <div className="px-2" onClick={sortDesc}>
                  <i className="fa fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th className="px-4 py-2">Popularity</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {watchlist
              .filter((movObj) => {
                if (currGenres == "All Genres") {
                  return true;
                } else {
                  return movObj.genre_ids.some(
                    (genreId) => genreIds[genreId] == currGenres
                  );
                }
              })
              .filter((movObj) => {
                return movObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => (
                <tr key={movieObj.id} className="border-b-4">
                  <td className="flex  items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.original_title}
                      className="h-[15vh] w-[10vh] md:h-[20vh] md:w-[15vh] m-2 bg-center bg-cover rounded-[10px]"
                    />
                    <div className="flex-grow">
                      {movieObj.original_title}
                    </div>
                  </td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>
                  <td>{createGenre(movieObj)}</td>
                  <td>
                    <button
                      className="text-red-800 font-bold"
                      value={movieObj.original_title}
                      onClick={(e) => deleteWatchList(e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
