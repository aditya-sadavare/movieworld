import React, { useEffect, useState } from "react";
import Moviecard from "./Moviecard";
import axios from "axios";
import Banner from "./Banner";
import Paging from "./Paging";

function Home({addWatchlist,removeWatchlist}) {
  const [movies, setMovies] = useState([]);
  
  const [page, setPage] = useState(1);
  
  function prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=14e445071641bd80d6fed536b3aa29e0&language=en-US&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [page]);

  return (
    <>
      <Banner movies={movies.slice(0, 5)} />
      <div className="p-6">
        <div className="text-center text-[20px] font-bold m-7 bg-blue-400/20">
          Trending Movies
        </div>
        <div className="flex flex-row flex-wrap justify-around">
          {movies.map((movObj) => (
            <Moviecard
              posterPath={movObj.poster_path}
              originalTitle={movObj.original_title}
              movObj={movObj}
              addWatchlist={addWatchlist}
              removeWatchlist={removeWatchlist}
              key={movObj.id}
            />
          ))}
        </div>
        <Paging prev={prev} next={next} page={page} />
      </div>
    </>
  );
}

export default Home;
