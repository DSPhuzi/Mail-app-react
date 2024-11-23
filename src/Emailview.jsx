import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmailRead from './EmailRead';
import API from './authService'; // Assuming this handles API requests
import Sidebar from './Sidebar';
import Navbar from './Navbar';
function Emailview() {
  const { emailId } = useParams(); // Extract emailId from URL
  const [email, setEmail] = useState(null); // State to store the email data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Fetch email data based on the emailId
  useEffect(() => {
    if (!emailId) {
      setError('Invalid email ID.');
      setLoading(false);
      return;
    }

    // Reset the error and set loading true on new emailId change
    setError(null);
    setLoading(true);

    API.get(`/email/${emailId}`)
      .then((response) => {
        setEmail(response.data); // Set the email data
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch((error) => {
        setError('Error fetching email. Please try again later.');
        setLoading(false);
      });
  }, [emailId]); // Re-fetch when emailId changes

  // Conditional rendering based on loading or error states
  if (loading) {
    return (
      <div className="container h-full flex justify-center items-center">
        <p>Loading email...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container h-full flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // If email is not found, show a message
  if (!email) {
    return (
      <div className="container h-full flex justify-center items-center">
        <p className="text-red-600">Email not found.</p>
      </div>
    );
    
  }

  return (
    <div className="container h-full">
          <div className="container">
      {/* Navbar with sidebar toggle */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} /> {/* Sidebar visibility controlled here */}

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Render Inbox component here */}
          <EmailRead email={email} /> {/* Pass the fetched email to EmailRead */}
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default Emailview;
