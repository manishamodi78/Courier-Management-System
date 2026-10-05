//1 (main working)
import { Link } from "react-router-dom";
import "../index.css";

function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <div className="navbar">
      <h2>🚚 Courier System</h2>

      <div>
        {!role && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {role === "customer" && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/book">Book</Link>
            <Link to="/track">Track</Link>
            <Link to="/history">History</Link>
          </>
        )}

        {role === "staff" && <Link to="/staff">Staff</Link>}
        {role === "admin" && <Link to="/admin">Admin</Link>}

        {role && (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;




// import { Link, useLocation } from "react-router-dom";
// import "../index.css";

// function Navbar() {
//   const role = localStorage.getItem("role");
//   const location = useLocation(); // to highlight active link

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="navbar">
//       <h2>🚚 Courier System</h2>

//       <div className="nav-links">
//         {!role && (
//           <>
//             <Link className={isActive("/login") ? "nav-link active" : "nav-link"} to="/login">Login</Link>
//             <Link className={isActive("/register") ? "nav-link active" : "nav-link"} to="/register">Register</Link>
//           </>
//         )}

//         {role === "customer" && (
//           <>
//             <Link className={isActive("/") ? "nav-link active" : "nav-link"} to="/">Dashboard</Link>
//             <Link className={isActive("/book") ? "nav-link active" : "nav-link"} to="/book">Book</Link>
//             <Link className={isActive("/track") ? "nav-link active" : "nav-link"} to="/track">Track</Link>
//             <Link className={isActive("/history") ? "nav-link active" : "nav-link"} to="/history">History</Link>
//           </>
//         )}

//         {role === "staff" && <Link className={isActive("/staff") ? "nav-link active" : "nav-link"} to="/staff">Staff</Link>}
//         {role === "admin" && <Link className={isActive("/admin") ? "nav-link active" : "nav-link"} to="/admin">Admin</Link>}

//         {role && (
//           <button
//             className="logout-btn"
//             onClick={() => {
//               localStorage.clear();
//               window.location.href = "/login";
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Navbar;