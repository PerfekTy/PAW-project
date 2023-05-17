const Register = () => {
  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler} method="POST"></form>
    </div>
  );
};

export default Register;
