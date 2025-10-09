import React from 'react';
import AppLogo from './AppLogo';

// --- Loading Screen Component ---
// This component is displayed for a few seconds when the app starts.
const LoadingScreen = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col items-center text-center">
        <AppLogo className="w-20 h-20 text-blue-600 dark:text-blue-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
          Safety App
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Your protection, our priority.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

