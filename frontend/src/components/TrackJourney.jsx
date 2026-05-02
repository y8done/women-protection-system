import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Square, Clock, AlertTriangle } from 'lucide-react';

// --- Track My Journey Component ---
// A proactive safety timer. If it hits zero before being stopped, it triggers an SOS.
const TrackJourney = ({ onBack, onTriggerSOS }) => {
  const [durationMinutes, setDurationMinutes] = useState(30); // Default 30 mins
  const [timeLeft, setTimeLeft] = useState(null); // In seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // TIMER HIT ZERO - TRIGGER SOS
      clearInterval(interval);
      setIsActive(false);
      onTriggerSOS();
      alert("Journey Timer Expired! SOS Alert has been sent automatically.");
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTriggerSOS]);

  const startTimer = () => {
    if (durationMinutes > 0) {
      setTimeLeft(durationMinutes * 60);
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(null);
  };

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    if (seconds === null) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft className="text-gray-800 dark:text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Track My Journey</h1>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
        <AlertTriangle size={48} className="text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Safety Timer</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Set a timer for your journey. If you don't mark yourself as safe before it expires, an SOS alert will be sent automatically.
        </p>

        {/* Timer Display */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] w-64 h-64 flex flex-col items-center justify-center mb-10 border-4 border-gray-100 dark:border-gray-700">
          <Clock className="text-blue-500 mb-2" size={32} />
          <span className="text-5xl font-black text-gray-800 dark:text-white tabular-nums tracking-tighter">
            {formatTime(isActive ? timeLeft : durationMinutes * 60)}
          </span>
        </div>

        {/* Controls */}
        {!isActive ? (
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <label className="text-gray-700 dark:text-gray-300 font-semibold">Duration (Mins):</label>
              <input 
                type="number" 
                min="1" 
                max="120"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 0)}
                className="w-24 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button 
              onClick={startTimer}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-transform active:scale-95"
            >
              <Play className="mr-2" /> Start Journey Timer
            </button>
          </div>
        ) : (
          <button 
            onClick={stopTimer}
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-transform active:scale-95 animate-pulse"
          >
            <Square className="mr-2" fill="currentColor" /> I am Safe - Stop Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackJourney;