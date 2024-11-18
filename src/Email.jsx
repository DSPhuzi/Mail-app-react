import React from 'react'

function Email() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
    <div className="flex items-center space-x-4 w-full">
      <img 
        src="https://www.w3schools.com/w3images/avatar2.png" 
        alt="Avatar" 
        className="w-10 h-10 rounded-full" 
      />
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-gray-800 text-left">John Doe</h2>
        <p className="text-gray-600 text-left">Subject: Meeting at 3PM</p>
      </div>
    </div>
    <span className="text-gray-500 hidden sm:block">10:30 AM</span>
    <div className="flex space-x-3">
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

  )
}

export default Email