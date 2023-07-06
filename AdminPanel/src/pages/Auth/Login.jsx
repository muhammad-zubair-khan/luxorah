import React from "react";
import Input from "../../components/Input";
import Btn from "../../components/Btn";
import { Link, useNavigate } from "react-router-dom";
import key from "../../assets/key.png";
import { showErrorMessage, validateEmail } from "../../functions";
import { login } from "../../features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogin = () => {
    // Validate Fields
    if (!email || email.trim() === "") {
      setEmailError("Please enter your email");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }

    if (!password || password.trim() === "") {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }

    if (email && validateEmail(email) && password && password.trim() !== "") {
      const values = {
        email,
        password,
      };
      dispatch(login(values)).then((action) => {
        if (login.rejected.match(action)) {
          showErrorMessage(action.payload);
        } else {
          // navigate("/");
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="bg-white rounded-lg p-8 w-full sm:w-96">
          <img
            src={key}
            alt="Key"
            className="mx-auto w-14 filter drop-shadow-md hue-rotate-51"
          />
          <h2 className="text-xl mb-4 uppercase text-center">Admin Panel</h2>
          <div className="mb-4">
            <Input
              label="Email"
              type="text"
              id="standard-text-basic"
              variant="standard"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              id="standard-password-input"
              variant="standard"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="mb-4 text-right">
            <Link className="text-blue-500" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
          <Btn
            title="Login"
            variant="contained"
            onClick={handleLogin}
            className="w-full"
          ></Btn>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;