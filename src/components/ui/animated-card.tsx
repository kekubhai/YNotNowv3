import React from "react";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = "", ...props }) => (
  <div
    className={`transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 rounded-lg shadow-md bg-white dark:bg-zinc-900 ${className}`}
    {...props}
  >
    {children}
  </div>
);
