import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDataCard from './DataCard.jsx'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

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
      setUserID(response.data.data.user[0].id);
    }).catch(error => {
      console.error('Error fetching dashboard data:', error);
      logout();
    });
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      {userID ? <p>Welcome to your dashboard {userID}!</p> : <p>Loading...</p>}
      <UserDataCard token={localStorage.getItem('token')} dataCode="dashboard" userID={userID}></UserDataCard>
      <UserDataCard token={localStorage.getItem('token')} dataCode="audit" userID={userID}></UserDataCard>
    </div>
  );
};

export default Dashboard;
