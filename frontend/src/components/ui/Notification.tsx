import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number; // in milliseconds, 0 means never auto-close
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
  duration = 4500,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'error':
        return <FaTimesCircle className="text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div 
      className={`flex items-start p-4 mb-4 rounded-md border ${getBgColor()} shadow-sm`}
      role="alert"
    >
      <div className="flex-shrink-0 mr-3 pt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1 mr-2">
        <h4 className="text-sm font-medium">{message}</h4>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      
      <button 
        className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none" 
        onClick={handleClose}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;