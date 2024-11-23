import React from 'react';

function Email({ email }) {
  const { id, sender_username, sender, pfp, recipients, subject, body, timestamp } = email;



  // Check if the logged-in user's email is in the recipients list
  // if (!recipients.includes(loggedInUser)) {
  //   console.log(`Email skipped for user: ${loggedInUser}`);
  //   return null; // Don't render this email if the logged-in user is not a recipient
  // }

  return (
    <div className="flex justify-between items-center p-4 hover:bg-gray-200 rounded-lg w-full xl:space-x-6 2xl:space-x-8">
      {/* Sender's profile picture */}
      <div className="flex items-center space-x-4 xl:space-x-6 w-full">
        <img
          src={pfp || 'https://www.w3schools.com/w3images/avatar2.png'} // Default profile picture
          alt="Avatar"
          className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
        />
        <div className="flex flex-col w-full">
          {/* Sender's username */}
          <h2 className="font-semibold text-gray-800 text-left text-sm xl:text-base 2xl:text-lg">
            {sender_username}
          </h2>
          {/* Email subject */}
          <p className="text-gray-600 text-left text-xs xl:text-sm">Subject: {subject}</p>
          {/* Email body */}
          <p
            className="text-gray-700 text-left text-xs xl:text-sm line-clamp-1"
            dangerouslySetInnerHTML={{ __html: body }} // Render HTML content safely
          />
        </div>
      </div>

      {/* Timestamp */}
      <span className="text-gray-500 hidden sm:block text-sm xl:text-base 2xl:text-lg">
        {timestamp}
      </span>
    </div>
  );
}

export default Email;
