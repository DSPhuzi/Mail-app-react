import React, { useEffect, useState } from 'react';

function Navbar({ toggleSidebar, onSearch }) {
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  useEffect(() => {
    // Retrieve the profile picture from localStorage
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update local state
    onSearch(query); // Pass the query to the parent component
  };

  return (
    <nav className="bg-indigo-500 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (left) */}
        <div className="text-white text-xl font-semibold flex items-center">
          <img src="your-logo.png" alt="Logo" className="hidden lg:block h-8" />
          <button
            className="lg:hidden text-white"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Search box (center) */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full lg:w-1/3 py-2 px-4 rounded-full bg-transparent text-white border border-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Profile picture (right) */}
        <div>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white"
              onError={(e) => (e.target.src = 'https://www.w3schools.com/w3images/avatar2.png')}
            />
          ) : (
            <img
            src='https://www.w3schools.com/w3images/avatar2.png'
            alt="Profile"
            className="w-10 h-10 rounded-full border border-white"
            onError={(e) => (e.target.src = 'https://www.w3schools.com/w3images/avatar2.png')}
          />
            
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
