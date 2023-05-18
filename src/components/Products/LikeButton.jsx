import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = () => {
  const [clicked, setClicked] = useState(false);
  const likeIconHander = () => {
    setClicked(!clicked);
  };
  return (
    <>
      {clicked ? (
        <AiFillHeart
          color="red"
          onClick={likeIconHander}
          className="absolute right-5 bottom-4 cursor-pointer"
          size={25}
        />
      ) : (
        <AiOutlineHeart
          onClick={likeIconHander}
          className="absolute right-5 bottom-4 cursor-pointer"
          size={25}
        />
      )}
    </>
  );
};

export default LikeButton;
