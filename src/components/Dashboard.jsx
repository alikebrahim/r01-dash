import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserDataCard from './DataCard.jsx'

const Dashboard = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);

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
              firstName
              lastName
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
      setUserData(response.data.data.user[0]);
    }).catch(error => {
      console.error('Error fetching dashboard data:', error);
      logout();
    });
  }, [navigate]);

  //NOTE: button in below jsx to be moved to a navbar
  return (
    <div>
      {userID ? <p>Welcome to your dashboard, {userData.firstName} {userData.lastName}!</p> : <p>Loading...</p>}
      <button onClick={logout}>Logout</button>
      <UserDataCard token={localStorage.getItem('token')} dataCode="dashboard" userID={userID}></UserDataCard>
      <UserDataCard token={localStorage.getItem('token')} dataCode="audit" userID={userID}></UserDataCard>
      <UserDataCard token={localStorage.getItem('token')} dataCode="xp" userID={userID}></UserDataCard>
      <UserDataCard token={localStorage.getItem('token')} dataCode="lastProjects" userID={userID}></UserDataCard>
      <UserDataCard token={localStorage.getItem('token')} dataCode="skills" userID={userID}></UserDataCard>
    </div>
  );
};

export default Dashboard;
