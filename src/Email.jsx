import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineInboxArrowDown } from 'react-icons/hi2';
import API from './authService';

function Email({ email }) {
  const {
    id,
    sender_username,
    sender,
    pfp,
    recipients,
    subject,
    body,
    timestamp,
    archived,
  } = email; // Include `archived` in destructuring
  const [isArchived, setIsArchived] = useState(archived); // Local state for archive toggle
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate to detailed email view
  const handleEmailClick = () => {
    navigate(`/emailview/${id}`);
  };

  // Toggle archive state and reload page after archiving
  const handleArchiveClick = async (e) => {
    e.stopPropagation(); // Prevent parent click event

    const newArchivedState = !isArchived;
    try {
      const response = await API.put(`/email/${id}`, {
        archived: newArchivedState,
      });

      if (response.status === 204) {
        console.log(`Email with ID ${id} ${newArchivedState ? 'archived' : 'unarchived'} successfully`);
        setIsArchived(newArchivedState); // Update local state

        // Force reload by updating the location.href
        window.location.href = window.location.href;
      } else {
        console.error(`Failed to update email with ID ${id}`);
      }
    } catch (error) {
      console.error('An error occurred while updating the email:', error);
    }
  };

  const isSent = location.pathname === '/sent'; // Check if the current route is 'sent'

  // Dynamic recipients display
  const recipientList = Array.isArray(recipients) ? recipients : recipients.split(',');
  const displayedRecipients = recipientList.slice(0, 1).join(', '); // First recipient
  const remainingRecipients = recipientList.length > 1 ? '...' : ''; // "..." if more recipients

  return (
    <div
      className="flex justify-between items-center p-4 hover:bg-gray-200 rounded-lg w-full xl:space-x-6 2xl:space-x-8"
      onClick={handleEmailClick}
    >
      {/* Sender or Recipients */}
      <div className="flex items-center space-x-4 xl:space-x-6 w-full">
        <img
          src={pfp || 'https://www.w3schools.com/w3images/avatar2.png'}
          alt="Avatar"
          className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
        />
        <div className="flex flex-col w-full">
          {isSent ? (
            <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
              {displayedRecipients} {remainingRecipients}
            </h2>
          ) : (
            <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
              {sender_username}
            </h2>
          )}
          <p className="text-gray-600 text-left text-xs xl:text-sm">
            Subject: {subject || 'No Subject'}
          </p>
          <p
            className="text-gray-700 text-left text-xs xl:text-sm line-clamp-1"
            dangerouslySetInnerHTML={{ __html: body || 'No Content' }}
          />
        </div>
      </div>

      {/* Timestamp and Archive Icon */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 hidden sm:block text-sm xl:text-base 2xl:text-lg">
          {timestamp || 'Unknown Time'}
        </span>
        {!isSent && (
          <button
            className={`text-gray-500 hover:text-gray-800 ${
              isArchived ? 'text-green-500' : ''
            }`}
            onClick={handleArchiveClick}
            aria-label="Toggle Archive Email"
          >
            <HiOutlineInboxArrowDown size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Email;
