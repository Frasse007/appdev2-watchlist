import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await getPopularMovies();
        setMovies(movieData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load movies. Please try again later. ');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const displayMovies = searchResults || movies;

  if (loading) {
    return (
      <main className='main-content'>
        <LoadingSpinner />
      </main>
    )
  }

  if (error) {
    return (
      <main className='main-content'>
        <ErrorMessage message={error} />
      </main>
    );
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Popular Movies</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;