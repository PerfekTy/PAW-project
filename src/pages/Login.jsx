import { useState } from "react";

import SubmitButton from "../components/SubmitButton";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);

  const loginOnChange = e => {
    setUserInput({ ...userInput, email: e.target.value });
  };

  const passwordOnChange = e => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  const checkboxOnChange = () => {
    setIsCheckboxClicked(!isCheckboxClicked);
  };

  const submitHandler = e => {
    e.preventDefault();
    const userLoginData = {
      ...userInput,
      ifRemember: isCheckboxClicked,
    };
    setUserInput({
      email: "",
      password: "",
    });
    setIsCheckboxClicked(false);
    console.log(userLoginData);
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={submitHandler} method="POST" className="mt-10">
        <div className="form-fieldset">
          <input
            type="email"
            name="login"
            placeholder="E-mail"
            value={userInput.login}
            onChange={loginOnChange}
            required
          />
        </div>
        <div>
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
            type="checkbox"
            id="rememberme"
            value={userInput.ifRemember}
            onChange={checkboxOnChange}
          />
          <label htmlFor="rememberme">Remember me</label>
        </div>
        <SubmitButton value="Sign In" />
      </form>
    </div>
  );
};

export default Login;
