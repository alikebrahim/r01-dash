import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DecodeQuery } from '../utils/helpers';

const UserDataCard = ({ token, queryCode }) => {
  const [stats, setStats] = useState(null);

  let query = DecodeQuery(queryCode)
  useEffect(() => {
    axios.post('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
      query: query
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => setStats(response.data.data.userStats))
      .catch(error => console.error('Error fetching stats:', error));
  }, [token]);

  return (
    <div>
      {stats ? (
        <div>
          <p>Total Posts: {stats.totalPosts}</p>
          <p>Active Status: {stats.activeStatus}</p>
        </div>
      ) : <p>Loading stats...</p>}
    </div>
  );
};

export default UserDataCard
