import React, { act, useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate, Link } from "react-router";
import "./Header.scss";

const Header = ({ auth = {}, setAuth, hideHeader, setHideHeader }) => {
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
  };

  return (
    <header onClick={closeProfile} className={!hideHeader && token && "show"}>
      <div className="container">
        <nav className="nav">
          <img className="nav__logo" src={logo} alt="logo" />
          {token && !hideHeader && (
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
                className="search_block__input"
                type="text"
                placeholder="What do you want to watch?"
              />
              <button className="search_block__button">search</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
