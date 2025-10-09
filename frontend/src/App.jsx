import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import SignUpScreen from './components/SignUpScreen';

// --- Main App Component ---
// This component manages the application state and renders the correct screen.
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // To toggle between Login and Sign Up

  // Simulate loading and checking auth status on app start
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true); // Default to login screen on logout
  };

  const showSignUpPage = () => {
    setShowLogin(false);
  };
  
  const showLoginPage = () => {
    setShowLogin(true);
  };

  // --- Render Logic ---
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    if (showLogin) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onShowSignUp={showSignUpPage} />;
    } else {
      return <SignUpScreen onShowLogin={showLoginPage} />;
    }
  }

  return <HomeScreen onLogout={handleLogout} />;
}

export default App;

