import './App.css';
import Login from './Login';
import Dark_login from './Dark_login'
import { useState } from 'react';

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  // Define text based on the mode
  const headingText = isSignUpMode ? "Sign Up" : "Login";
  const mainButtonText = isSignUpMode ? "Already have an account? Login" : "  New here? Create your account";
  const altButtonText = isSignUpMode ? "Sign Up with Google" : "Login with Google";

  return (
    <div className="container">
      {/* <button onClick={() => setIsSignUpMode(!isSignUpMode)}>
        {isSignUpMode ? "Switch to Login" : "Switch to Sign Up"}
      </button> */}

      {/* Pass dynamic props to Login component */}
      <Login 
        isSignUpMode={isSignUpMode} 
        headingText={headingText} 
        mainButtonText={mainButtonText} 
        altButtonText={altButtonText} 
        setIsSignUpMode={setIsSignUpMode} // Ensure to pass this prop to handle toggle in Login component
      />
            {/* <Dark_login
        isSignUpMode={isSignUpMode} 
        headingText={headingText} 
        mainButtonText={mainButtonText} 
        altButtonText={altButtonText} 
        setIsSignUpMode={setIsSignUpMode} // Ensure to pass this prop to handle toggle in Login component
      /> */}
    </div>
  );
}

export default App;
