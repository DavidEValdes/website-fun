// src/components/ui/button/Button.js
import React, { useState } from 'react';

const Button = ({ children, style, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px', // Rounded-full
    fontWeight: '500',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    ...(style || {}),
  };

  const hoverStyle = isHovered
    ? {
        opacity: 0.9,
      }
    : {};

  return (
    <button
      style={{ ...baseStyle, ...hoverStyle }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
