import { noPoster, star } from '../assets';

export default function MovieCard({movie:{poster_path, title, original_language, release_date, vote_average}}) {

  return (
    <div className="movie-card">

      <img src={poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : noPoster
        } 
        alt={title} 
      />

      <div className='mt-5'>
        <h3>{title}</h3>

        <div className='content'>
          <div className='rating'>
            <img src={star} alt="Star Icon" />
            <p>{vote_average.toFixed(1)}</p>
          </div>
            <span>•</span>
            <p className='lang'>{original_language}</p>
            <span>•</span>
            <p className='year'>{release_date.slice(0, 4)}</p>
        </div>
      </div>

    </div>
  )
}
