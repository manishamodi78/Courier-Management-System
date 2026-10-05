// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, role }) {
//   const userRole = localStorage.getItem("role");

//   if (!userRole) return <Navigate to="/login" />;

//   if (role && role !== userRole) return <Navigate to="/login" />;

//   return children;
// }

// export default ProtectedRoute;






import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;