import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./Staff.css";

function Staff() {

  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  // Load Staff
  const loadStaff = async () => {
    try {

      const res = await API.get("/admin/staff");
      setStaff(res.data);

    } catch {

      alert("Error loading staff");

    }
  };


  useEffect(() => {

    loadStaff();

  }, []);



  // Add Staff
  const addStaff = async () => {

    if (
      !newStaff.name ||
      !newStaff.email ||
      !newStaff.password
    ) {
      return alert("All fields required");
    }


    try {

      await API.post("/admin/staff", newStaff);


      setNewStaff({
        name: "",
        email: "",
        password: ""
      });


      loadStaff();


    } catch {

      alert("Failed to add staff");

    }

  };




  // Delete Staff
  const deleteStaff = async (id) => {

    if (!window.confirm("Are you sure to delete this staff?"))
      return;


    try {

      await API.delete(`/admin/staff/${id}`);

      loadStaff();


    } catch {

      alert("Failed to delete staff");

    }

  };





  // Search Filter
  const filteredStaff = staff.filter(s =>

    (s.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    (s.email || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

  );





  return (

    <div className="staff-container">


      {/* Header */}

      <div className="staff-header">


        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Dashboard
        </button>



        <h2>
          Staff Management
        </h2>



        <span className="staff-count">
          {filteredStaff.length} Members
        </span>


      </div>





      <div className="staff-top">


        {/* Add Staff */}

        <div className="staff-form">

          <h3>
            Add New Staff
          </h3>



          <input
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) =>
              setNewStaff({
                ...newStaff,
                name:e.target.value
              })
            }
          />



          <input
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) =>
              setNewStaff({
                ...newStaff,
                email:e.target.value
              })
            }
          />



          <input
            type="password"
            placeholder="Password"
            value={newStaff.password}
            onChange={(e) =>
              setNewStaff({
                ...newStaff,
                password:e.target.value
              })
            }
          />



          <button
            onClick={addStaff}
            className="add-btn"
          >
            + Add Staff
          </button>


        </div>





        {/* Search */}

        <div className="staff-search">

          <input

            placeholder="Search by name or email..."

            value={searchTerm}

            onChange={(e)=>
              setSearchTerm(e.target.value)
            }

          />

        </div>



      </div>






      {/* Staff Cards */}

      <div className="staff-cards">


        {
          filteredStaff.length === 0 &&

          <p>
            No staff found.
          </p>
        }




        {
          filteredStaff.map(s => (


            <div
              className="staff-card"
              key={s._id}
            >



              <div className="staff-initial">

                {
                  (s.name || "U")
                  .charAt(0)
                  .toUpperCase()
                }

              </div>





              <h4>
                {s.name}
              </h4>



              <p>
                {s.email}
              </p>





              <button

                className="delete-btn"

                onClick={() =>
                  deleteStaff(s._id)
                }

              >

                Delete

              </button>




            </div>


          ))
        }


      </div>



    </div>

  );

}


export default Staff;