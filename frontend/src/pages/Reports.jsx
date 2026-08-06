import React, { useState } from 'react';

function Reports() {
  const [reportType, setReportType] = useState('attendance');

  const handleDownload = (type) => {
    alert(`Downloading ${type.toUpperCase()} Report...`);
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>📈 System Reports & Analytics</h2>
      <hr style={{ borderColor: '#334155', marginBottom: '20px' }} />

      {/* Report Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Attendance Report Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>📅 Attendance Report</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Generate and download monthly employee attendance logs.
          </p>
          <button 
            onClick={() => handleDownload('attendance')}
            style={{ padding: '10px 15px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
          >
            📥 Download CSV
          </button>
        </div>

        {/* Leave Report Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>📝 Leave Request Summary</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Export approved and pending leave request summaries.
          </p>
          <button 
            onClick={() => handleDownload('leave')}
            style={{ padding: '10px 15px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
          >
            📥 Download CSV
          </button>
        </div>

        {/* Employee Roster Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>👥 Employee Directory</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            Get complete list of all active employees and details.
          </p>
          <button 
            onClick={() => handleDownload('employee')}
            style={{ padding: '10px 15px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
          >
            📥 Download CSV
          </button>
        </div>

      </div>
    </div>
  );
}

export default Reports;