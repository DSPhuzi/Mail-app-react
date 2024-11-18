import React from 'react';

function Sidebar({ isOpen }) {
  return (
    <div 
      className={`lg:w-64 w-full bg-gray-800 text-white fixed top-0 left-0 h-screen p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:sticky`} // Apply 'sticky' only for large screens
      style={{ zIndex: 0, top: '4rem' }} // Set the top to be below the navbar
    >
      <div className="space-y-4">
        {/* Sidebar Menu Items */}
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-700 p-2 rounded">
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
