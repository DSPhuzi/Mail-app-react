import React, { useEffect, useState } from 'react';

function Navbar({ toggleSidebar }) {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Retrieve the profile picture from localStorage
    const storedProfilePic = localStorage.getItem('profilePic');

    console.log('Retrieved profile picture from localStorage:', storedProfilePic); // Debugging log

    if (storedProfilePic) {
      setProfilePic(storedProfilePic); // Update state with the profile picture URL
    } else {
      console.warn('No profile picture found in localStorage.');
    }
  }, []);

  return (
    <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (left) */}
        <div className="text-white text-xl font-semibold flex items-center">
          <img src="your-logo.png" alt="Logo" className="hidden lg:block h-8" />
          <button
            className="lg:hidden text-white"
            onClick={toggleSidebar} // Sidebar toggle
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
            className="w-full lg:w-1/3 py-2 px-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Profile picture (right) */}
        <div>
          {profilePic ? (
            <img
              src={profilePic} // Render the profile picture
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white"
              onError={(e) => {
                e.target.src = 'default-profile-pic-url.jpg'; // Fallback to a default image if loading fails
                console.error('Failed to load profile picture:', e.target.src);
              }}
            />
          ) : (
            <span className="text-white">Loading...</span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
