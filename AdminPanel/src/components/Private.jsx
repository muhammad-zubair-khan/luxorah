import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};
export default Private;