import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.scss";

const Header = ({ auth }) => {
  return (
    <header className={auth && "auth"}>
      <div className="container">
        <nav className="nav">
          {!auth ? (
            <img className="nav__logo" src={logo} alt="logo" />
          ) : (
            <>
              <button className="nav__add">+ ADD MOVIE</button>
              <div className="nav__profile"></div>
            </>
          )}
        </nav>
        {auth && (
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
