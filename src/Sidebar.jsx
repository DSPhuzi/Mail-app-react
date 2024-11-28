import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`lg:w-64 w-full bg-gray-50 text-gray-800 fixed top-0 left-0 h-screen p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:sticky`}
      style={{ zIndex: 10 }}
    >
      {/* Add margin-top to ensure it starts below the navbar */}
      <div className="mt-16 space-y-4">
        {/* Sidebar Menu Items */}
        <button
          className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded"
          onClick={() => handleNavigation('/home')}
        >
          <i className="fas fa-inbox text-gray-600"></i>
          <span>Inbox</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded">
          <i className="fas fa-star text-yellow-500"></i>
          <span>Starred</span>
        </button>
        <button
          className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded"
          onClick={() => handleNavigation('/archive')}
        >
          <i className="fas fa-archive text-gray-600"></i>
          <span>Archive</span>
        </button>
        <button
          className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded"
          onClick={() => handleNavigation('/sent')}
        >
          <i className="fas fa-paper-plane text-blue-500"></i>
          <span>Sent</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded">
          <i className="fas fa-file-alt text-gray-600"></i>
          <span>Drafts</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded">
          <i className="fas fa-exclamation-circle text-red-500"></i>
          <span>Important</span>
        </button>
        <button className="flex items-center space-x-3 w-full text-left hover:bg-gray-100 p-2 rounded">
          <i className="fas fa-calendar-alt text-gray-600"></i>
          <span>Schedule</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
