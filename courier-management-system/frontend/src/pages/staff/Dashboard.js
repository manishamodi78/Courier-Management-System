import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "../../index.css";


function StaffDashboard() {

  const [deliveries, setDeliveries] = useState([]);
  const [summary, setSummary] = useState({
    total:0,
    pending:0,
    delivered:0
  });

  const [loading,setLoading] = useState(false);
  const [confirmInput,setConfirmInput] = useState({});

  const navigate = useNavigate();



  useEffect(()=>{
    loadData();
  },[]);



  const loadData = async()=>{

    try{

      setLoading(true);

      const res = await API.get("/staff/assigned");

      const data = res.data || [];

      setDeliveries(data);


      setSummary({

        total:data.length,

        delivered:
        data.filter(
          d=>d.status==="Delivered"
        ).length,

        pending:
        data.filter(
          d=>d.status!=="Delivered"
        ).length

      });


    }catch{

      alert("Failed to load deliveries");

    }
    finally{

      setLoading(false);

    }

  };




  const updateStatus = async(id,status)=>{

    try{

      await API.put(
        `/staff/status/${id}`,
        {
          status,
          confirmation:
          confirmInput[id] || ""
        }
      );


      setConfirmInput(prev=>({
        ...prev,
        [id]:""
      }));


      loadData();


    }catch(err){

      alert(
        err.response?.data?.message ||
        "Status update failed"
      );

    }

  };





  const nextStatus = {

    Booked:"Picked",

    Picked:"In Transit",

    "In Transit":"Delivered",

    Delivered:null

  };




  const colors={

    Booked:"#eab308",

    Picked:"#2563eb",

    "In Transit":"#ea580c",

    Delivered:"#16a34a"

  };





  const logout=()=>{

    if(window.confirm("Logout?")){

      localStorage.clear();

      navigate("/login");

    }

  };






return (

<div
style={{
padding:"30px",
fontFamily:"Arial",
maxWidth:"1100px",
margin:"auto"
}}
>


<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<h2>
🚚 Staff Dashboard
</h2>


<button

onClick={logout}

style={{
background:"#ef4444",
color:"#fff",
border:"none",
padding:"10px 18px",
borderRadius:"8px",
cursor:"pointer"
}}

>
Logout
</button>


</div>





<div
style={{
display:"flex",
gap:"20px",
margin:"30px 0",
flexWrap:"wrap"
}}
>


{
[
["Total",summary.total],
["Pending",summary.pending],
["Delivered",summary.delivered]

].map((item,index)=>(


<div
key={index}

style={{

flex:1,
minWidth:"180px",
background:"#fff",
padding:"20px",
borderRadius:"15px",
textAlign:"center",
boxShadow:"0 4px 10px #ddd"

}}
>


<h3>
{item[0]}
</h3>

<h1>
{item[1]}
</h1>


</div>


))
}


</div>





<h3>
📦 Assigned Deliveries
</h3>



{
loading &&
<p>
Loading...
</p>
}



{
!loading &&
deliveries.length===0 &&
<p>
No Work Assigned ✅
</p>
}




<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(300px,1fr))",
gap:"20px"
}}
>



{
deliveries.map(d=>(


<div

key={d._id}

style={{

background:"#fff",

padding:"20px",

borderRadius:"15px",

borderLeft:
`5px solid ${colors[d.status]}`,

boxShadow:
"0 4px 10px #ddd"

}}

>


<p>
<b>Tracking:</b> {d.trackingId}
</p>


<p>
<b>Receiver:</b> {d.receiverName || "N/A"}
</p>


<p>
<b>Address:</b> {d.deliveryAddress || "N/A"}
</p>



<p>
<b>Status:</b>

<span
style={{
color:colors[d.status],
fontWeight:"bold",
marginLeft:"5px"
}}
>
{d.status}
</span>

</p>




{
nextStatus[d.status] &&

<>


{
nextStatus[d.status]==="Delivered" &&

<input

placeholder="Confirmation note"

value={confirmInput[d._id] || ""}

onChange={(e)=>

setConfirmInput({

...confirmInput,

[d._id]:e.target.value

})

}

style={{
width:"100%",
padding:"8px",
marginBottom:"10px"
}}

/>

}



<button

onClick={()=>
updateStatus(
d._id,
nextStatus[d.status]
)
}

style={{

background:"#2563eb",

color:"#fff",

border:"none",

padding:"8px 15px",

borderRadius:"8px",

cursor:"pointer"

}}

>

{nextStatus[d.status]}

</button>


</>


}



{
d.status==="Delivered" &&
<p style={{color:"green"}}>
✅ Delivered
</p>
}



</div>


))
}



</div>


</div>

);


}


export default StaffDashboard;