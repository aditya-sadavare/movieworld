import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { watchlistContext } from "./components/WatchlistContext";

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
      <watchlistContext.Provider value={watchlist}>
        <SpeedInsights />
        <Analytics />
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
                  />
                </>
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </watchlistContext.Provider>
    </div>
  );
}

export default App;
