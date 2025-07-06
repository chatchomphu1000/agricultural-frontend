'use client';

import { useState, useEffect } from 'react';

export default function MockModeNotification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if we're using mock API by looking for console warnings
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('Backend not available, using mock API')) {
        setShowNotification(true);
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white px-4 py-2 text-center text-sm">
      <div className="flex items-center justify-center space-x-2">
        <span>⚠️</span>
        <span>
          <strong>Demo Mode:</strong> Backend server not available. Using mock data for demonstration.
        </span>
        <button 
          onClick={() => setShowNotification(false)}
          className="ml-4 text-white hover:text-orange-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}
