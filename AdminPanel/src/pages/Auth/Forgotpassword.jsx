import React from "react";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { validateEmail } from "../../functions";
import { forgotPassword } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMessage } from "../../functions";

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleForgotPassword = () => {
    // Validate Inout Field
    if (!email || email.trim() === "") {
      setEmailError("Please enter your email");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
    console.log("EMAIL", email);
    if (email && validateEmail(email)) {
      // Post API or perform login action
      dispatch(forgotPassword({ email })).then(() => {
        showSuccessMessage("Email Sent Successfully");
      });
      // navigate("/resetpassword");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="bg-white rounded-lg p-8 w-full sm:w-96">
          <h2 className="text-xl mb-4 text-center">Forgot Password</h2>
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
          <Btn
            title="Send Link"
            variant="contained"
            onClick={handleForgotPassword}
            className="w-full"
          ></Btn>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
