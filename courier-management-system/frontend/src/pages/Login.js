import { useState } from "react";
import API from "../api";
import "../index.css";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer"
  });

  const [forgotStep, setForgotStep] = useState(0);

  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogin = async () => {

    if (!form.email || !form.password) {
      return alert("Fill all fields");
    }

    try {

      const res = await API.post(`/${form.role}/login`, form);


      const userData =
        res.data.staff ||
        res.data.user ||
        res.data.admin ||
        res.data;


      if (!userData) {
        return alert("Invalid login response");
      }


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("id", userData._id);



      if (form.role === "customer") {

        window.location.href = "/";

      } 
      else if (form.role === "staff") {

        window.location.href = "/staff";

      } 
      else {

        window.location.href = "/admin/dashboard";

      }


    } catch(err) {

      alert(
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed"
      );

    }

  };



  const handleForgotEmail = async () => {

    if (!resetEmail)
      return alert("Enter your email");


    try {

      await API.post("/auth/forgot-password", {
        email: resetEmail
      });


      alert("Email verified");
      setForgotStep(2);


    } catch(err){

      alert(
        err.response?.data?.message ||
        "Email verification failed"
      );

    }

  };




  const handleResetPassword = async () => {


    if(!newPassword || !confirmPassword)
      return alert("Fill all fields");


    if(newPassword !== confirmPassword)
      return alert("Passwords do not match");



    try {


      await API.post("/auth/reset-password",{
        email: resetEmail,
        newPassword
      });


      alert("Password updated successfully");


      setForgotStep(0);
      setResetEmail("");
      setNewPassword("");
      setConfirmPassword("");



    }catch(err){

      alert(
        err.response?.data?.message ||
        "Password reset failed"
      );

    }

  };



  const inputStyle = {
    width:"100%",
    padding:10,
    marginBottom:12,
    borderRadius:6,
    border:"1px solid #ccc"
  };


  const buttonStyle = {
    width:"100%",
    padding:12,
    borderRadius:6,
    border:"none",
    background:"#007bff",
    color:"#fff",
    cursor:"pointer",
    fontWeight:"bold"
  };


  const linkStyle = {
    color:"#007bff",
    cursor:"pointer",
    display:"block",
    textAlign:"center",
    marginTop:15
  };



  return (

    <div
      style={{
        maxWidth:400,
        margin:"50px auto",
        padding:30,
        background:"#fff",
        borderRadius:12,
        boxShadow:"0 4px 15px rgba(0,0,0,.1)"
      }}
    >


    {forgotStep===0 && (

      <>

      <h2 style={{textAlign:"center"}}>
        Login
      </h2>


      <select
        style={inputStyle}
        value={form.role}
        onChange={(e)=>
          setForm({...form,role:e.target.value})
        }
      >

        <option value="customer">
          Customer
        </option>

        <option value="staff">
          Staff
        </option>

        <option value="admin">
          Admin
        </option>

      </select>



      <input
        style={inputStyle}
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e)=>
          setForm({...form,email:e.target.value})
        }
      />



      <input
        style={inputStyle}
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e)=>
          setForm({...form,password:e.target.value})
        }
      />



      <button
        style={buttonStyle}
        onClick={handleLogin}
      >
        Login
      </button>



      <span
        style={linkStyle}
        onClick={()=>setForgotStep(1)}
      >
        Forgot Password?
      </span>



      <p style={{textAlign:"center"}}>
        Don't have account?
        <span
          style={linkStyle}
          onClick={()=>
            window.location.href="/register"
          }
        >
          Register
        </span>
      </p>


      </>

    )}




    {forgotStep===1 && (

      <>

      <h2>
        Forgot Password
      </h2>


      <input
        style={inputStyle}
        placeholder="Email"
        value={resetEmail}
        onChange={(e)=>
          setResetEmail(e.target.value)
        }
      />


      <button
        style={buttonStyle}
        onClick={handleForgotEmail}
      >
        Verify Email
      </button>


      </>

    )}




    {forgotStep===2 && (

      <>

      <h2>
        Reset Password
      </h2>


      <input
        style={inputStyle}
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>
          setNewPassword(e.target.value)
        }
      />


      <input
        style={inputStyle}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>
          setConfirmPassword(e.target.value)
        }
      />


      <button
        style={buttonStyle}
        onClick={handleResetPassword}
      >
        Set Password
      </button>


      </>

    )}


    </div>

  );

}


export default Login;