import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.post('https://learn.reboot01.com/api/graphql-engine/v1/graphql',
      {
        query: `
          {
            user {
              id
              profile
            }
          }
        `
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      setData(response.data);
      console.log('User Data:', response.data);
    }).catch(error => {
      console.error('Error fetching dashboard data:', error);
      logout();
    });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {data ? <p>Welcome to your dashboard!</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
