import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist'
import './App.css';
import { searchMovies } from './services/movieService';
import { WatchListProvider } from './contexts/MovieContext';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  return (
    <WatchListProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch}/>
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </WatchListProvider>
  );
};

export default App;