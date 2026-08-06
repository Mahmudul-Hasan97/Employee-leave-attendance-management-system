import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ total_employees: 0, present: 0, absent: 0, pending_leave: 0 });

  useEffect(() => {
    // Fetching data from the backend API
    axios.get("http://https://ems-backend-maog.onrender.com/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const cardStyle = { padding: '20px', borderRadius: '8px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ ...cardStyle, background: '#e3f2fd', borderBottom: '4px solid #2196f3' }}>
          <h3>Total Employees</h3>
          <h1>{stats.total_employees || 0}</h1>
        </div>
        <div style={{ ...cardStyle, background: '#e8f5e9', borderBottom: '4px solid #4caf50' }}>
          <h3>Present Today</h3>
          <h1>{stats.present || 0}</h1>
        </div>
        <div style={{ ...cardStyle, background: '#ffebee', borderBottom: '4px solid #f44336' }}>
          <h3>Absent Today</h3>
          <h1>{stats.absent || 0}</h1>
        </div>
        <div style={{ ...cardStyle, background: '#fff3e0', borderBottom: '4px solid #ff9800' }}>
          <h3>Pending Leave</h3>
          <h1>{stats.pending_leave || 0}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;