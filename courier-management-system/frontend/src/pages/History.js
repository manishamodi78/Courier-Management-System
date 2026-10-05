import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function History(){

const [shipments,setShipments]=useState([]);
const [error,setError]=useState("");

const navigate=useNavigate();

const customerId=localStorage.getItem("id");
const token=localStorage.getItem("token");



useEffect(()=>{

loadHistory();

},[]);



const loadHistory=async()=>{

try{

const res=await API.get(
`/shipment/history/${customerId}`
);

setShipments(res.data);
setError("");

}catch(err){

setError(
err.response?.data?.message ||
"Error loading history"
);

}

};





const downloadPDF=async(shipment)=>{

try{


if(!token){

alert("Please login first");
return;

}


const res=await fetch(

`http://localhost:5000/api/shipment/download/${shipment._id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);



if(!res.ok)
throw new Error("Download failed");



const blob=await res.blob();


const url=window.URL.createObjectURL(blob);


const a=document.createElement("a");

a.href=url;

a.download=
`shipment_${shipment.trackingId}.pdf`;


a.click();



}catch(err){

alert(err.message);

}

};





const statusColor=(status)=>{

if(status==="Delivered")
return "#16a34a";

if(status==="In Transit")
return "#f97316";

if(status==="Picked")
return "#2563eb";

return "#64748b";

};





return(

<div

style={{

minHeight:"100vh",

background:"#f8fafc",

padding:"30px"

}}

>


<button

onClick={()=>navigate("/customer/dashboard")}

style={backBtn}

>
← Dashboard
</button>





<h2

style={{

textAlign:"center",

margin:"25px"

}}

>
📜 Shipment History
</h2>





{
error &&

<p
style={{
color:"red",
textAlign:"center"
}}
>
{error}
</p>

}





{
!error && shipments.length===0 &&

<p
style={{
textAlign:"center"
}}
>
No shipments found
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
shipments.map(s=>(


<div

key={s._id}

style={cardStyle}

>


<h3>
📦 {s.trackingId}
</h3>



<p>

<b>Status:</b>

<span

style={{

color:statusColor(s.status),

fontWeight:"bold",

marginLeft:"8px"

}}

>

{s.status}

</span>

</p>



<p>

<b>Delivery Date:</b>

{" "}

{

s.deliveryDate

?

new Date(
s.deliveryDate
).toLocaleDateString()

:

"Pending"

}

</p>





<button

onClick={()=>downloadPDF(s)}

style={downloadBtn}

>

Download PDF

</button>




</div>


))
}


</div>


</div>


);

}




const cardStyle={

background:"#fff",

padding:"20px",

borderRadius:"15px",

boxShadow:"0 5px 15px #ddd"

};



const downloadBtn={

width:"100%",

padding:"10px",

background:"#2563eb",

color:"#fff",

border:"none",

borderRadius:"8px",

cursor:"pointer",

fontWeight:"bold"

};



const backBtn={

background:"#64748b",

color:"#fff",

border:"none",

padding:"10px 18px",

borderRadius:"8px",

cursor:"pointer"

};



export default History;