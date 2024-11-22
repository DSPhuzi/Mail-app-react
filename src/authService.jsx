import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json', // Ensure JSON format
  }, 
});

// Add an interceptor to handle token refresh
API.interceptors.response.use(
  (response) => response, // Pass successful responses through
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (
      error.response.status === 401 &&
      !originalRequest._retry // Prevent multiple retries
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
          refresh: localStorage.getItem('refreshToken'), // Retrieve the refresh token
        });

        const newAccessToken = refreshResponse.data.access;

        // Store the new access token
        localStorage.setItem('authToken', newAccessToken);

        // Update the Authorization header for the failed request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return API(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Optionally, redirect to login if refresh fails
        window.location.href = '/';
      }
    }

    return Promise.reject(error); // Reject other errors
  }
);

export default API;
