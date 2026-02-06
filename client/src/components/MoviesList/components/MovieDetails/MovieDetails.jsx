import React, { useEffect } from "react";
import "./MovieDetails.scss";
import { useNavigate, useParams } from "react-router";

const MovieDetails = ({ movies, setActiveModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie.id === parseInt(id));

  useEffect(() => {
    if (!movie) {
      navigate("/movies/", { replace: true });
    }
  }, []);

  const goBack = () => {
    navigate("/movies", { replace: true });
  };

  const deleteMovie = () => {
    setActiveModal(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    // setCurrentMovie(movie);
  };

  return (
    <div className="movie_details">
      <div className="container">
        <div className="first_wrapper">
          <button className="first_wrapper__return" onClick={goBack}>
            go back
          </button>
          <img src={movie?.poster_path} alt="poster" />
        </div>
        <div className="second_wrapper">
          <div className="block">
            <h2 className="block__title">{movie?.title}</h2>
            <div className="block__rating">{movie?.vote_average}</div>
          </div>

          <ul>
            {movie?.genres.map((genre, i) => (
              <li key={i}>
                {i === movie.genres.length - 1 ? genre : genre + ","}
              </li>
            ))}
          </ul>
          <span className="second_wrapper__date">
            {movie?.release_date.slice(0, 4)}
          </span>
          <span className="second_wrapper__duration">
            {(movie?.runtime / 60).toFixed(2)[0]}h
            {" " + (movie?.runtime / 60).toFixed(2)[2]}
            {(movie?.runtime / 60).toFixed(2)[3]}min
          </span>
          <p className="second_wrapper__description">{movie?.overview}</p>
          <div className="buttons">
            <button onClick={deleteMovie} className="buttons__delete">
              delete
            </button>
            <button className="buttons__edit">edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
