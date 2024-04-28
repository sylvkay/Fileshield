//imports from react
import { useState } from "react";

//imorting from react-router-dom
import { useDispatch } from "react-redux";

//imports from react-router-dom
import { Link, useNavigate } from "react-router-dom";

//importing styles from styled file
import { SignupContainer, SignupForm } from "./signup.styled.tsx";

//importing InputField from InputField folder
import InputField from "../inputField/inputField.tsx";

//improting from store
import { SignUpUser } from "@/redux/slices/authSlice.ts";

//imoorting from store
import { AppDispatch } from "../../redux/store.ts";

//declaration
const Signup = () => {
  //credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  //setting dispatch
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //handle credentials change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  //handle submit function
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await dispatch(SignUpUser(credentials));
    if (response.type === "/auth/signup/fulfilled") {
      navigate("/");
    }
  };

  return (
    <SignupContainer>
      <SignupForm>
        <span>Securely login to your account</span>

        <form>
          <InputField
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            label="Username"
            placeholder="Enter your username"
            shouldValidate
          />
          <InputField
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            label="Email"
            placeholder="Enter your email"
            shouldValidate
          />
          <InputField
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            label="Password"
            placeholder="Enter your password"
            shouldValidate
          />

          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>

          <button type="button" onClick={handleSubmit}>
            Signup
          </button>
        </form>

        <span className="dont-have-an-account-text">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
