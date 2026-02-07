import { Outlet, replace, Navigate } from "react-router";

const ProtectedLayout = ({ auth }) => {
  return !auth.token ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedLayout;
