import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // API Call to Backend
      const res = await axios.post("http://https://ems-backend-maog.onrender.com/auth/login", { username, password });
      
      // Extract Data
      const { access_token, role } = res.data;
      
      // LocalStorage-এ সিকিউর টোকেন ও রোল সেভ করা
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      
      setToken(access_token);
      
    } catch (err) {
      setError("Invalid Username or Password!");
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
      background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff' 
    }}>
      <div style={{ 
        background: '#1e293b', padding: '40px', borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '360px', textAlign: 'center',
        border: '1px solid #334155'
      }}>
        
        <h1 style={{ margin: '0 0 5px 0', color: '#38bdf8', fontSize: '28px' }}>EMS Portal</h1>
        <p style={{ margin: '0 0 25px 0', color: '#94a3b8', fontSize: '13px', fontWeight: 'bold' }}>
          Employee Management System
        </p>
        
        <h3 style={{ marginBottom: '20px', color: '#f8fafc', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
          Account Login
        </h3>
        
        {error && <p style={{ color: '#f87171', marginBottom: '15px', fontWeight: 'bold', fontSize: '14px' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ 
              padding: '12px', borderRadius: '6px', border: '1px solid #475569', 
              background: '#0f172a', color: '#fff', fontSize: '14px', outline: 'none' 
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ 
              padding: '12px', borderRadius: '6px', border: '1px solid #475569', 
              background: '#0f172a', color: '#fff', fontSize: '14px', outline: 'none' 
            }}
          />
          <button type="submit" style={{ 
            padding: '12px', background: '#0284c7', color: '#fff', border: 'none', 
            borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px',
            transition: 'background 0.3s'
          }}>
            Login
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;