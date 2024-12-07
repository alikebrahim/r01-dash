import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DecodeQuery } from '../utils/helpers';
import { DataBody } from '../utils/dataBody';

const UserDataCard = ({ token, dataCode, userID }) => {
  const [userData, setUserData] = useState(null);

  // fetch the righ query
  // NOTE: should I also fetch a marker for css classname here?
  let query = DecodeQuery(dataCode, userID)

  useEffect(() => {
    axios.post('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
      query: query
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // NOTE: data includes: login, campus, email, firstname
        setUserData(response.data.data)
        console.log("Data (" + dataCode + "):", userData)
      })
      .catch(error => console.error('Error fetching stats:', error));
  }, [token, dataCode]);

  return (
    <div>
      {userData ? (
        DataBody(dataCode, userData)
      ) : <p>Loading data...</p>}
    </div>
  );
};

export default UserDataCard;
