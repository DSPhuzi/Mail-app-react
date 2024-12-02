import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Inbox from './Inbox';
import Navbar from './Navbar';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Retrieve search query from location state if present
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery.toLowerCase());
    }
  }, [location.state]);

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
      <Navbar
        toggleSidebar={toggleSidebar}
        onSearch={handleSearch}
        initialSearchQuery={searchQuery} // Pass the current search query
      />

      {/* Main content area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 p-4">
          <h1 className="text-4xl font-semibold text-gray-800 text-center mt-12 pt-5 mb-6">
            Inbox
          </h1>
          {/* Render Inbox component with search query */}
          <Inbox folder="inbox" searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default Home;
