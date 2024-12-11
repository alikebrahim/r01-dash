import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DecodeQuery } from '../utils/helpers';
import { DataBody } from '../utils/dataBody';

const UserDataCard = ({ token, dataCode, userID }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Ensure all required data is present before making the API call
    if (!token || !userID) return;

    const query = DecodeQuery(dataCode, userID);

    const APICALL = async () => {
      try {
        const response = await axios.post(
          'https://learn.reboot01.com/api/graphql-engine/v1/graphql',
          { query },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    APICALL();
  }, [token, dataCode, userID]);
  console.log("(" + dataCode + ")", userData)

  return (
    <div>
      {userData ? (
        <DataBody dataCode={dataCode} userData={userData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default UserDataCard;
