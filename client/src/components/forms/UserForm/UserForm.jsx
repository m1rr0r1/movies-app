import React, { useState } from "react";
import { Link } from "react-router";
import "./UserForm.scss";

const UserForm = ({ mode, setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (type === "login") {
      try {
        const response = await fetch("http://localhost:4000/me/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", data.token);
          setAuth({
            user: data,
            token: data.token,
          });
        } else {
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Registration");
    }
  };

  const handleInput = (e) => {
    const { type, value } = e.target;

    if (type === "email") {
      setEmail(value.trim());
    } else if (type === "password") {
      setPassword(value.trim());
    }
    setAttemptedSubmit(false);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setAttemptedSubmit(false);
  };

  return (
    <div className="auth">
      <div className="container">
        <form>
          <h2>{mode === "login" ? "login" : "registration"}</h2>
          <label htmlFor="name">Name</label>
          <label htmlFor="email">
            Email {!email && attemptedSubmit && <span>is required</span>}
            <input
              value={email}
              onChange={(e) => handleInput(e)}
              id="email"
              type="email"
              placeholder="enter email"
            />
          </label>
          <label htmlFor="password">
            Password {!password && attemptedSubmit && <span>is required</span>}
            <input
              value={password}
              onChange={(e) => handleInput(e)}
              type="password"
              placeholder="enter password"
            />
          </label>
          <Link
            className={mode === "login" ? "registration" : "login"}
            to={mode === "login" ? "/registration" : "/login"}
          >
            {mode === "login"
              ? "Do not have an account? Go to Registration form!"
              : "Already registered? Go to Login form!"}
          </Link>
          <div className="buttons">
            <button onClick={reset} type="button" className="reset_button">
              reset
            </button>
            {mode === "login" ? (
              <button
                onClick={(e) => handleSubmit(e, "login")}
                className="login_button"
                type="button"
              >
                login
              </button>
            ) : (
              <button
                onClick={(e) => handleSubmit(e, "registration")}
                className="register_button"
                type="button"
              >
                register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
