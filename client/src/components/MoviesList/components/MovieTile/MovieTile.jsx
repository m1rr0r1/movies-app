import React, { useState } from "react";
import "./MovieTile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const MovieTile = ({
  role,
  movie: { poster_path, title, genres, release_date },
  setActiveModal,
}) => {
  const [activeSettings, setActiveSettings] = useState(false);

  const toggleSettings = () => {
    setActiveSettings((activeSettings) => !activeSettings);
  };

  const openModal = () => {
    setActiveModal(true);
    setActiveSettings(false);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="movie_card">
      {role === "admin" && (
        <>
          <div onClick={toggleSettings} className="admin_settings">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div
            className={
              activeSettings ? "settings_menu active" : "settings_menu"
            }
          >
            <ul>
              <li>edit</li>
              <li onClick={openModal}>delete</li>
            </ul>
          </div>
        </>
      )}
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
