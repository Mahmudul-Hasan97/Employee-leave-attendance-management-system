import React, { useState } from 'react';

function Profile() {
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'employee';

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('❌ New passwords do not match!');
      return;
    }
    // API Integration call can be added here
    setMessage('✅ Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>👤 User Profile</h2>
      <hr style={{ borderColor: '#334155', marginBottom: '20px' }} />

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Profile Details Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', width: '320px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Account Information</h3>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Role:</strong> <span style={{ background: '#0284c7', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px' }}>{role}</span></p>
          <p><strong>Status:</strong> Active</p>
        </div>

        {/* Password Reset Card */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', width: '350px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Change Password</h3>
          {message && <p style={{ fontSize: '14px', marginBottom: '10px' }}>{message}</p>}
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
              style={{ padding: '10px', borderRadius: '5px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
              style={{ padding: '10px', borderRadius: '5px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
              style={{ padding: '10px', borderRadius: '5px', background: '#0f172a', border: '1px solid #475569', color: '#fff' }}
            />
            <button type="submit" style={{ padding: '10px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;