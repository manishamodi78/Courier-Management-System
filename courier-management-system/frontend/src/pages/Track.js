import { useState } from "react";
import API from "../api";

function Track() {

  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");



  const getStatusColor = (status) => {

    if(status === "Delivered") return "#16a34a";
    if(status === "In Transit") return "#f97316";
    if(status === "Picked") return "#2563eb";
    return "#64748b";

  };



  const steps = [
    "Booked",
    "Picked",
    "In Transit",
    "Delivered"
  ];




  const track = async()=>{

    if(!id.trim()){

      alert("Enter Tracking ID");
      return;

    }


    try{

      const res = await API.get(
        `/shipment/track/${id.trim()}`
      );


      setData(res.data);
      setError("");


    }catch(err){

      setData(null);

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Tracking failed"
      );

    }

  };




  return (

    <div

      style={{
        maxWidth:450,
        margin:"40px auto",
        padding:25,
        borderRadius:12,
        boxShadow:"0 4px 15px rgba(0,0,0,.1)",
        fontFamily:"Arial"
      }}

    >


      <h2 style={{textAlign:"center"}}>
        📦 Track Shipment
      </h2>




      <input

        value={id}

        onChange={(e)=>setId(e.target.value)}

        placeholder="Enter Tracking ID"

        style={{
          width:"100%",
          padding:12,
          marginBottom:12,
          borderRadius:6,
          border:"1px solid #ccc"
        }}

      />




      <button

        onClick={track}

        style={{
          width:"100%",
          padding:12,
          background:"#2563eb",
          color:"#fff",
          border:"none",
          borderRadius:6,
          cursor:"pointer",
          fontWeight:"bold"
        }}

      >

        Track

      </button>





      {
        error &&

        <p style={{
          color:"red",
          marginTop:15
        }}>

          {error}

        </p>
      }





      {
        data &&

        <div

          style={{
            marginTop:20,
            padding:18,
            border:"1px solid #ddd",
            borderRadius:10
          }}

        >



          <p>
            <b>Tracking ID:</b> {data.trackingId}
          </p>



          <p>

            <b>Status:</b>{" "}

            <span

              style={{
                color:getStatusColor(data.status),
                fontWeight:"bold"
              }}

            >

              {data.status}

            </span>

          </p>




          <p>
            <b>Receiver:</b> {data.receiverName || "N/A"}
          </p>



          <p>
            <b>Pickup:</b> {data.pickupAddress || "N/A"}
          </p>



          <p>
            <b>Delivery:</b> {data.deliveryAddress || "N/A"}
          </p>




          <p>

            <b>Delivery Date:</b>{" "}

            {
              data.deliveryDate
              ? new Date(data.deliveryDate).toLocaleDateString()
              : "Pending"
            }

          </p>






          <h4>
            Shipment Progress
          </h4>



          {
            steps.map((step,index)=>{


              const active =
              steps.indexOf(data.status) >= index;



              return (

                <div

                  key={step}

                  style={{
                    display:"flex",
                    alignItems:"center",
                    marginBottom:10
                  }}

                >


                  <div

                    style={{
                      width:16,
                      height:16,
                      borderRadius:"50%",
                      background:
                      active
                      ? "#16a34a"
                      : "#ccc",
                      marginRight:10
                    }}

                  />



                  <span

                    style={{
                      fontWeight:
                      active
                      ? "bold"
                      : "normal",
                      color:
                      active
                      ? "#111"
                      : "#999"
                    }}

                  >

                    {step}

                  </span>



                </div>

              );


            })
          }



        </div>

      }




    </div>

  );

}


export default Track;