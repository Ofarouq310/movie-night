import { useState, useEffect } from 'react'
import Search from './components/Search';
import { hero, logo } from './assets/index'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useDebounce(() => setDebouncedSearchValue(searchValue), 500, [searchValue]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 30
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchTrendingMovies = async (query, page) => {
    setLoading(true);
    setErrorMessage('');

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setErrorMessage('Failed to fetch movies, please try again later');
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setErrorMessage(`No movies found for "${query}". Try another search.`);
        setMovies([]);
      } else {
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
      }

    } catch (err) {
      setErrorMessage('Network error, please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch whenever searchValue or page changes
  useEffect(() => {
    fetchTrendingMovies(debouncedSearchValue, page);
  }, [debouncedSearchValue, page]);

  useEffect(() => {
  setPage(1);
  setMovies([]);
  }, [debouncedSearchValue]);


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header className="header">
          <img src={logo} alt="hero logo" className='w-20 p-2 sm:mb-5' />
          <img src={hero} alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies </span>You'll Enjoy Without The Hassle</h1>

          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>

          {loading && page === 1 ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-800">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

          {/* ✅ bottom spinner for infinite scroll */}
          {loading && page > 1 && <Spinner />}
        </section>
      </div>
    </main>
  )
}
