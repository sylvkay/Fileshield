//imports from react
import { useState } from "react";

//imorting from react-router-dom
import { useDispatch } from "react-redux";

//imports from react-router-dom
import { Link, useNavigate } from "react-router-dom";

//importing styles from styled file
import { LoginContainer, LoginForm } from "./login.styled";

//importing InputField from InputField folder
import InputField from "../inputField/inputField.tsx";

//improting from store
import { LoginUser } from "@/redux/slices/authSlice.ts";

//imoorting from store
import { AppDispatch } from "../../redux/store.ts";

//declaration
const Login = () => {
  //credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

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

    const response = await dispatch(LoginUser(credentials));
    if (response.type === "/auth/login/fulfilled") {
      navigate("/");
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <span>Securely login to your account</span>

        <form>
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
            Login
          </button>
        </form>

        <span className="dont-have-an-account-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
