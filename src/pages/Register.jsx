import { useState } from "react";

import SubmitButton from "../components/SubmitButton";

const Register = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: "",
  });
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [error, setError] = useState("");

  const firstNameOnChange = e => {
    setUserInput({ ...userInput, firstName: e.target.value });
  };

  const lastNameOnChange = e => {
    setUserInput({ ...userInput, lastName: e.target.value });
  };

  const emailOnChange = e => {
    setUserInput({ ...userInput, email: e.target.value });
  };

  const passwordOnChange = e => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  const dateOnChange = e => {
    setUserInput({ ...userInput, date: e.target.value });
  };

  const checkboxOnChange = () => {
    setIsCheckboxClicked(!isCheckboxClicked);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (isCheckboxClicked === false) {
      setError("You have to accept rules before continue");
      return;
    }

    const userLoginData = {
      ...userInput,
      rules: isCheckboxClicked,
    };
    setUserInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      date: "",
    });
    setIsCheckboxClicked(false);
    setError("");
    console.log(userLoginData);
  };

  return (
    <div className="grid place-items-center w-1/2 mx-auto">
      <form onSubmit={submitHandler} method="POST" className="mt-10">
        <div className="flex">
          <div className="mr-3">
            <input
              type="text"
              name="firstname"
              placeholder="Name"
              value={userInput.firstName}
              onChange={firstNameOnChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={userInput.lastName}
              onChange={lastNameOnChange}
              required
            />
          </div>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={userInput.email}
            onChange={emailOnChange}
            required
          />
        </div>

        <div className="flex">
          <div className="w-full mr-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userInput.password}
              onChange={passwordOnChange}
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="date"
              value={userInput.date}
              onChange={dateOnChange}
              min="1920-01-01"
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            id="rules"
            value={userInput.rules}
            onChange={checkboxOnChange}
          />
          <label htmlFor="rules">
            <span className="text-[red]">*</span> I declare that I know and
            accept the provisions.
          </label>
          <div className="text-center text-red-600 font-bold font-sans">
            <span>{error}</span>
          </div>
        </div>
        <SubmitButton value="Register" />
      </form>
    </div>
  );
};

export default Register;
