import { useState } from "react";
import API from "../api";

function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const [message,setMessage] = useState({
    text:"",
    type:""
  });



  const showMessage = (text,type="success") => {

    setMessage({
      text,
      type
    });

    setTimeout(()=>{
      setMessage({
        text:"",
        type:""
      });
    },3000);

  };




  const handleRegister = async()=>{


    if(!form.name || !form.email || !form.password){

      return showMessage(
        "All fields are required",
        "error"
      );

    }



    try{


      const res = await API.post(
        "/customer/register",
        form
      );



      const userId =
        res.data._id ||
        res.data.user?._id;



      showMessage(
        "Registration successful! ID: " +
        (userId || ""),
        "success"
      );



      setForm({
        name:"",
        email:"",
        password:""
      });



      setTimeout(()=>{

        window.location.href="/login";

      },2000);



    }catch(err){


      showMessage(
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed",
        "error"
      );


    }

  };



  const inputStyle={

    width:"100%",
    padding:12,
    marginBottom:15,
    borderRadius:8,
    border:"1px solid #ccc",
    fontSize:15

  };



  return (

    <>


    {message.text && (

      <div
        style={{
          position:"fixed",
          top:20,
          left:"50%",
          transform:"translateX(-50%)",
          background:
          message.type==="success"
          ? "#16a34a"
          : "#dc2626",
          color:"#fff",
          padding:"12px 20px",
          borderRadius:8,
          zIndex:999
        }}
      >

        {message.text}

      </div>

    )}




    <div

      style={{
        maxWidth:400,
        margin:"50px auto",
        padding:30,
        background:"#fff",
        borderRadius:12,
        boxShadow:"0 5px 20px rgba(0,0,0,.1)"
      }}

    >


      <h2
        style={{
          textAlign:"center",
          marginBottom:25
        }}
      >
        Register
      </h2>




      <input

        style={inputStyle}

        placeholder="Name"

        value={form.name}

        onChange={(e)=>
          setForm({
            ...form,
            name:e.target.value
          })
        }

      />




      <input

        style={inputStyle}

        type="email"

        placeholder="Email"

        value={form.email}

        onChange={(e)=>
          setForm({
            ...form,
            email:e.target.value
          })
        }

      />





      <input

        style={inputStyle}

        type="password"

        placeholder="Password"

        value={form.password}

        onChange={(e)=>
          setForm({
            ...form,
            password:e.target.value
          })
        }

      />





      <button

        onClick={handleRegister}

        style={{

          width:"100%",
          padding:13,
          background:"#2563eb",
          color:"#fff",
          border:"none",
          borderRadius:8,
          cursor:"pointer",
          fontWeight:"bold"

        }}

      >

        Register

      </button>





      <p
        style={{
          textAlign:"center",
          marginTop:20
        }}
      >

        Already have account?

        <span

          style={{
            color:"#2563eb",
            cursor:"pointer",
            marginLeft:5
          }}

          onClick={()=>
            window.location.href="/login"
          }

        >

          Login

        </span>


      </p>




    </div>


    </>

  );

}


export default Register;