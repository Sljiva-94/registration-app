import classes from "./Form.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormTouched {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formTouched, setFormTouched] = useState<FormTouched>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("firstName", formData.firstName);
    sessionStorage.setItem("lastName", formData.lastName);
    navigate("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFormTouched({ ...formTouched, [name]: true });
  };

  const isNameValid = formData.firstName.length >= 4;
  const isLastNameValid = formData.lastName.length >= 4;
  const isEmailValid =
    formData.email.includes("@") &&
    formData.email.includes(".com") &&
    formData.email.indexOf("@") + 1 < formData.email.lastIndexOf(".com");
  const isPasswordValid = formData.password.length >= 7;

  const isFormValid =
    isNameValid && isLastNameValid && isEmailValid && isPasswordValid;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div>
        <label className={classes.label}>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleInputBlur}
          className={`${classes.input} ${
            formTouched.firstName && !isNameValid ? classes.error : ""
          }`}
          required
        />
      </div>

      <div>
        <label className={classes.label}>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleInputBlur}
          className={`${classes.input} ${
            formTouched.lastName && !isLastNameValid ? classes.error : ""
          }`}
          required
        />
      </div>

      <div>
        <label className={classes.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleInputBlur}
          className={`${classes.input} ${
            formTouched.email && !isEmailValid ? classes.error : ""
          }`}
        />
      </div>

      <div>
        <label className={classes.label}>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleInputBlur}
          className={`${classes.input} ${
            formTouched.password && !isPasswordValid ? classes.error : ""
          }`}
        />
      </div>

      <button type="submit" className={classes.button} disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default Form;
