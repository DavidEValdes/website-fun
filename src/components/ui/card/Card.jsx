// src/components/ui/card/Card.js
import React, { useState } from 'react';

const Card = ({ children, style, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid transparent',
    transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
    textAlign: 'center',
    ...(style || {}),
  };

  const hoverStyle = isHovered
    ? {
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.05)',
        borderColor: '#f7fafc',
      }
    : {};

  return (
    <div
      style={{ ...baseStyle, ...hoverStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
