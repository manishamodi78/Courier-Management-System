import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { ArrowLeft, Trash2, Mail } from "lucide-react";
import "./Customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 8;
  const navigate = useNavigate();

  // Load Customers
  const loadCustomers = async () => {
    try {
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
    } catch {
      alert("Error loading customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);


  // Delete Customer
  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await API.delete(`/admin/customer/${id}`);
      loadCustomers();
    } catch {
      alert("Delete failed");
    }
  };


  // Filter Customers
  const filtered = customers.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (c.email || "").toLowerCase().includes(search.toLowerCase())
  );


  // Pagination
  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;

  const currentCustomers = filtered.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filtered.length / customersPerPage
  );


  return (
    <div className="customer-container">

      {/* Header */}
      <div className="customer-header">

        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>


        <h1>
          Customer Management
          <span className="customer-count">
            {filtered.length}
          </span>
        </h1>

      </div>



      {/* Search */}
      <div className="search-wrapper">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>




      {/* Customer Table */}
      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {currentCustomers.length === 0 && (
              <tr>
                <td colSpan="3" className="no-data">
                  No customers found
                </td>
              </tr>
            )}



            {currentCustomers.map((c) => (

              <tr key={c._id}>


                <td>

                  <div className="name-avatar">

                    <div className="avatar">
                      {(c.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>


                    {c.name}

                  </div>

                </td>



                <td>
                  <Mail size={14} />
                  {c.email}
                </td>



                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCustomer(c._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </td>


              </tr>

            ))}

          </tbody>


        </table>

      </div>




      {/* Pagination */}
      {totalPages > 1 && (

        <div className="pagination">


          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Prev
          </button>



          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((page) => (

            <button
              key={page}
              className={
                page === currentPage
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCurrentPage(page)
              }
            >
              {page}
            </button>

          ))}




          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>


        </div>

      )}

    </div>
  );
}