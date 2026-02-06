import React, { useState } from "react";
import "./Panel.scss";

const Panel = ({ setMovies }) => {
  const genres = ["", "documentary", "comedy", "horror", "crime"];
  const [activeGenre, setActiveGenre] = useState("");
  const [sortBy, setSortBy] = useState("DATE");

  const setGenre = async (genre) => {
    setActiveGenre(genre);

    try {
      const response = await fetch(
        "http://localhost:4000/movies?limit=6&filter=" + genre,
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMovies(data.data);
        setTotalAmount(data.data.length);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSortBy = () => {
    if (sortBy === "DATE") setSortBy("TITLE");
    else setSortBy("DATE");
  };

  return (
    <>
      <div className="sort">
        <ul className="movies__genres">
          {genres.map((genre, i) => (
            <li key={i} onClick={() => setGenre(genre)}>
              {genre ? genre : "all"}
              <div
                className={
                  activeGenre === genre ? "genre active_genre" : "genre"
                }
              ></div>
            </li>
          ))}
        </ul>
        <div onClick={toggleSortBy} className="sort_by">
          Sort by {sortBy}
        </div>
      </div>

      <div className="horizontal"></div>
    </>
  );
};

export default Panel;
