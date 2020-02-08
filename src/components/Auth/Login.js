import React, { useState } from "react";

import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";

import { Link } from "react-router-dom";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const { name, email, password } = values;
  const [login, setLogin] = useState(true);
  const [serverErrors, setServerErrors] = useState(null);

  async function authenticateUser() {
    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      console.log({ response });
      props.history.push("/");
    } catch (err) {
      console.log("Authentication Error: ", err);
      setServerErrors(err.message);
    }
  }

  const handleToggle = () => {
    setLogin(prevLogin => !prevLogin);
  };

  return (
    <div className="mv3">
      <h2>{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your Name"
            className={errors.name && "error-input"}
            autoComplete="off"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Your Email"
          autoComplete="off"
          className={errors.email && "error-input"}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={password}
          className={errors.password && "error-input"}
          placeholder="Choose a Secure Password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {serverErrors && <p className="error-text">{serverErrors}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={handleToggle}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
