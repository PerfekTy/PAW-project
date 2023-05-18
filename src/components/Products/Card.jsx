import CardInfo from "./CardInfo";
import LikeButton from "./LikeButton";
import exampleUserPhoto from "../../assets/example.jpeg";
import exampleUserAvatar from "../../assets/userPhoto.jpeg";

const Card = () => {
  return (
    <div className="border rounded-lg mb-4 p-4 relative hover:bg-[#34495e10] cursor-pointer">
      <div>
        <div className="flex items-center mb-2">
          <img
            className="rounded-3xl mr-2"
            src={exampleUserAvatar}
            alt="user-avatar"
            width={25}
          />
          <p>@user</p>
        </div>
        <div>
          <img src={exampleUserPhoto} alt="item" width={235} />
        </div>
        <CardInfo />
        <LikeButton />
      </div>
    </div>
  );
};

export default Card;
