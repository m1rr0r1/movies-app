import React from "react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router";
import "./Header.scss";

const Header = ({ token }) => {
  return (
    <header className={token && "authorized"}>
      <div className="container">
        <nav className="nav">
          {!token ? (
            <>
              <img className="nav__logo" src={logo} alt="logo" />
            </>
          ) : (
            <>
              <button className="nav__add">+ ADD MOVIE</button>
              <div className="nav__profile"></div>
            </>
          )}
        </nav>
        {token && (
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
