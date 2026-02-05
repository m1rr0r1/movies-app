import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./UserForm.scss";

const UserForm = ({ mode, setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (type) => {
    setAttemptedSubmit(true);

    if (type === "login") {
      if (email && password) {
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
            localStorage.setItem("user", JSON.stringify(data.data));
            localStorage.setItem("token", data.data.token);
            setAuth({
              user: data.data,
              token: data.data.token,
            });
            setSuccess(data.message);
            navigate("/movies");
          } else {
            const error = await response.json();
            setError(error.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      if (name && email && password) {
        try {
          const response = await fetch("http://localhost:4000/me/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setSuccess(data.message);
            navigate("/login");
          } else {
            const error = await response.json();
            setError(error.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value.trim());
    } else if (id === "password") {
      setPassword(value.trim());
    } else {
      setName(value.trim());
    }
    setError("");
    setSuccess("");
    setAttemptedSubmit(false);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setSuccess("");
    setAttemptedSubmit(false);
  };

  return (
    <section className="auth">
      <div className="container">
        <form>
          <h2>{mode === "login" ? "login" : "registration"}</h2>
          {mode === "registration" && (
            <label htmlFor="name">
              Name {!name && attemptedSubmit && <span>is required</span>}
              <input
                required
                value={name}
                onChange={(e) => handleInput(e)}
                id="name"
                type="text"
                placeholder="enter name"
              />
            </label>
          )}
          <label htmlFor="email">
            Email {!email && attemptedSubmit && <span>is required</span>}
            <input
              required
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
              required
              id="password"
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
          <p className={error ? "error" : "success"}>
            {error ? error : success}
          </p>
          <div className="buttons">
            <button onClick={reset} type="button" className="reset_button">
              reset
            </button>
            {mode === "login" ? (
              <button
                onClick={() => handleSubmit("login")}
                className="login_button"
                type="button"
              >
                login
              </button>
            ) : (
              <button
                onClick={() => handleSubmit("registration")}
                className="register_button"
                type="button"
              >
                register
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserForm;
