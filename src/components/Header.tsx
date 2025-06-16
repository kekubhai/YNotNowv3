
import React from 'react';
import { Rocket, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                YNotNow
              </h1>
              <p className="text-sm text-slate-400">Validate your startup ideas</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Ideas
            </a>
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
              Top Rated
            </a>
            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
