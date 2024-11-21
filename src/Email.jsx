import React from 'react';

function Email() {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-gray-200 rounded-lg w-full xl:space-x-6 2xl:space-x-8">
      {/* Main email content */}
      <div className="flex items-center space-x-4 xl:space-x-6 w-full">
        <img
          src="https://www.w3schools.com/w3images/avatar2.png"
          alt="Avatar"
          className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
        />
        <div className="flex flex-col w-full">
          <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
            John Doe
          </h2>
          <p className="text-gray-600 text-left text-xs xl:text-sm">
            Subject: Meeting at 3PM
          </p>
          {/* Main text - Only show the first line with ellipsis */}
          <p className="text-gray-700 text-left text-xs xl:text-sm line-clamp-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
            erat dui. Sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <span className="text-gray-500 hidden sm:block text-sm xl:text-base 2xl:text-lg">
        10:30 AM
      </span>
      {/* Icons - Only stack vertically on small screens and horizontally on large screens */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0 ml-5 xl:space-x-4 2xl:space-x-6">
        <a href="#" className="text-gray-600 hover:text-yellow-400">
          <i className="fas fa-star"></i>
        </a>
        <a href="#" className="text-gray-600 hover:text-red-400">
          <i className="fas fa-exclamation-circle"></i>
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-400">
          <i className="far fa-square"></i>
        </a>
      </div>
    </div>
  );
}

export default Email;
