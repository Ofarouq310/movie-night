import { useState, useEffect } from 'react'
import Search from './components/Search';
import {hero, logo} from './assets/index'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

export default function App() {

  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


  const fetchTrendingMovies = async () => {
    setLoading(true);
    setErrorMessage('');

    const response = await fetch(`${API_BASE_URL}/movie/now_playing`, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      setErrorMessage('Failed to fetch movies, please try again later');
      setLoading(false);
      return;
    }

    const data = await response.json();
    setMovies(data.results);
    setLoading(false);
};

useEffect(() => {
  fetchTrendingMovies();
}, []);


  return (
    <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="header">
            <img src={logo} alt="hero logo" className='w-20 p-2 sm:mb-5' />
            <img src={hero} alt="hero banner" />
            <h1 className="">Find <span className="text-gradient">Movies </span>You'll Enjoy Without The Hassle</h1>
          
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          </header>

          <section className='all-movies'>

          <h2>All Movies</h2>

          {loading ?
           <Spinner />
          :
          errorMessage ?
          <p className="text-red-800">{errorMessage}</p>
          :
            <ul>
              {movies.map((movie)=>{
                return <MovieCard key={movie.id} movie={movie} />
              })}
            </ul>
         } 
        </section>

        </div>
    </main>
  )
}
