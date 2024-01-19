// hello.jsx
import React, { useEffect, useState } from 'react';
import api from '../api'; // Assuming api.js is in the same directory

const Hello = () => {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    // Make an API call to the server endpoint
    api.get('/hello')
      .then(response => {
        setBackendMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setBackendMessage('Error fetching data from backend');
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Hello from Frontend</h1>
      <p>Message from Backend: {backendMessage}</p>
    </div>
  );
};

export default Hello;
