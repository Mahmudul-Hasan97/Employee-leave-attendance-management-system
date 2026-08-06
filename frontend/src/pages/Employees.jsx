import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  
  // নতুন: এডিট করার জন্য আইডি ট্র্যাক করা
  const [editingId, setEditingId] = useState(null); 

  const fetchEmp = () => {
    axios.get("http://127.0.0.1:8000/employees/")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchEmp(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // যদি এডিট মোডে থাকে, তাহলে Update API কল হবে
        await axios.put(`http://127.0.0.1:8000/employees/${editingId}`, { name, email, department: dept });
        setEditingId(null);
      } else {
        // যদি নতুন যোগ করে, তাহলে Post API কল হবে
        await axios.post("http://127.0.0.1:8000/employees/", { name, email, department: dept });
      }
      fetchEmp(); 
      setName(''); setEmail(''); setDept(''); 
    } catch (error) {
      console.error("Error saving employee", error);
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setDept(emp.department);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/employees/${id}`);
      fetchEmp(); 
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName(''); setEmail(''); setDept('');
  };

  return (
    <div>
      <h2>Employee Management</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '8px' }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '8px' }} />
        <input placeholder="Department" value={dept} onChange={e => setDept(e.target.value)} required style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', background: editingId ? '#2196f3' : '#4caf50', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {editingId ? 'Update Employee' : 'Add Employee'}
        </button>
        
        {editingId && (
          <button type="button" onClick={cancelEdit} style={{ padding: '8px 15px', cursor: 'pointer', background: '#9e9e9e', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Cancel
          </button>
        )}
      </form>

      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td><td>{emp.name}</td><td>{emp.email}</td><td>{emp.department}</td>
              <td style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleEdit(emp)} style={{ color: 'white', background: '#2196f3', cursor: 'pointer', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Edit</button>
                <button onClick={() => handleDelete(emp.id)} style={{ color: 'white', background: 'red', cursor: 'pointer', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;