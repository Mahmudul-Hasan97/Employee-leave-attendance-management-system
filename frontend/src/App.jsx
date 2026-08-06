import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '240px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#38bdf8', fontSize: '20px', marginBottom: '30px' }}>⚡ EMS Portal</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'employees', label: '👥 Employees' },
            { id: 'attendance', label: '📅 Attendance' },
            { id: 'leave', label: '📝 Leave Requests' },
            { id: 'reports', label: '📈 Reports' },
            { id: 'profile', label: '👤 Profile' },
            { id: 'settings', label: '⚙️ Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                textAlign: 'left',
                padding: '12px 15px',
                background: activeTab === item.id ? '#0284c7' : 'transparent',
                color: activeTab === item.id ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: '0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{ padding: '12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'employees' && <Employees />}
        {activeTab === 'attendance' && <Attendance />}
        {activeTab === 'leave' && <Leave />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
}

export default App;