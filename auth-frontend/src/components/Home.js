import React from "react";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Employee Management System</h1>
      <p>Manage your employees efficiently with our system.</p>

      <section>
        <h2>Dashboard</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li><strong>Total Employees:</strong> 120</li>
          <li><strong>Departments:</strong> 5</li>
          <li><strong>Recently Added:</strong> John Doe</li>
        </ul>
      </section>

      <button 
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          marginTop: "15px",
          cursor: "pointer"
        }}
        onClick={() => alert("Navigate to Add Employee Page")}
      >
        Add Employee
      </button>
    </div>
  );
}

export default Home;
