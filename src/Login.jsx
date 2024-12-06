import React, { useState } from 'react';
import Google from './Google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ isSignUpMode, setIsSignUpMode, headingText, mainButtonText, altButtonText }) {
  localStorage.clear();
  
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();  // Initialize navigate

  // Event handler to toggle the sign up and login mode
  const handleToggleMode = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsSignUpMode(!isSignUpMode); // Toggle the mode
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSignUpMode && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const endpoint = isSignUpMode ? "http://localhost:8000/register" : "http://localhost:8000/login";
    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Allows sending cookies for session-based authentication
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);

        // Save the JWT token to localStorage
        localStorage.setItem('email', data.user.email);
        console.log('Email saved to localStorage:', data.user.email);
        localStorage.setItem('authToken', data.access); // Save the access token
        localStorage.setItem('refreshToken', data.refresh); // Optionally, save the refresh token

        setSuccess("Login successful");
        setError(null);
        navigate('/home');  // Navigate to the home page on successful login
      } else {
        setError(data.error || "An error occurred");
        setSuccess(null);
        console.error(data);
      }
    } catch (error) {
      setError("An error occurred");
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center" style={{ width: '100vw' }}>
        <div className="w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className="w-32 mx-auto"
                alt="Logo"
              />
            </div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">{headingText}</h1>
              <div className="w-full flex-1 mt-8">
                <Google headingText={headingText} />

                <div className="mt-4 mb-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    {headingText} with e-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {isSignUpMode && (
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    )}
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">{headingText}</span>
                    </button>
                  </form>
                  {error && <p className="text-red-500 mt-3">{error}</p>}
                  {success && <p className="text-green-500 mt-3">{success}</p>}
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                      onClick={handleToggleMode}
                    >
                      {mainButtonText}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
