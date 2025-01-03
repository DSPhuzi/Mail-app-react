import './App.css';
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes
import Login from './Login';
import Dark_login from './Dark_login'; // Optional import
import Home from './Home'; // Import Home component
import Compose from './Compose'; // Import Compose component
import EmailRead from './EmailRead'; // Import EmailRead component
import { useState } from 'react';
import Sent from './Sent'; 
import Emailview from './Emailview';
import Scheduleview from './Scheduleview';// Import Emailview component
import Archive from './Archive';
import Schedule from './Schedule';

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  // Define text based on the mode
  const headingText = isSignUpMode ? "Sign Up" : "Login";
  const mainButtonText = isSignUpMode ? "Already have an account? Login" : "New here? Create your account";
  const altButtonText = isSignUpMode ? "Sign Up with Google" : "Login with Google";

  return (
    <div className="container">
      <Routes> {/* Wrap all routes inside the Routes component */}
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
        
        {/* Route to Home component */}
        <Route path="/home" element={<Home />} />  

        {/* Route to Compose Email component */}
        <Route path="/compose" element={<Compose />} /> 

        {/* Route to Read Email component */}
        <Route path="/email" element={<EmailRead />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/Archive" element={<Archive />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* Route to Emailview component with dynamic emailId */}
        <Route path="/emailview/:emailId" element={<Emailview />} />
        <Route path="/scheduleview/:emailId" element={<Scheduleview />} />
      </Routes>
    </div>
  );
}

export default App;
