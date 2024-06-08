import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {
  const [watchlist, setWatchlist] = useState([]);

  function addWatchlist(movObj) {
    let newWatchlist = [...watchlist, movObj];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  }

  function removeWatchlist(movObj) {
    let newWatchlist = watchlist.filter((movie) => {
      return movie.id !== movObj.id;
    });
    setWatchlist(newWatchlist);
  }

  useEffect(() => {
    if (!localStorage.getItem("watchlist")) return;
    else setWatchlist(JSON.parse(localStorage.getItem("watchlist")));
  }, []);
  return (
    <div>
      <SpeedInsights/>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home
                  addWatchlist={addWatchlist}
                  removeWatchlist={removeWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          ></Route>
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist}/>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
