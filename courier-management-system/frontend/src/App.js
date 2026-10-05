import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Track from "./pages/Track";
import BookCourier from "./pages/BookCourier";
import History from "./pages/History";


import CustomerDashboard from "./pages/customer/Dashboard";


import StaffDashboard from "./pages/staff/Dashboard";


import AdminDashboard from "./pages/admin/Dashboard";
import Shipments from "./pages/admin/Shipments";
import Staff from "./pages/admin/Staff";
import Customers from "./pages/admin/Customers";


import "leaflet/dist/leaflet.css";

import ProtectedRoute from "./components/ProtectedRoute";



function App() {


  return (

    <BrowserRouter>


      <Navbar />


      <Routes>



        {/* PUBLIC */}

        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/track"
          element={<Track />}
        />





        {/* CUSTOMER */}


        <Route

          path="/"

          element={

            <ProtectedRoute role="customer">

              <CustomerDashboard />

            </ProtectedRoute>

          }

        />



        <Route

          path="/book"

          element={

            <ProtectedRoute role="customer">

              <BookCourier />

            </ProtectedRoute>

          }

        />



        <Route

          path="/history"

          element={

            <ProtectedRoute role="customer">

              <History />

            </ProtectedRoute>

          }

        />






        {/* STAFF */}


        <Route

          path="/staff"

          element={

            <ProtectedRoute role="staff">

              <StaffDashboard />

            </ProtectedRoute>

          }

        />







        {/* ADMIN */}



        <Route

          path="/admin/dashboard"

          element={

            <ProtectedRoute role="admin">

              <AdminDashboard />

            </ProtectedRoute>

          }

        />



        <Route

          path="/admin/shipments"

          element={

            <ProtectedRoute role="admin">

              <Shipments />

            </ProtectedRoute>

          }

        />



        <Route

          path="/admin/staff"

          element={

            <ProtectedRoute role="admin">

              <Staff />

            </ProtectedRoute>

          }

        />



        <Route

          path="/admin/customers"

          element={

            <ProtectedRoute role="admin">

              <Customers />

            </ProtectedRoute>

          }

        />






        {/* FALLBACK */}


        <Route

          path="*"

          element={
            <Navigate
              to="/login"
              replace
            />
          }

        />



      </Routes>



    </BrowserRouter>

  );

}



export default App;