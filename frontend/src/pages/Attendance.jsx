import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');

  const fetchAttendance = () => {
    axios.get("http://127.0.0.1:8000/attendance/")
      .then(res => setAttendanceList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchAttendance(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/attendance/", { employee_name: employeeName, date: date, status: status });
      fetchAttendance();
      setEmployeeName('');
      setDate('');
    } catch (error) {
      console.error("Error adding attendance", error);
    }
  };

  return (
    <div>
      <h2>Attendance Log</h2>
      
      <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Employee Name" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required style={{ padding: '8px' }} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ padding: '8px' }} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: '8px' }}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', background: '#2196f3', color: '#fff', border: 'none', borderRadius: '4px' }}>Mark Attendance</button>
      </form>

      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>ID</th><th>Employee Name</th><th>Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map(att => (
            <tr key={att.id}>
              <td>{att.id}</td><td>{att.employee_name}</td><td>{att.date}</td>
              <td style={{ color: att.status === 'Present' ? 'green' : 'red', fontWeight: 'bold' }}>
                {att.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;