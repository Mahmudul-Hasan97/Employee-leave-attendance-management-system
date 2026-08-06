import React, { useState } from 'react';

function Settings() {
  const [departments, setDepartments] = useState(['HR', 'Engineering', 'Marketing', 'Finance']);
  const [newDept, setNewDept] = useState('');

  const handleAddDept = (e) => {
    e.preventDefault();
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
      setNewDept('');
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>⚙️ System Settings</h2>
      <hr style={{ borderColor: '#334155', marginBottom: '20px' }} />

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Department Configuration Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', width: '350px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Manage Departments</h3>
          
          <form onSubmit={handleAddDept} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="New Department"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              style={{ padding: '8px', borderRadius: '5px', background: '#0f172a', border: '1px solid #475569', color: '#fff', flex: 1 }}
            />
            <button type="submit" style={{ padding: '8px 15px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Add
            </button>
          </form>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {departments.map((dept, idx) => (
              <li key={idx} style={{ background: '#0f172a', padding: '10px', borderRadius: '5px', marginBottom: '8px', border: '1px solid #334155' }}>
                📁 {dept}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Settings;