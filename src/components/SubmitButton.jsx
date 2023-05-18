const SubmitButton = props => {
  return (
    <div>
      <input
        type="submit"
        value={props.value}
        className="w-full bg-[#1a73e8] hover:bg-[#174ea6] transition-all duration-300 cursor-pointer ease-linearr font-bold text-white"
      />
    </div>
  );
};

export default SubmitButton;
