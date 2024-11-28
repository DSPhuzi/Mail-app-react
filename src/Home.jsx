import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Inbox from './Inbox';
import Navbar from './Navbar';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Callback function to handle search input from Navbar
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase()); // Update search query state
  };

  return (
    <div className="container">
      {/* Navbar with search and sidebar toggle */}
      <Navbar toggleSidebar={toggleSidebar} onSearch={handleSearch} />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} /> {/* Sidebar visibility controlled here */}

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Render Inbox component with search query */}
          <h1 className="text-4xl font-semibold text-gray-800 text-center mt-12 pt-5 mb-6">
            Inbox
          </h1>
          <Inbox folder="inbox" searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default Home;
