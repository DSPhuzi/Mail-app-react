import React, { useEffect } from "react";

function EmailRead({ email }) {
  const handleFileDownload = (name, content) => {
    // Decode Base64 string
    const binaryString = atob(content);
    const binaryData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob and initiate download
    const blob = new Blob([binaryData]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };

  useEffect(() => {
    if (email) {
      console.log("Email data received:", email);
    } else {
      console.error("No email data received.");
    }
  }, [email]);

  if (!email || Object.keys(email).length === 0) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <p className="text-gray-600">Error: Email data not available. Please try again later.</p>
      </div>
    );
  }

  let { pfp, subject, timestamp, sender, recipients, cc, bcc, body, file } = email;
  file = file.replace(/'/g, '"');
  file = JSON.parse(file);
  
  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-8 px-4 mt-8">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
          <div className="flex items-center space-x-4">
            <img
              src={pfp || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">{subject || "No Subject"}</h1>
              <p className="text-sm opacity-80">{timestamp || "No Timestamp"}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="text-white opacity-75 hover:opacity-100 transition">
              <i className="fas fa-reply"></i>
            </button>
            <button className="text-white opacity-75 hover:opacity-100 transition">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>

        {/* Sender and Recipients */}
        <div className="p-6 space-y-4 border-b bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-medium text-gray-800">{sender || "Unknown Sender"}</p>
              <p className="text-sm text-gray-500">
                to <span>{recipients.join(", ") || "Unknown Recipients"}</span>
              </p>
            </div>
            <button className="text-blue-600 hover:underline">Reply All</button>
          </div>
          {cc && cc.length > 0 && (
            <div className="text-sm text-gray-500 pl-2 mt-2">
              <span className="font-medium text-gray-700 mr-2">CC:</span>
              {cc.join(", ")}
            </div>
          )}
          {bcc && bcc.length > 0 && (
            <div className="text-sm text-gray-500 pl-2 mt-2">
              <span className="font-medium text-gray-700 mr-2">BCC:</span>
              {bcc.join(", ")}
            </div>
          )}
        </div>

        {/* Email Body */}
        <div className="p-6 text-gray-800 bg-white">
          <div
            className="leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: body || "<p>No Content</p>" }}
          />
        </div>

        {/* Attachments */}
        {file && file.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <h3 className="text-gray-800 font-medium mb-4">Attachments:</h3>
            <div className="flex flex-wrap gap-4">
              {file.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 hover:bg-blue-50 transition"
                >
                  <i className="fas fa-file-alt text-gray-500"></i>
                  <span>{attachment.name || "Unnamed File"}</span>
                  <button
                    onClick={() => handleFileDownload(attachment.name, attachment.content)}
                    className="ml-4 text-blue-600 hover:underline"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-b-lg border-t">
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Reply
            </button>
            <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Forward
            </button>
          </div>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ml-4">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


export default EmailRead;
