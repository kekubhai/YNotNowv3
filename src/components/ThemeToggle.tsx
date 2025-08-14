import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Simple, framework-agnostic theme toggle using Tailwind's class strategy.
// Persists to localStorage('theme') and toggles `dark` class on <html>.
export const ThemeToggle: React.FC<{ className?: string } > = ({ className }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement.classList;
    if (theme === 'dark') root.add('dark'); else root.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
      className={`inline-flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2 text-slate-200 hover:bg-slate-900/60 hover:border-slate-600 transition-colors ${className ?? ''}`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="text-sm">Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="text-sm">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
