import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import bgImage from "../../assets/c8.jpg";

function CustomerDashboard() {

  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();


  const cards = [
    {
      title: "📦 Book a Courier",
      desc: "Send parcels easily in a few steps",
      link: "/book",
      bg: "linear-gradient(135deg,#6366f1,#a855f7)",
    },
    {
      title: "📜 Shipment History",
      desc: "Check all your past shipments",
      link: "/history",
      bg: "linear-gradient(135deg,#34d399,#3b82f6)",
    },
    {
      title: "🔍 Track Shipment",
      desc: "Track your shipment by ID",
      link: "/track",
      bg: "linear-gradient(135deg,#f472b6,#f43f5e)",
    },
  ];



  return (

    <div
      style={{
        minHeight:"100vh",
        padding:"40px",
        fontFamily:"Arial",
        backgroundImage:`url(${bgImage})`,
        backgroundSize:"cover",
        backgroundPosition:"center"
      }}
    >


      <h1
        style={{
          color:"#fff",
          textAlign:"center",
          marginBottom:"40px"
        }}
      >
        Customer Dashboard
      </h1>



      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
          gap:"30px"
        }}
      >


        {
          cards.map((c,index)=>(

            <div

              key={index}

              onClick={()=>{
                navigate(c.link)
              }}

              onMouseEnter={()=>{
                setHovered(index)
              }}

              onMouseLeave={()=>{
                setHovered(null)
              }}


              style={{

                background:c.bg,

                padding:"30px",

                borderRadius:"20px",

                color:"#fff",

                cursor:"pointer",

                transform:
                hovered===index
                ?"scale(1.05)"
                :"scale(1)",


                boxShadow:
                hovered===index
                ?"0 15px 35px rgba(0,0,0,.4)"
                :"0 8px 20px rgba(0,0,0,.2)",


                transition:"0.3s"

              }}

            >


              <h2>
                {c.title}
              </h2>


              <p>
                {c.desc}
              </p>


            </div>


          ))
        }


      </div>


    </div>

  );

}


export default CustomerDashboard;