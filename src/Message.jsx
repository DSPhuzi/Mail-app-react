import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill's default styles

function Message() {
    const [ccVisible, setCcVisible] = useState(false);
    const [bccVisible, setBccVisible] = useState(false);
    const [editorValue, setEditorValue] = useState(''); // State to store the editor content
    const [attachments, setAttachments] = useState([]); // Store the selected attachments

    // Handle file selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments((prevAttachments) => [...prevAttachments, ...files]);
    };

    // Remove an attachment
    const handleRemoveAttachment = (index) => {
        const updatedAttachments = [...attachments];
        updatedAttachments.splice(index, 1);
        setAttachments(updatedAttachments);
    };

    return (
        <div className="min-h-screen bg-white flex justify-center items-center py-10 mt-5">
            {/* Compose Email Container */}
            <div className="bg-white shadow-xl rounded-xl max-w-4xl w-full border border-gray-200 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white rounded-t-xl">
                    <h2 className="text-xl font-semibold">Compose Email</h2>
                    <button className="text-gray-200 hover:text-white transition">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Form Content */}
                <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
                    {/* To */}
                    <div className="flex items-center">
                        <label htmlFor="to" className="w-20 text-gray-700 font-medium">
                            To
                        </label>
                        <input
                            type="email"
                            id="to"
                            className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter recipient's email"
                            required
                        />
                    </div>

                    {/* Add CC / BCC Buttons - Centered */}
                    <div className="flex justify-center space-x-4">
                        <button
                            className="text-sm text-blue-600 hover:text-blue-800 transition"
                            onClick={() => setCcVisible(!ccVisible)}
                        >
                            {ccVisible ? 'Hide CC' : 'Add CC'}
                        </button>
                        <button
                            className="text-sm text-blue-600 hover:text-blue-800 transition"
                            onClick={() => setBccVisible(!bccVisible)}
                        >
                            {bccVisible ? 'Hide BCC' : 'Add BCC'}
                        </button>
                    </div>

                    {/* CC */}
                    {ccVisible && (
                        <div className="flex items-center">
                            <label htmlFor="cc" className="w-20 text-gray-700 font-medium">
                                CC
                            </label>
                            <input
                                type="email"
                                id="cc"
                                className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter CC email(s)"
                            />
                        </div>
                    )}

                    {/* BCC */}
                    {bccVisible && (
                        <div className="flex items-center">
                            <label htmlFor="bcc" className="w-20 text-gray-700 font-medium">
                                BCC
                            </label>
                            <input
                                type="email"
                                id="bcc"
                                className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter BCC email(s)"
                            />
                        </div>
                    )}

                    {/* Subject */}
                    <div className="flex items-center">
                        <label htmlFor="subject" className="w-20 text-gray-700 font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter subject"
                            required
                        />
                    </div>

                    {/* Message Body - Rich Text Editor */}
                    <div>
                        <ReactQuill
                            value={editorValue}
                            onChange={setEditorValue} // Update editor value
                            className="border border-gray-300 rounded-lg"
                            theme="snow"
                            placeholder="Type your message..."
                        />
                    </div>

                    {/* Attachments - Display selected files */}
                    {attachments.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-700">Attachments:</h3>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                {attachments.map((file, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{file.name}</span>
                                        <button
                                            className="text-red-500 hover:text-red-700 text-xs"
                                            onClick={() => handleRemoveAttachment(index)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-8 py-4 bg-gray-100 border-t border-gray-300 rounded-b-xl">
                    <button
                        type="button"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400"
                    >
                        Send
                    </button>
                    <div className="flex space-x-4">
                        {/* Attach Button */}
                        <label htmlFor="file-input" className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
                            <i className="fas fa-paperclip"></i>
                        </label>
                        {/* Hidden File Input */}
                        <input
                            id="file-input"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                        />
                        <button
                            className="text-gray-600 hover:text-gray-800 transition"
                            aria-label="Options"
                        >
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
