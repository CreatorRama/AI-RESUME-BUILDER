import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  footer, 
  hoverable = false,
  bordered = true
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm overflow-hidden
        ${hoverable ? 'transition-shadow hover:shadow-md' : ''}
        ${bordered ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;