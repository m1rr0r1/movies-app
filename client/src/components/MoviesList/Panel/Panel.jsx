import React, { useState } from "react";
import "./Panel.scss";

const Panel = () => {
  const genres = ["all", "documentary", "comedy", "horror", "crime"];
  const [activeGenre, setActiveGenre] = useState(0);

  const setGenre = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <>
      <ul className="movies__genres">
        {genres.map((genre, i) => (
          <li key={i} onClick={() => setGenre(i)}>
            {genre}
            <div
              className={activeGenre === i ? "genre active_genre" : "genre"}
            ></div>
          </li>
        ))}
      </ul>
      <div className="horizontal"></div>
    </>
  );
};

export default Panel;
