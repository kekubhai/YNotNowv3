import React from "react";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  >
    {children}
  </button>
);
