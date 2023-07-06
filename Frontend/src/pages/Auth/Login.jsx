import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishList, googleLogin } from "../../features/User/UserSlice";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Navigate, useNavigate } from "react-router-dom";
import Meta from "../../components/Meta/Meta";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth?.user?.user);
  if (user) {
    return navigate('/')
  }
  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (res) => {
    dispatch(googleLogin(res.tokenId)).then((res) => {
      console.log("res",res);
      navigate("/");
    });
  };
  const onFailure = (res) => {
    console.log("Login Failed!, response", res)
    navigate("/login");
  };

  return (
    <>
    <Meta title={"Login | Luxorah"}/>

      <div className="row mt-28">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center my-10">Login to your Account</h3>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login With Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              theme="dark"
              className="google-login-button"
              uxMode="redirect"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
