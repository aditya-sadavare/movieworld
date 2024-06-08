import React, { useEffect, useState } from "react";

function Banner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length == 0) {
    return <div>Loading...</div>;
  }

  const currentMovie = movies[currentIndex];

  return (
    <>
      <div
        className="h-[20vh] md:h-[80vh] bg-cover bg-center flex items-end transition-all duration-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`,
        }}
      >
        <div className=" text-[10px] text-white md:text-[30px] bg-gray-900/70 w-full text-center p-2">
          {currentMovie.title}
          <div className="text-[10px] md:text-[20px]">
            Release Date <br />
            {currentMovie.release_date}
          </div>
          <div className="hidden md:block md:text-[10px]">
            {currentMovie.overview}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
