import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmailRead from './EmailRead';
import API from './authService'; // Assuming this handles API requests

function Emailview() {
  const { emailId } = useParams(); // Extract emailId from URL
  const [email, setEmail] = useState(null); // State to store the email data

  // Fetch email data based on the emailId
  useEffect(() => {
    // Replace with your actual API call to fetch email by ID
    API.get(`/emails/${emailId}`)
      .then((response) => {
        setEmail(response.data); // Set the email data
      })
      .catch((error) => {
        console.error('Error fetching email:', error);
      });
  }, [emailId]); // Re-fetch when emailId changes

  return (
    <div className="container h-full">
      {email ? (
        <EmailRead email={email} /> // Pass the fetched email to EmailRead
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Emailview;
