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
}) => {
  const LIMIT = 6;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/movies?limit=" + LIMIT,
        );

        if (response.ok) {
          const data = await response.json();
          //   console.log(data);
          setMovies(data.data);
          setTotalAmount(data.totalAmount);
        } else {
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="movies">
      <div className="container">
        <Panel setMovies={setMovies} />

        <div className="movies__totalAmount">
          <span>{totalAmount}</span> movies found
        </div>
        <div className="movies__wrapper">
          {movies.map((movie, i) => (
            <MovieTile
              setActiveModal={setActiveModal}
              role={role}
              movie={movie}
            />
          ))}
        </div>
        <div className="movies__pages"></div>
      </div>
    </section>
  );
};

export default MoviesList;
