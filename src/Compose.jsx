import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Message from './Message';
import Navbar from './Navbar';

function Compose() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container h-full">
      {/* Navbar with sidebar toggle */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar with 100vh height */}
        <Sidebar isOpen={isSidebarOpen} className="h-[100vh]" /> {/* Sidebar height set to full viewport height */}

        {/* Main content */}
        <div className="flex-1 p-4">
          <Message />
        </div>
      </div>
    </div>
  );
}

export default Compose;
