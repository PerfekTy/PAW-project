import React from "react";

const SubmitButton = props => {
  return (
    <div>
      <input
        type="submit"
        value={props.value}
        className="w-full bg-[#1a73e8] hover:bg-[#174ea6] cursor-pointer font-bold text-white"
      />
    </div>
  );
};

export default SubmitButton;
