import React, { act, useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate, Link, useParams } from "react-router";
import "./Header.scss";

const Header = ({
  auth = {},
  setAuth,
  hideHeader,
  setHideHeader,
  query,
  setQuery,
  setMovies,
  setTotalAmount,
  hideProfile,
  setHideProfile,
}) => {
  const [activeProfile, setActiveProfile] = useState(false);

  const navigate = useNavigate();

  const token = auth?.token ?? null;
  const user = auth?.user ?? {};
  const name = user?.name ?? "";
  const role = user?.role ?? "user";

  const toggleProfile = (e) => {
    e.stopPropagation();
    setActiveProfile((activeProfile) => !activeProfile);
  };

  const closeProfile = () => {
    setActiveProfile(false);
  };

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setActiveProfile(false);
  };

  const addMovie = () => {
    navigate("/movies/add");
    setHideHeader(true);
    setHideProfile(true);
    // setCurrentMovie({});
  };

  const handleQuery = (e) => {
    const value = e.target.value.trim();
    setQuery(value);
  };

  const clickSearch = async () => {
    // if (!query) return;
    try {
      const response = await fetch(
        "http://localhost:4000/movies?limit=6&search=" +
          query +
          "&searchBy=title",
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

  return (
    <header
      onClick={closeProfile}
      className={!hideHeader && token ? "show" : !token ? "switch_color" : null}
    >
      <div className="container">
        <nav className="nav">
          <img className="nav__logo" src={logo} alt="logo" />
          {token && (!hideHeader || !hideProfile) && (
            <>
              {role === "admin" ? (
                <div className="admin_user">
                  <button onClick={addMovie} className="admin_user__add">
                    + ADD MOVIE
                  </button>
                  <div onClick={toggleProfile} className="nav__profile">
                    {name[0]}
                  </div>
                </div>
              ) : (
                <div onClick={toggleProfile} className="nav__profile">
                  {name[0]}
                </div>
              )}
              <div
                onClick={(e) => e.stopPropagation()}
                className={!activeProfile ? "settings" : "settings active"}
              >
                <ul>
                  <li>{name}</li>
                  <li>
                    <button className="logout" onClick={handleLogout}>
                      logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
        {token && !hideHeader && (
          <>
            <h1 className="header__title">find your movie</h1>
            <div className="search_block">
              <input
                onChange={(e) => handleQuery(e)}
                value={query}
                className="search_block__input"
                type="text"
                placeholder="What do you want to watch?"
              />
              <button onClick={clickSearch} className="search_block__button">
                search
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
