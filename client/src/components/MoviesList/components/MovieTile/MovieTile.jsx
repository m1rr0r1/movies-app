import React from "react";
import "./MovieTile.scss";

const MovieTile = ({ movie: { poster_path, title, genres, release_date } }) => {
  return (
    <div className="movie_card">
      <img className="movie_card__image" src={poster_path} alt="movie_card" />
      <div className="movie_card__info">
        <h3 className="movie_card__info__title">{title}</h3>
        <div className="movie_card__info__release_date">
          {release_date.slice(0, 4)}
        </div>
      </div>
      <ul className="movie_card__genres">
        {genres.map((genre, i) => (
          <li key={i}>{i === genres.length - 1 ? genre : genre + ","}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieTile;
