import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { currUser } = useAuth(); // Get logged-in user

  if (!currUser) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render protected content if authenticated
};

export default ProtectedRoute;
