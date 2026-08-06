import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('Sick Leave');

  const fetchLeaves = () => {
    axios.get("http://127.0.0.1:8000/leave/")
      .then(res => setLeaves(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/leave/", { employee_name: employeeName, leave_type: leaveType });
      fetchLeaves();
      setEmployeeName('');
    } catch (error) {
      console.error("Error requesting leave", error);
    }
  };

  // নতুন যোগ করা হলো: স্ট্যাটাস আপডেট করার ফাংশন
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/leave/${id}?status=${newStatus}`);
      fetchLeaves();
    } catch (error) {
      console.error("Error updating leave status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/leave/${id}`);
      fetchLeaves();
    } catch (error) {
      console.error("Error deleting leave", error);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      
      <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Employee Name" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required style={{ padding: '8px' }} />
        <select value={leaveType} onChange={e => setLeaveType(e.target.value)} style={{ padding: '8px' }}>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', background: '#ff9800', color: '#fff', border: 'none', borderRadius: '4px' }}>Request Leave</button>
      </form>

      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>ID</th><th>Employee Name</th><th>Leave Type</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.id}>
              <td>{leave.id}</td><td>{leave.employee_name}</td><td>{leave.leave_type}</td>
              <td>
                <span style={{ 
                  padding: '4px 8px', borderRadius: '4px', color: '#000',
                  background: leave.status === 'Approved' ? '#c8e6c9' : leave.status === 'Rejected' ? '#ffcdd2' : '#fff9c4' 
                }}>
                  {leave.status}
                </span>
              </td>
              <td style={{ display: 'flex', gap: '8px' }}>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => handleUpdateStatus(leave.id, 'Approved')} style={{ color: 'white', background: 'green', cursor: 'pointer', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Approve</button>
                    <button onClick={() => handleUpdateStatus(leave.id, 'Rejected')} style={{ color: 'white', background: 'orange', cursor: 'pointer', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Reject</button>
                  </>
                )}
                <button onClick={() => handleDelete(leave.id)} style={{ color: 'white', background: 'red', cursor: 'pointer', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leave;