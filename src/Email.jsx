import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineInboxArrowDown, HiOutlineTrash } from 'react-icons/hi2';
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
    read, // Include `read` in destructuring
  } = email;
  const [isArchived, setIsArchived] = useState(archived);
  const [isRead, setIsRead] = useState(read); // Local state for read status
  const navigate = useNavigate();
  const location = useLocation();
  // Handle click to navigate and mark email as read
// Handle click to navigate and mark email as read
const handleEmailClick = async () => {
  const isScheduled = location.pathname === '/schedule'; // Check if the current link is `/schedule`
  const endpoint = isScheduled ? `/scheduledEmail/${id}` : `/email/${id}`; // Use the appropriate API endpoint
  const navigateTo = isScheduled ? `/scheduleview/${id}` : `/emailview/${id}`; // Determine navigation target

  try {
    const response = await API.put(endpoint, { read: true });
    if (response.status === 204) {
      console.log(`Email with ID ${id} marked as read successfully`);
      setIsRead(true); // Update local read state
    }
  } catch (error) {
    console.error('An error occurred while marking the email as read:', error);
  }

  navigate(navigateTo); // Navigate to the determined view
};


  // Toggle archive state and reload page after archiving
  const handleArchiveClick = async (e) => {
    e.stopPropagation(); // Prevent parent click event

    const newArchivedState = !isArchived;
    try {
      const response = await API.put(`/email/${id}`, {
        archived: newArchivedState,
        read: isRead, // Maintain the current read state
      });

      if (response.status === 204) {
        console.log(
          `Email with ID ${id} ${newArchivedState ? 'archived' : 'unarchived'} successfully`
        );
        setIsArchived(newArchivedState); // Update local state
        window.location.href = window.location.href; // Force reload
      } else {
        console.error(`Failed to update email with ID ${id}`);
      }
    } catch (error) {
      console.error('An error occurred while updating the email:', error);
    }
  };

  // Handle delete click
  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Prevent parent click event
  
    const isScheduled = location.pathname === '/schedule'; // Check if the current link is `/schedule`
    const endpoint = isScheduled ? `/scheduledEmail/${id}` : `/email/${id}`; // Use the appropriate API endpoint
  
    try {
      const response = await API.delete(endpoint);
      if (response.status === 200) {
        console.log(`Email with ID ${id} deleted successfully`);
        // Optionally, navigate to a different page or update UI to remove email
        window.location.reload();
      } else {
        console.error(`Failed to delete email with ID ${id}`);
      }
    } catch (error) {
      console.error('An error occurred while deleting the email:', error);
    }
  };
  
  const isSent = location.pathname === '/sent';
  const isSchedule = location.pathname === '/schedule';

  // Dynamic recipients display
  const recipientList = Array.isArray(recipients) ? recipients : recipients.split(',');
  const displayedRecipients = recipientList.slice(0, 1).join(', ');
  const remainingRecipients = recipientList.length > 1 ? '...' : '';

  return (
    <div
      className={`flex justify-between items-center p-4 hover:bg-gray-200 rounded-lg w-full xl:space-x-6 2xl:space-x-8 ${
        isRead ? 'text-gray-500' : 'font-bold text-gray-800'
      }`}
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
            <h2 className="text-left text-sm xl:text-base 2xl:text-lg">
              {displayedRecipients} {remainingRecipients}
            </h2>
          ) : (
            <h2 className="text-left text-sm xl:text-base 2xl:text-lg">
              {sender_username}
            </h2>
          )}
          <p className="text-left text-xs xl:text-sm">
            Subject: {subject || 'No Subject'}
          </p>
          <p
            className="text-left text-xs xl:text-sm line-clamp-1"
            dangerouslySetInnerHTML={{ __html: body || 'No Content' }}
          />
        </div>
      </div>

      {/* Timestamp, Archive Icon, and Delete Icon */}
      <div className="flex items-center space-x-4">
        <span className="hidden sm:block text-sm xl:text-base 2xl:text-lg">
          {timestamp || 'Unknown Time'}
        </span>
        {!(isSent||(isSchedule)) && (
          <>
            <button
              className={`hover:text-gray-800 ${isArchived ? 'text-green-500' : ''}`}
              onClick={handleArchiveClick}
              aria-label="Toggle Archive Email"
            >
              <HiOutlineInboxArrowDown size={20} />
            </button>
          </>
        )}
        {!(isSent) && (
        <>
            <button
              className="hover:text-gray-800 text-red-500"
              onClick={handleDeleteClick}
              aria-label="Delete Email"
            >
              <HiOutlineTrash size={20} />
            </button>
            </>
            )}
      </div>
    </div>
  );
}

export default Email;
