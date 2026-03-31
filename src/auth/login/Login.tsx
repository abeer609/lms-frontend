import { Navigate } from "react-router";
import { useAppSelector } from "../../hooks";
import type { RootState } from "../../store";
import LoginForm from "./components/LoginForm";

function Login() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="h-full bg-gray-900 text-gray-100">
      <LoginForm />
    </div>
  );
}

export default Login;
