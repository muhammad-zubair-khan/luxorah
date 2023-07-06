import { Navigate } from "react-router-dom";

 const Private = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  console.log(getTokenFromLocalStorage?.token);
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
export default Private;