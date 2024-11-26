import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Inbox from './Inbox';
import Navbar from './Navbar';

function Sent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
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
          <h1 className="text-4xl font-semibold text-gray-800 text-center mt-12 pt-5 mb-6">
            Inbox
          </h1>
          <Inbox folder="sent" />  
        </div>
      </div>
    </div>
  );
}

export default Sent;
