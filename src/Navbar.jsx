import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import API from './authService';

function Navbar({ toggleSidebar, onSearch, initialSearchQuery }) {
  const [profilePic, setProfilePic] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate('/home', { state: { searchQuery } });
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };
  const handlelogout = async () => {
    try {
      const response = await API.post(`/logout`);
      if (response.status === 204) {
        console.log(`Logout`);
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
    navigate(`/`);
    localStorage.clear();
  };

  return (
    <nav className="bg-indigo-500 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (left) */}
        <div className="text-white text-xl font-semibold flex items-center">
          <img src="your-logo.png" alt="Logo" className="hidden lg:block h-8" />
          <button className="lg:hidden text-white" onClick={toggleSidebar}>
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

        {/* Search box with icon inside (center) */}
        <div className="flex items-center justify-center flex-1">
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="w-full py-2 px-4 pr-10 rounded-full bg-transparent text-white border border-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearchSubmit}
              aria-label="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Profile picture with dropdown (right) */}
        <div className="relative">
          <img
            src={profilePic || 'https://www.w3schools.com/w3images/avatar2.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-white cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onError={(e) => (e.target.src = 'https://www.w3schools.com/w3images/avatar2.png')}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
            
                handlelogout();

                  
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
