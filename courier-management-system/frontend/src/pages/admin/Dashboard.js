import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import {
  UserPlus,
  Package,
  Users2,
  Clock,
  CheckCircle,
} from "lucide-react";


const Dashboard = () => {

  const [report, setReport] = useState({});
  const navigate = useNavigate();


  // Load dashboard reports
  const loadReports = async () => {
    try {
      const res = await API.get("/admin/reports");
      setReport(res.data || {});
    } catch {
      alert("Error loading reports");
    }
  };


  useEffect(() => {
    loadReports();
  }, []);



  // Chart Data
  const statusData = [
    {
      name: "Delivered",
      value: report.delivered || 0,
      color: "#22c55e",
    },
    {
      name: "Pending",
      value: report.pending || 0,
      color: "#f59e0b",
    },
  ];



  return (

    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >


      {/* Navigation */}

      <div style={navStyle}>

        <div
          style={activePill}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </div>


        <div
          style={pill}
          onClick={() => navigate("/admin/shipments")}
        >
          Shipments
        </div>


        <div
          style={pill}
          onClick={() => navigate("/admin/staff")}
        >
          Staff
        </div>


        <div
          style={pill}
          onClick={() => navigate("/admin/customers")}
        >
          Customers
        </div>

      </div>



      <div style={{ padding: "30px" }}>



        {/* Statistics Cards */}

        <div style={gridStyle}>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/shipments")}
          >
            <StatCard
              color="#f43f5e"
              title="Total Shipments"
              count={report.total || 0}
              icon={<Package size={28} />}
            />
          </div>


          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/shipments")}
          >
            <StatCard
              color="#22c55e"
              title="Delivered"
              count={report.delivered || 0}
              icon={<CheckCircle size={28} />}
            />
          </div>


          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/shipments")}
          >
            <StatCard
              color="#f59e0b"
              title="Pending"
              count={report.pending || 0}
              icon={<Clock size={28} />}
            />
          </div>

        </div>





        {/* Staff & Customer Actions */}

        <div style={actionWrapper}>

          <div
            style={actionCard}
            onClick={() => navigate("/admin/staff")}
          >

            <div style={iconCircle}>
              <UserPlus color="#3b82f6" size={20} />
            </div>


            <div>
              <h4 style={titleStyle}>
                Manage Staff
              </h4>

              <small style={smallStyle}>
                Add or view staff members
              </small>
            </div>

          </div>




          <div
            style={actionCard}
            onClick={() => navigate("/admin/customers")}
          >

            <div style={iconCircle}>
              <Users2 color="#8b5cf6" size={20} />
            </div>


            <div>

              <h4 style={titleStyle}>
                Customers
              </h4>

              <small style={smallStyle}>
                View customer database
              </small>

            </div>

          </div>

        </div>






        {/* Summary & Chart */}

        <div style={chartGrid}>


          <div style={panelBox}>

            <h3 style={heading}>
              Parcel Status Summary
            </h3>


            <table style={tableStyle}>

              <thead>

                <tr style={headerRow}>

                  <th style={thStyle}>
                    Status Type
                  </th>


                  <th style={rightTh}>
                    Count
                  </th>

                </tr>

              </thead>



              <tbody>


                <tr style={rowStyle}>
                  <td style={tdStyle}>
                    Total Lifecycle Orders
                  </td>

                  <td style={rightTd}>
                    <b>{report.total || 0}</b>
                  </td>
                </tr>



                <tr style={rowStyle}>
                  <td style={tdStyle}>
                    Successfully Delivered
                  </td>

                  <td style={greenTd}>
                    <b>{report.delivered || 0}</b>
                  </td>
                </tr>



                <tr>

                  <td style={tdStyle}>
                    Current Pending
                  </td>


                  <td style={orangeTd}>
                    <b>{report.pending || 0}</b>
                  </td>

                </tr>


              </tbody>


            </table>


          </div>





          <div style={panelBox}>

            <h3 style={heading}>
              Delivery Performance
            </h3>


            <div style={{ height: "280px" }}>


              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>


                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={8}
                    cornerRadius={6}
                    stroke="none"
                  >

                    {statusData.map((item, index) => (

                      <Cell
                        key={index}
                        fill={item.color}
                      />

                    ))}

                  </Pie>


                  <Tooltip />


                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                  />


                </PieChart>


              </ResponsiveContainer>


            </div>


          </div>


        </div>


      </div>


    </div>

  );
};





// Components

const StatCard = ({ color, title, count, icon }) => (

  <div style={{
    backgroundColor: color,
    color: "#fff",
    padding: "25px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
  }}>

    <div>

      <p style={{
        margin:0,
        fontSize:"13px"
      }}>
        {title}
      </p>


      <h2>
        {count}
      </h2>

    </div>


    <div>
      {icon}
    </div>


  </div>

);





// Styles

const navStyle = {
  background:"#fff",
  padding:"12px 30px",
  display:"flex",
  gap:"12px",
  borderBottom:"1px solid #e2e8f0",
};


const pill = {
  padding:"10px 22px",
  borderRadius:"25px",
  background:"#f1f5f9",
  cursor:"pointer",
};


const activePill = {
  ...pill,
  background:"#3b82f6",
  color:"#fff",
};


const gridStyle = {
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"20px",
  marginBottom:"30px",
};


const actionWrapper = {
  display:"flex",
  gap:"20px",
  marginBottom:"30px",
};


const actionCard = {
  flex:1,
  background:"#fff",
  padding:"18px",
  borderRadius:"12px",
  display:"flex",
  alignItems:"center",
  gap:"15px",
  cursor:"pointer",
};


const iconCircle = {
  padding:"12px",
  borderRadius:"10px",
  background:"#eff6ff",
};


const chartGrid = {
  display:"grid",
  gridTemplateColumns:"1.2fr 1fr",
  gap:"25px",
};


const panelBox = {
  background:"#fff",
  padding:"25px",
  borderRadius:"15px",
};


const heading = {
  fontSize:"16px",
};


const tableStyle = {
  width:"100%",
};


const thStyle = {
  padding:"12px",
};


const rightTh = {
  ...thStyle,
  textAlign:"right",
};


const tdStyle = {
  padding:"16px",
};


const rightTd = {
  ...tdStyle,
  textAlign:"right",
};


const greenTd = {
  ...rightTd,
  color:"#16a34a",
};


const orangeTd = {
  ...rightTd,
  color:"#d97706",
};


const headerRow = {
  borderBottom:"2px solid #f1f5f9",
};


const rowStyle = {
  borderBottom:"1px solid #f8fafc",
};


const titleStyle = {
  margin:0,
};


const smallStyle = {
  color:"#64748b",
};



export default Dashboard;