import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Enhanced theme toggle with smooth animations and better styling
export const ThemeToggle: React.FC<{ className?: string } > = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement.classList;
    
    // Add transition class for smooth theme switching
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (theme === 'dark') root.add('dark'); else root.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      className={`
        group relative inline-flex items-center gap-2 rounded-xl 
        border border-purple-500/30 bg-gradient-to-r from-slate-900/70 to-purple-900/30 
        backdrop-blur-sm px-4 py-2.5 text-slate-200 
        hover:from-slate-800/70 hover:to-purple-800/40 hover:border-purple-400/50
        dark:border-purple-400/40 dark:from-slate-800/80 dark:to-purple-800/40
        dark:hover:from-slate-700/80 dark:hover:to-purple-700/50
        transition-all duration-300 hover:scale-105 hover:shadow-lg 
        hover:shadow-purple-500/20 active:scale-95
        ${isTransitioning ? 'animate-pulse' : ''}
        ${className ?? ''}
      `}
    >
      <div className="relative overflow-hidden">
        {theme === 'dark' ? (
          <Sun className={`h-4 w-4 transition-all duration-300 ${isTransitioning ? 'rotate-180' : ''} text-amber-400`} />
        ) : (
          <Moon className={`h-4 w-4 transition-all duration-300 ${isTransitioning ? 'rotate-180' : ''} text-indigo-400`} />
        )}
      </div>
      
      <span className="text-sm font-medium tracking-wide">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
      
      {/* Decorative glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle;
