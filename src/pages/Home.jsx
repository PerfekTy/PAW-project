import { useState } from "react";

import Products from "../components/Products/Products";
import logo from "../assets/logo.png";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const inputHandler = e => {
    setUserInput(e.target.value);
  };

  return (
    <div className="mt-10 ml-24 max-[600px]:ml-0 max-[600px]:mt-0 min-[1200px]:ml-18">
      <form className="max-[600px]:hidden flex items-center justify-center">
        <div className="flex w-[90%] min-[1200px]:w-[60%]">
          <img src={logo} alt="cloth logo" width={60} className="mr-3" />
          <input
            type="text"
            className="w-full pl-4"
            placeholder="Search for items..."
            value={userInput}
            onChange={inputHandler}
          />
        </div>
      </form>
      <Products />
    </div>
  );
};

export default Home;
