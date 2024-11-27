import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineInboxArrowDown } from 'react-icons/hi2';
import API from './authService'; // Import your API instance

function Email({ email }) {
  const { id, sender_username, sender, pfp, recipients, subject, body, timestamp } = email;
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation(); // Access the current location (route)

  // Function to handle email click
  const handleEmailClick = () => {
    navigate(`/emailview/${id}`); // Navigate to the correct route with email ID
  };

  // Function to handle archive action
  const handleArchiveClick = async (e) => {
    e.stopPropagation(); // Prevent triggering the email click

    try {
      const response = await API.put(`/emails/${id}`, {
        archive: true,
      });

      if (response.status === 200) {
        console.log(`Email with ID ${id} archived successfully`);
        // Optionally, update the UI to reflect the archive action
      } else {
        console.error(`Failed to archive email with ID ${id}`);
      }
    } catch (error) {
      console.error('An error occurred while archiving the email:', error);
    }
  };

  // Check if the current route is '/sent'
  const isSent = location.pathname === '/sent';

  // Convert recipients string to an array and limit the number of visible recipients
  const recipientList = Array.isArray(recipients) ? recipients : recipients.split(','); // Assume recipients are comma-separated in string
  const displayedRecipients = recipientList.slice(0, 1); // Show only the first recipient
  const remainingRecipients = recipientList.length > 1 ? '...' : ''; // Show "..." if there are more recipients

  return (
    <div
      className="flex justify-between items-center p-4 hover:bg-gray-200 rounded-lg w-full xl:space-x-6 2xl:space-x-8"
      onClick={handleEmailClick}
    >
      {/* Sender's profile picture */}
      <div className="flex items-center space-x-4 xl:space-x-6 w-full">
        <img
          src={pfp || 'https://www.w3schools.com/w3images/avatar2.png'} // Default profile picture
          alt="Avatar"
          className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
        />
        <div className="flex flex-col w-full">
          {/* Conditional rendering based on the route */}
          {isSent ? (
            <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
              {displayedRecipients.join(', ')} {remainingRecipients}
            </h2>
          ) : (
            <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
              {sender_username}
            </h2>
          )}
          {/* Email subject */}
          <p className="text-gray-600 text-left text-xs xl:text-sm">Subject: {subject}</p>
          {/* Email body */}
          <p
            className="text-gray-700 text-left text-xs xl:text-sm line-clamp-1"
            dangerouslySetInnerHTML={{ __html: body }} // Render HTML content safely
          />
        </div>
      </div>

      {/* Timestamp and archive icon */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 hidden sm:block text-sm xl:text-base 2xl:text-lg">
          {timestamp}
        </span>
        {/* Archive icon */}
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={handleArchiveClick}
          aria-label="Archive Email"
        >
          <HiOutlineInboxArrowDown size={20} />
        </button>
      </div>
    </div>
  );
}

export default Email;
