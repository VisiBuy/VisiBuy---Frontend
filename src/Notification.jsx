// src/Notification.jsx
import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Shortened for usability in real scenarios

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [onClose]);

  return (
    <div
      className={`fixed sm:right-4 sm:top-4 right-2 top-2 p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 ease-out 
        ${type === 'error' ? 'bg-red-600 text-white border-red-800' : 'bg-green-600 text-white border-green-800'}
        max-w-xs sm:max-w-md w-full z-50`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {type === 'error' ? (
          <span className="material-icons-outlined text-xl sm:text-2xl">error_outline</span>
        ) : (
          <span className="material-icons-outlined text-xl sm:text-2xl">check_circle_outline</span>
        )}
        <span className="text-sm sm:text-lg font-medium">{message}</span>
      </div>
      <div
        className={`h-1 mt-2 sm:mt-4 ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Notification;
