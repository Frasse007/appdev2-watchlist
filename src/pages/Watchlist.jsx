import React from 'react';
import MovieGrid from '../components/MovieGrid';
import { useWatchList } from '../contexts/MovieContext';

function Watchlist() {
  const { watchList } = useWatchList();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Your saved watchlist collection</p>
      </div>
      {watchList.length > 0 ? (
        <MovieGrid movies={watchList} />
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;