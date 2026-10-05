import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function BookCourier() {


const navigate = useNavigate();


const [form,setForm] = useState({

pickupAddress:"",
deliveryAddress:"",
receiverName:"",
receiverPhone:"",
weight:""

});



const submit = async()=>{


try{


const customerId = localStorage.getItem("id");


if(
!customerId ||
!form.pickupAddress ||
!form.deliveryAddress ||
!form.receiverName ||
!form.receiverPhone ||
!form.weight
){

alert("All fields are required");
return;

}



if(form.receiverPhone.length !== 10){

alert("Phone must be 10 digits");
return;

}



const res = await API.post(
"/shipment/book",
{

...form,

customerId,

pickupLocation:{
lat:21.1702,
lng:72.8311
},

deliveryLocation:{
lat:21.1702,
lng:72.8311
}

}

);



alert(
"✅ Booking Success\nTracking ID: "
+res.data.trackingId
);



setForm({

pickupAddress:"",
deliveryAddress:"",
receiverName:"",
receiverPhone:"",
weight:""

});



}catch(err){

alert(
err.response?.data ||
"Booking failed"
);

}



};





const change=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





return (

<div
style={{

minHeight:"100vh",

background:"#f8fafc",

padding:"40px"

}}
>


<button

onClick={()=>navigate("/customer/dashboard")}

style={{

background:"#64748b",

color:"#fff",

border:"none",

padding:"10px 18px",

borderRadius:"8px",

cursor:"pointer"

}}

>
← Dashboard
</button>




<div

style={{

maxWidth:"500px",

margin:"30px auto",

background:"#fff",

padding:"30px",

borderRadius:"20px",

boxShadow:"0 5px 20px #ddd"

}}

>


<h2
style={{
textAlign:"center"
}}
>
📦 Book Courier
</h2>




{

[
["pickupAddress","Pickup Address"],
["deliveryAddress","Delivery Address"],
["receiverName","Receiver Name"],
["receiverPhone","Receiver Phone"]

].map(item=>(


<input

key={item[0]}

name={item[0]}

placeholder={item[1]}

value={form[item[0]]}

onChange={change}

style={inputStyle}

/>


))

}





<input

name="weight"

type="number"

placeholder="Weight (kg)"

value={form.weight}

onChange={change}

style={inputStyle}

/>




<button

onClick={submit}

style={buttonStyle}

>

Submit Booking

</button>



</div>


</div>


);

}



const inputStyle={

width:"100%",

padding:"12px",

marginBottom:"15px",

borderRadius:"8px",

border:"1px solid #cbd5e1",

fontSize:"15px",

boxSizing:"border-box"

};



const buttonStyle={

width:"100%",

padding:"14px",

background:"#2563eb",

color:"#fff",

border:"none",

borderRadius:"8px",

fontWeight:"bold",

cursor:"pointer",

fontSize:"16px"

};



export default BookCourier;