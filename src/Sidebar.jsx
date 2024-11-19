import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Sidebar({ isOpen }) {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle button click and navigate to a new page
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div 
      className={`lg:w-64 w-full bg-gray-800 text-white fixed top-0 left-0 h-screen p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:sticky`} 
      style={{ zIndex: 10, top: '4rem' }} // Set the top to be below the navbar
    >
      <div className="space-y-4">
        {/* Sidebar Menu Items */}
        <button 
          className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded"
          onClick={() => handleNavigation('/home')} // Navigate to /home when clicked
        >
          <span>Inbox</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Starred</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Snoozed</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Sent</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Drafts</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Important</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
          <span>Schedule</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
