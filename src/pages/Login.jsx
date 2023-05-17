import { useState } from "react";

const Login = () => {
  const [userInput, setUserInput] = useState({
    login: "",
    password: "",
  });
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);

  const loginOnChange = e => {
    setUserInput({ ...userInput, login: e.target.value });
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
      login: "",
      password: "",
    });
    setIsCheckboxClicked(false);
    console.log(userLoginData);
  };

  return (
    <div className="grid place-items-center">
      <form onSubmit={submitHandler} method="POST">
        <div className="form-fieldset">
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={userInput.login}
            onChange={loginOnChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userInput.password}
            onChange={passwordOnChange}
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
        <div>
          <input
            type="submit"
            value="Sign In"
            className="w-full bg-[#888722] hover:bg-[#e2df4d] cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
