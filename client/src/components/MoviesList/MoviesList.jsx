import React, { useEffect, useState } from "react";
import Panel from "./Panel/Panel";
import MovieTile from "./components/MovieTile/MovieTile";
import "./MoviesList.scss";

const MoviesList = ({
  query,
  movies,
  setMovies,
  totalAmount,
  setTotalAmount,
  role,
  setActiveModal,
  setCurrentMovie,
  setHideHeader,
  setHideProfile,
}) => {
  return (
    <section className="movies">
      <div className="container">
        <Panel setMovies={setMovies} />

        <div className="movies__totalAmount">
          <span>{totalAmount}</span> movies found
        </div>
        <div className="movies__wrapper">
          {movies.map((movie) => (
            <MovieTile
              key={movie.id}
              setActiveModal={setActiveModal}
              role={role}
              movie={movie}
              setCurrentMovie={setCurrentMovie}
              setHideHeader={setHideHeader}
              setHideProfile={setHideProfile}
            />
          ))}
        </div>
        <div className="movies__pages"></div>
      </div>
    </section>
  );
};

export default MoviesList;
