import './App.css';
import { Route, Routes } from 'react-router-dom';  // Import Route and Routes
import Login from './Login';
import Dark_login from './Dark_login'; // You can keep this commented out or use it as needed
import Home from './Home'; // You need to create this Home component (you can do a simple placeholder)
import { useState } from 'react';

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  // Define text based on the mode
  const headingText = isSignUpMode ? "Sign Up" : "Login";
  const mainButtonText = isSignUpMode ? "Already have an account? Login" : "  New here? Create your account";
  const altButtonText = isSignUpMode ? "Sign Up with Google" : "Login with Google";

  return (
    <div className="container">
      <Routes> {/* Wrap all your routes inside the Routes component */}
        <Route 
          path="/" 
          element={<Login 
            isSignUpMode={isSignUpMode} 
            headingText={headingText} 
            mainButtonText={mainButtonText} 
            altButtonText={altButtonText} 
            setIsSignUpMode={setIsSignUpMode} 
          />} 
        />
        
        {/* You can add more routes like for the Home component */}
        <Route path="/home" element={<Home />} />  {/* Route to Home component */}
      </Routes>
    </div>
  );
}

export default App;
