import { useEffect, useRef, useState } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovie} from "../../services/getMovies";
import { BASE_POSTER_URL } from "../../services/getMovies";
import s from "./MovieDetailsPage.module.css"
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const backLinkHref = useRef(location.state || "/");

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  const linkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        const movieById = await fetchMovie(movieId);
        setMovie(movieById);
      } catch (error) {
        setError(`Sorry, some mistake! ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById();
  }, [movieId]);

  if (!movie) {
    return <div>No movie details found</div>;
  }

  return (
    <>
      <h1 className={s.title}> Movie Details </h1>
      {isLoading && <div>Movie details is loading...</div>}
      {error && <div>Oops! Something went wrong</div>}
      <Link className={s.goBack} to={backLinkHref.current}>
        Go back
      </Link>
      <div className={s.content}>
        <img
          src={
            movie.poster_path
              ? `${BASE_POSTER_URL}${movie.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <div className={s.descrContainer}>
          <h2 className={s.movieTitle}>{movie.original_title}</h2>
          <h3 className={s.descrTitle}>Rating</h3>
          <p className={s.descrInfo}> {movie.vote_average}</p>
          <h3 className={s.descrTitle}>Overview</h3>
          <p className={s.descrInfo}>{movie.overview}</p>
        </div>
      </div>
      <h2 className={s.infoTitle}>Additional information </h2>
      <ul className={s.linkList}>
        <li>
          <NavLink to={`cast`} className={linkClass}>
            Movie Cast
          </NavLink>
        </li>
        <li>
          <NavLink to={`reviews`} className={linkClass}>
            Movie Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;