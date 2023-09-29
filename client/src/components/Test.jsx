// src/ApiComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApiComponent() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.post('/api/get-contracts') // Relative URL to the Express API
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      <p>{data.message}</p>
    </div>
  );
}

export default ApiComponent;
