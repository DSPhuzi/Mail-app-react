import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import apiClient from './authService';

function Message() {
    const [ccVisible, setCcVisible] = useState(false);
    const [bccVisible, setBccVisible] = useState(false);
    const [editorValue, setEditorValue] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State for date and time
    const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle the date picker
    const [dateError, setDateError] = useState(''); // Error message state

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

    // Handle date selection and error check
    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Check if the selected date is in the past
        if (date && date < new Date()) {
            setDateError("Please choose a date and time that has not passed yet.");
        } else {
            setDateError('');
        }
    };

    // Send the email data (including attachments and message as HTML)
    const handleSend = async () => {
        try {
            // Convert files to Base64
            const encodedFiles = await Promise.all(
                attachments.map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({ name: file.name, content: reader.result.split(',')[1] });
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

            // Get the JWT token from localStorage (or wherever it's stored)
            const token = localStorage.getItem('authToken'); // Adjust based on your storage method

            // Create the payload
            const payload = {
                recipients: to, // Support multiple recipients
                cc: cc,
                bcc: bcc,
                subject: subject,
                body: editorValue, // Send message as HTML content
                file: encodedFiles, // Attachments as Base64
                schedule: selectedDate, // Add the selected date and time
            };

            // Send the POST request to the backend with the JWT token in the Authorization header
            const response = await apiClient.post('emails', payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the JWT token
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex justify-center items-center py-10 mt-5">
            <div className="bg-white shadow-xl rounded-xl max-w-4xl w-full border border-gray-200 h-full flex flex-col">
                <div className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white rounded-t-xl">
                    <h2 className="text-xl font-semibold">Compose Email</h2>
                    <button className="text-gray-200 hover:text-white transition">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
                <div className="container flex justify-center items-center space-x-2">
    {!showDatePicker ? (
        <button
            className="text-gray-600 hover:text-gray-800 transition"
            onClick={() => setShowDatePicker(true)}
        >
            <i className="fas fa-calendar-alt"></i>
        </button>
    ) : (
        <div className="flex items-center space-x-2">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange} // Use the handleDateChange function here
                showTimeSelect
                dateFormat="dd-MM-yyyy HH:mm" // Display date in day-month-year format with time
                placeholderText="Select date and time"
                className="px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => {
                    setSelectedDate(null); // Clear the selected date
                    setShowDatePicker(false); // Hide the DatePicker and show the calendar icon again
                }}
                aria-label="Clear Date"
            >
                <i className="fas fa-times-circle"></i>
            </button>
        </div>
    )}
</div>
{dateError && (
    <p className="text-red-500 text-sm mt-2 text-center">{dateError}</p> // Error message appears below and centered
)}


                    <div className="flex items-center">
                        <label htmlFor="to" className="w-20 text-gray-700 font-medium">
                            To
                        </label>
                        <input
                            type="email"
                            id="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter recipient's email"
                            required
                        />
                    </div>
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
                    {ccVisible && (
                        <div className="flex items-center">
                            <label htmlFor="cc" className="w-20 text-gray-700 font-medium">
                                CC
                            </label>
                            <input
                                type="email"
                                id="cc"
                                value={cc}
                                onChange={(e) => setCc(e.target.value)}
                                className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter CC email(s)"
                            />
                        </div>
                    )}
                    {bccVisible && (
                        <div className="flex items-center">
                            <label htmlFor="bcc" className="w-20 text-gray-700 font-medium">
                                BCC
                            </label>
                            <input
                                type="email"
                                id="bcc"
                                value={bcc}
                                onChange={(e) => setBcc(e.target.value)}
                                className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter BCC email(s)"
                            />
                        </div>
                    )}
                    <div className="flex items-center">
                        <label htmlFor="subject" className="w-20 text-gray-700 font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="flex-1 px-4 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter subject"
                            required
                        />
                    </div>
                    <div>
                        <ReactQuill
                            value={editorValue}
                            onChange={setEditorValue}
                            className="border border-gray-300 rounded-lg"
                            theme="snow"
                            placeholder="Type your message..."
                        />
                    </div>
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
                <div className="flex items-center justify-between px-8 py-4 bg-gray-100 border-t border-gray-300 rounded-b-xl">
                    <button
                        type="button"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                    <div className="flex space-x-4 items-center">
                        <label htmlFor="file-input" className="text-gray-600 hover:text-gray-800 transition cursor-pointer">
                            <i className="fas fa-paperclip"></i>
                        </label>
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
