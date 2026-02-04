import React from "react";
import "./UserForm.scss";

const UserForm = (mode, auth) => {
  return (
    <div className="auth">
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>login</h2>
          <label htmlFor="email">
            Email
            <input id="email" type="email" placeholder="enter email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" placeholder="enter password" />
          </label>
          <div className="buttons">
            <button className="reset">reset</button>
            <button className="login" type="submit">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
