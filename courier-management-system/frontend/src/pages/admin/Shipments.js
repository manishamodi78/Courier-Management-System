


import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Trash2, CheckCircle, User, Calendar } from "lucide-react";
import "./Shipments.css";

export default function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const shipmentsPerPage = 8;
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const s = await API.get("/admin/shipments");
      const st = await API.get("/admin/staff");
      setShipments(s.data);
      setStaff(st.data);
    } catch {
      alert("Error loading shipments");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const assignStaff = async (shipmentId, staffId) => {
    if (!staffId) return;
    try {
      await API.post("/admin/assign", { shipmentId, staffId });
      loadData();
    } catch {
      alert("Assignment failed");
    }
  };

  // const markDelivered = async (id) => {
  //   try {
  //     await API.put(`/admin/shipment/${id}`, { status: "Delivered" });
  //     loadData();
  //   } catch {
  //     alert("Status update failed");
  //   }
  // };

const markDelivered = async (id) => {
  try {
    const shipment = shipments.find(s => s._id === id);

    if (!shipment) return;

    let status = shipment.status;


    if (status === "Booked") {
      await API.put(`/shipment/${id}`, {
        status: "Picked"
      });

      await API.put(`/shipment/${id}`, {
        status: "In Transit"
      });

    } 
    else if (status === "Picked") {

      await API.put(`/shipment/${id}`, {
        status: "In Transit"
      });

    }


    await API.put(`/shipment/${id}`, {
      status: "Delivered"
    });


    alert("Shipment Delivered Successfully");

    loadData();


  } catch (error) {

    console.log(error);
    alert("Status update failed");

  }
};

  const deleteShipment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await API.delete(`/admin/shipment/${id}`);
      loadData();
    } catch {
      alert("Delete failed");
    }
  };

  const filtered = shipments
    .filter(s => s.trackingId.toLowerCase().includes(search.toLowerCase()))
    .filter(s => statusFilter === "All" || s.status.toLowerCase() === statusFilter.toLowerCase())
    .sort((a, b) => sortOrder === "Newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));

  const indexOfLast = currentPage * shipmentsPerPage;
  const indexOfFirst = indexOfLast - shipmentsPerPage;
  const currentShipments = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / shipmentsPerPage);

  return (
    <div className="shipments-container">
      <div className="shipments-header">
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Shipments Portal</h1>
        <p>Total Shipments: <span className="badge">{filtered.length}</span></p>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Tracking ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="dropdowns">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Picked">Picked</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Staff</th>
              <th>Date</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.length > 0 ? currentShipments.map(s => (
              <tr key={s._id}>
                <td><span className="tracking">{s.trackingId}</span></td>
                <td>
                  <div className="cust-name">{s.customerId?.name || "Guest"}</div>
                  <div className="cust-email">{s.customerId?.email || "N/A"}</div>
                </td>
                <td><StatusBadge status={s.status} /></td>
                <td>{s.assignedStaff ? <span className="staff"><User size={12} /> {s.assignedStaff.name}</span> : <span className="unassigned">❌ Not Assigned</span>}</td>
                <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  {!s.assignedStaff &&
                    <select onChange={e => assignStaff(s._id, e.target.value)}>
                      <option value="">Assign</option>
                      {staff.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
                    </select>
                  }
                  <button className="delivered-btn" onClick={() => markDelivered(s._id)}><CheckCircle size={18} /></button>
                  <button className="delete-btn" onClick={() => deleteShipment(s._id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="no-data">No shipments found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 &&
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >{page}</button>
          ))}
        </div>
      }
    </div>
  );
}

const StatusBadge = ({ status }) => {
  const colors = {
    delivered: { bg: "#dcfce7", text: "#166534" },
    picked: { bg: "#dbeafe", text: "#1e40af" },
     "in transit": { bg: "#ede9fe", text: "#6d28d9" },
    pending: { bg: "#fef3c7", text: "#92400e" }
  };
  const current = colors[status.toLowerCase()] || colors.pending;
  return <span className="status-badge" style={{ backgroundColor: current.bg, color: current.text }}>{status}</span>;
};