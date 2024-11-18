import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo (left) */}
        <div className="text-white text-xl font-semibold flex items-center">
          {/* Logo on large screens */}
          <img src="your-logo.png" alt="Logo" className="hidden lg:block h-8" />
          
          {/* Hamburger Menu on small screens */}
          <button 
            className="lg:hidden text-white"
            onClick={toggleSidebar} // This triggers the sidebar toggle
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
          <img src="your-profile-pic.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
